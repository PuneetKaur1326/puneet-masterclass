"use client"

import { useState, useTransition, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// ── Meta Pixel helper (client-side only) ───────────────────────────────────
function firePixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;
  const fbq = (window as any).fbq;
  if (typeof fbq !== "function") return;

  if (params) {
    fbq("track", eventName, params);
  } else {
    fbq("track", eventName);
  }
}

// ── GA4 helper (client-side only) ───────────────────────────────────────────
function fireGA4Event(eventName: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;
  const gtag = (window as any).gtag;
  if (typeof gtag !== "function") return;

  if (params) {
    gtag("event", eventName, params);
  } else {
    gtag("event", eventName);
  }
}

// ── Razorpay script loader ─────────────────────────────────────────────────
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      (window as any).Razorpay
    ) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

// ── Form constants ─────────────────────────────────────────────────────────
const occupationOptions = [
  "Student",
  "Business Owner",
  "Founder",
  "Coach",
  "Consultant",
  "Freelancer",
  "Content Creator",
  "Marketing Professional",
  "Corporate Employee",
  "Agency Owner",
  "Teacher",
  "Other"
] as const;

const joiningReasons = [
  "I want people to remember my brand.",
  "I want to improve my communication skills.",
  "I want to create better content.",
  "I want to build my personal brand.",
  "I want to grow my business.",
  "I want to improve my marketing.",
  "I want to understand consumer psychology.",
  "I want to become a better writer.",
  "I want to increase conversions.",
  "I am curious to learn.",
  "Other"
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name is required."
  }),

  email: z.string().email({
    message: "Please enter a valid email address."
  }),

  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: "Please enter a valid 10-digit Indian phone number."
  }),

  occupation: z.enum(occupationOptions, {
    message: "Occupation is required."
  }),

  goal: z.enum(joiningReasons, {
    message: "Please select a reason for joining."
  }),

  challenge: z.string().optional(),

  terms: z.boolean().refine(
    val => val === true,
    {
      message:
        "You must agree to the Terms & Conditions, Privacy Policy, and Refund Policy.",
    }
  ),
})

type FormValues = z.infer<typeof formSchema>

// ── Purchase event guard (prevents duplicate fires in same session) ─────────
const firedPurchaseIds = new Set<string>();

export function RegisterForm() {
  const [isPending, startTransition] =
    useTransition();

  const [errorMsg, setErrorMsg] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    mode: "onChange",

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      occupation: undefined,
      goal: undefined,
      challenge: "",
      terms: false,
    }
  })

  const onSubmit = useCallback(
    (data: FormValues) => {

      setErrorMsg("");

      startTransition(async () => {

        try {

          // ──────────────────────────────────────────
          // PHONE NUMBER NORMALIZATION
          //
          // Customer enters:
          // 9876543210
          //
          // Backend receives:
          // 919876543210
          // ──────────────────────────────────────────

          const cleanPhone =
            data.phone.replace(/\D/g, "");

          const whatsappPhone =
            `91${cleanPhone}`;


          // ── STEP 1: Register to Google Sheets (Pending) ──
          const sheetResponse =
            await fetch(
              "/api/register",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                  fullName:
                    data.fullName,

                  email:
                    data.email,

                  phone:
                    whatsappPhone,

                  occupation:
                    data.occupation,

                  goal:
                    data.goal,

                  challenge:
                    data.challenge,
                }),
              }
            );


          const sheetResult =
            await sheetResponse.json();


          if (
            !sheetResponse.ok ||
            !sheetResult.success
          ) {

            setErrorMsg(
              sheetResult.message ||
                "Failed to submit registration. Please try again."
            );

            return;
          }


          const registrationId: string =
            sheetResult.registrationId;


          // Fire Lead pixel after successful registration
          firePixelEvent("Lead");

          // Fire GA4 sign_up event
          fireGA4Event(
            "sign_up",
            {
              method:
                "Google Sheets"
            }
          );


          // ── STEP 2: Load Razorpay SDK ──
          const isRazorpayLoaded =
            await loadRazorpayScript();


          if (!isRazorpayLoaded) {

            setErrorMsg(
              "Payment SDK failed to load. Please check your connection and try again."
            );

            return;
          }


          // ── STEP 3: Create Razorpay Order (₹99 enforced server-side) ──
          const orderResponse =
            await fetch(
              "/api/create-order",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({

                  registrationId,

                  fullName:
                    data.fullName,

                  email:
                    data.email,

                  phone:
                    whatsappPhone,

                }),
              }
            );


          const orderData =
            await orderResponse.json();


          if (
            !orderResponse.ok ||
            !orderData.order_id
          ) {

            setErrorMsg(
              orderData.error ||
                "Failed to initiate payment. Please try again."
            );

            return;
          }


          // Fire InitiateCheckout pixel
          firePixelEvent(
            "InitiateCheckout",
            {
              value: 99,
              currency: "INR"
            }
          );


          // Fire GA4 begin_checkout event
          fireGA4Event(
            "begin_checkout",
            {
              value: 99,
              currency: "INR"
            }
          );


          // ── STEP 4: Open Razorpay Standard Checkout ──
          const options = {

            key:
              process.env
                .NEXT_PUBLIC_RAZORPAY_KEY_ID,

            amount:
              orderData.amount,

            currency:
              orderData.currency,

            name:
              "Puneet Kaur Saluja",

            description:
              "The Psychology Behind Writing — Live Masterclass",

            order_id:
              orderData.order_id,


            handler:
              async function (
                response: any
              ) {

                try {

                  // ── STEP 5: Verify payment on the server ──
                  const verifyRes =
                    await fetch(
                      "/api/verify-payment",
                      {
                        method: "POST",

                        headers: {
                          "Content-Type":
                            "application/json"
                        },

                        body: JSON.stringify({

                          razorpay_order_id:
                            response.razorpay_order_id,

                          razorpay_payment_id:
                            response.razorpay_payment_id,

                          razorpay_signature:
                            response.razorpay_signature,

                          registrationId,

                          phone:
                            whatsappPhone,

                          email:
                            data.email,

                          name:
                            data.fullName,

                          amount:
                            "₹99",

                        }),
                      }
                    );


                  const verifyData =
                    await verifyRes.json();


                  if (
                    verifyData.success
                  ) {

                    // ── Fire Purchase pixel ONLY after server-side verification
                    if (
                      !firedPurchaseIds.has(
                        response.razorpay_payment_id
                      )
                    ) {

                      firedPurchaseIds.add(
                        response.razorpay_payment_id
                      );


                      firePixelEvent(
                        "Purchase",
                        {
                          value: 99,

                          currency:
                            "INR",

                          content_ids: [
                            registrationId
                          ],

                          content_type:
                            "product",
                        }
                      );


                      // Fire GA4 purchase event
                      fireGA4Event(
                        "purchase",
                        {
                          transaction_id:
                            response.razorpay_payment_id,

                          value: 99,

                          currency:
                            "INR",

                          items: [
                            {
                              item_id:
                                "masterclass",

                              item_name:
                                "The Psychology Behind Writing — Live Masterclass",

                              price: 99,

                              quantity: 1
                            }
                          ]
                        }
                      );

                    }


                    // Redirect to confirmation page
                    window.location.href =
                      "/thank-you";


                  } else {

                    setErrorMsg(
                      verifyData.error ||
                        "Payment verification failed. Please contact support."
                    );

                  }

                } catch {

                  setErrorMsg(
                    "Payment verification error. Please contact support."
                  );

                }

              },


            // ── Razorpay prefill ──
            prefill: {

              name:
                data.fullName,

              email:
                data.email,

              contact:
                whatsappPhone,

            },


            modal: {

              ondismiss:
                function() {

                  setErrorMsg(
                    "Payment was not completed. Please try again."
                  );

                }

            },


            theme: {

              color:
                "#d97706",

            },

          };


          const paymentObject =
            new (
              window as any
            ).Razorpay(options);


          paymentObject.on(
            "payment.failed",
            function (
              response: any
            ) {

              setErrorMsg(
                response.error.description ||
                  "Payment failed. Please try again."
              );

            }
          );


          paymentObject.open();


        } catch (
          error: any
        ) {

          setErrorMsg(
            "An unexpected error occurred. Please try again."
          );

        }

      })

    },
    []
  )


  const inputClassName =
    "w-full min-h-[3.5rem] px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 focus:bg-white transition-all text-base";

  const labelClassName =
    "block text-sm font-semibold text-gray-900 mb-2";


  return (

    <motion.form
      initial={{
        opacity: 0,
        y: 10
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.5,
        delay: 0.1
      }}

      onSubmit={
        handleSubmit(onSubmit)
      }

      className="space-y-6"
    >

      <AnimatePresence>

        {errorMsg && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              marginBottom: 0
            }}

            animate={{
              opacity: 1,
              height: "auto",
              marginBottom: 24
            }}

            exit={{
              opacity: 0,
              height: 0,
              marginBottom: 0
            }}

            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 overflow-hidden"
          >

            {errorMsg}

          </motion.div>

        )}

      </AnimatePresence>


      {/* FULL NAME */}

      <div className="space-y-1">

        <label
          className={labelClassName}
        >
          Full Name{" "}
          <span className="text-amber-500">
            *
          </span>
        </label>

        <input
          {...register("fullName")}

          placeholder="John Doe"

          className={
            inputClassName
          }
        />

        <AnimatePresence>

          {errors.fullName && (

            <motion.p
              initial={{
                opacity: 0,
                y: -5
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: -5
              }}

              className="text-sm text-red-500 mt-1"
            >
              {errors.fullName.message}
            </motion.p>

          )}

        </AnimatePresence>

      </div>


      {/* EMAIL */}

      <div className="space-y-1">

        <label
          className={labelClassName}
        >
          Email Address{" "}
          <span className="text-amber-500">
            *
          </span>
        </label>

        <input
          {...register("email")}

          type="email"

          placeholder="john@example.com"

          className={
            inputClassName
          }
        />

        <AnimatePresence>

          {errors.email && (

            <motion.p
              initial={{
                opacity: 0,
                y: -5
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: -5
              }}

              className="text-sm text-red-500 mt-1"
            >
              {errors.email.message}
            </motion.p>

          )}

        </AnimatePresence>

      </div>


      {/* PHONE */}

      <div className="space-y-1">

        <label
          className={labelClassName}
        >
          Phone Number{" "}
          <span className="text-amber-500">
            *
          </span>
        </label>

        <input
          {...register("phone")}

          type="tel"

          inputMode="numeric"

          autoComplete="tel"

          placeholder="9876543210"

          maxLength={10}

          className={
            inputClassName
          }

          onChange={(event) => {

            const digitsOnly =
              event.target.value.replace(
                /\D/g,
                ""
              );

            event.target.value =
              digitsOnly.slice(
                0,
                10
              );

            // Pass the cleaned 10-digit
            // value to react-hook-form.
            register("phone").onChange(
              event
            );

          }}
        />

        <p className="text-xs text-gray-400 mt-1">
          Enter your 10-digit WhatsApp number.
        </p>

        <AnimatePresence>

          {errors.phone && (

            <motion.p
              initial={{
                opacity: 0,
                y: -5
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: -5
              }}

              className="text-sm text-red-500 mt-1"
            >
              {errors.phone.message}
            </motion.p>

          )}

        </AnimatePresence>

      </div>


      {/* OCCUPATION */}

      <div className="space-y-1">

        <label
          className={labelClassName}
        >
          Occupation{" "}
          <span className="text-amber-500">
            *
          </span>
        </label>

        <select
          {...register("occupation")}

          defaultValue=""

          className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:12px_auto]`}
        >

          <option
            value=""
            disabled
            hidden
          >
            Select your occupation...
          </option>

          {occupationOptions.map(
            occ => (
              <option
                key={occ}
                value={occ}
              >
                {occ}
              </option>
            )
          )}

        </select>

        <AnimatePresence>

          {errors.occupation && (

            <motion.p
              initial={{
                opacity: 0,
                y: -5
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: -5
              }}

              className="text-sm text-red-500 mt-1"
            >
              {errors.occupation.message}
            </motion.p>

          )}

        </AnimatePresence>

      </div>


      {/* GOAL */}

      <div className="space-y-1">

        <label
          className={labelClassName}
        >
          Why are you joining this workshop?{" "}
          <span className="text-amber-500">
            *
          </span>
        </label>

        <select
          {...register("goal")}

          defaultValue=""

          className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9%20127.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:12px_auto]`}
        >

          <option
            value=""
            disabled
            hidden
          >
            Select your primary reason...
          </option>

          {joiningReasons.map(
            reason => (
              <option
                key={reason}
                value={reason}
              >
                {reason}
              </option>
            )
          )}

        </select>

        <AnimatePresence>

          {errors.goal && (

            <motion.p
              initial={{
                opacity: 0,
                y: -5
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: -5
              }}

              className="text-sm text-red-500 mt-1"
            >
              {errors.goal.message}
            </motion.p>

          )}

        </AnimatePresence>

      </div>


      {/* CHALLENGE */}

      <div className="space-y-1">

        <label
          className={labelClassName
          }
        >
          What is your biggest communication challenge?{" "}
          <span className="text-gray-400 font-normal">
            (Optional)
          </span>
        </label>

        <textarea
          {...register("challenge")}

          placeholder="Tell us what you're struggling with..."

          className={`${inputClassName} py-4 min-h-[100px] resize-none`}
        />

      </div>


      {/* TERMS */}

      <div className="pt-2">

        <div className="flex items-start gap-3">

          <input
            type="checkbox"

            id="terms"

            {...register("terms")}

            className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500/30 transition-all cursor-pointer accent-amber-500"
          />

          <label
            htmlFor="terms"

            className="text-sm text-gray-500 leading-relaxed cursor-pointer select-none"
          >

            By continuing, you agree to our{" "}

            <Link
              href="/terms"

              className="text-gray-900 font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-amber-500 transition-colors"
            >
              Terms & Conditions
            </Link>
            ,{" "}

            <Link
              href="/privacy"

              className="text-gray-900 font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-amber-500 transition-colors"
            >
              Privacy Policy
            </Link>
            , and{" "}

            <Link
              href="/refund-policy"

              className="text-gray-900 font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-amber-500 transition-colors"
            >
              Refund Policy
            </Link>
            .

          </label>

        </div>

        <AnimatePresence>

          {errors.terms && (

            <motion.p
              initial={{
                opacity: 0,
                y: -5
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              exit={{
                opacity: 0,
                y: -5
              }}

              className="text-sm text-red-500 mt-2"
            >
              {errors.terms.message}
            </motion.p>

          )}

        </AnimatePresence>

      </div>


      {/* PAYMENT BUTTON */}

      <div className="pt-4 flex flex-col gap-4">

        <button
          type="submit"

          disabled={
            !isValid ||
            isPending
          }

          className="relative w-full h-14 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group bg-gray-900 text-white hover:bg-gray-800 disabled:hover:bg-gray-900"
        >

          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

          <div className="relative flex items-center justify-center gap-2">

            {isPending ? (

              <>

                <Loader2 className="w-5 h-5 animate-spin" />

                <span className="tracking-wide">
                  Securely Processing...
                </span>

              </>

            ) : (

              <>

                <span className="tracking-wide">
                  Register & Pay ₹99
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </>

            )}

          </div>

        </button>


        <p className="text-xs text-center text-gray-500 leading-relaxed">

          By continuing, you agree to our{" "}

          <Link
            href="/privacy"

            className="text-gray-900 hover:text-amber-600 font-semibold underline decoration-gray-300 underline-offset-2 transition-colors"
          >
            Privacy Policy
          </Link>
          ,{" "}

          <Link
            href="/terms"

            className="text-gray-900 hover:text-amber-600 font-semibold underline decoration-gray-300 underline-offset-2 transition-colors"
          >
            Terms & Conditions
          </Link>
          ,{" "}

          <Link
            href="/refund-policy"

            className="text-gray-900 hover:text-amber-600 font-semibold underline decoration-gray-300 underline-offset-2 transition-colors"
          >
            Refund & Cancellation Policy
          </Link>
          .

        </p>

      </div>

    </motion.form>
  )
}
