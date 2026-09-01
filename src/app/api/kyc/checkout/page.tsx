"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const RAZORPAY_SCRIPT =
  "https://checkout.razorpay.com/v1/checkout.js";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: string,
    callback: (response: any) => void
  ) => void;
}

declare global {
  interface Window {
    Razorpay: new (
      options: Record<string, any>
    ) => RazorpayInstance;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (
      typeof window !== "undefined" &&
      window.Razorpay
    ) {
      resolve(true);
      return;
    }

    const existing =
      document.querySelector<HTMLScriptElement>(
        `script[src="${RAZORPAY_SCRIPT}"]`
      );

    if (existing) {
      existing.addEventListener(
        "load",
        () => resolve(true),
        { once: true }
      );

      existing.addEventListener(
        "error",
        () => resolve(false),
        { once: true }
      );

      return;
    }

    const script = document.createElement("script");

    script.src = RAZORPAY_SCRIPT;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export default function KycCheckoutPage() {
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const name = searchParams.get("name");
    const emailParam = searchParams.get("email");
    const phoneParam = searchParams.get("phone");

    if (name) {
      setFullName(name);
    }

    if (emailParam) {
      setEmail(emailParam);
    }

    if (phoneParam) {
      setPhone(phoneParam);
    }
  }, [searchParams]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    // -------------------------------------------------------
    // NAME VALIDATION
    // -------------------------------------------------------

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    // -------------------------------------------------------
    // EMAIL VALIDATION
    // -------------------------------------------------------

    if (
      !/^\S+@\S+\.\S+$/.test(trimmedEmail)
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    // -------------------------------------------------------
    // PHONE VALIDATION
    // -------------------------------------------------------

    const cleanPhone =
      trimmedPhone.replace(/[\s-]/g, "");

    if (
      !/^\+?91\d{10}$/.test(cleanPhone)
    ) {
      setError(
        "Please enter a valid Indian WhatsApp number, e.g. +91 9876543210."
      );
      return;
    }

    setLoading(true);

    try {
      // -----------------------------------------------------
      // LOAD RAZORPAY
      // -----------------------------------------------------

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay could not be loaded. Please check your internet connection and try again."
        );
      }

      // -----------------------------------------------------
      // CREATE ₹19 ORDER
      //
      // IMPORTANT:
      // This calls ONLY:
      //
      // /api/kyc/create-order
      //
      // It does NOT call the webinar's:
      //
      // /api/create-order
      // -----------------------------------------------------

      const orderResponse = await fetch(
        "/api/kyc/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            fullName: trimmedName,
            email: trimmedEmail,
            phone: trimmedPhone,
          }),
        }
      );

      const orderData =
        await orderResponse.json();

      if (
        !orderResponse.ok ||
        !orderData.order_id
      ) {
        throw new Error(
          orderData.error ||
            "Unable to start payment. Please try again."
        );
      }

      // -----------------------------------------------------
      // RAZORPAY PUBLIC KEY
      // -----------------------------------------------------

      const publicKey =
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!publicKey) {
        throw new Error(
          "Razorpay public key is not configured."
        );
      }

      // -----------------------------------------------------
      // RAZORPAY CHECKOUT
      // -----------------------------------------------------

      const options = {
        key: publicKey,

        amount: orderData.amount,

        currency: orderData.currency,

        order_id:
          orderData.order_id,

        name:
          "Puneet Kaur Saluja",

        description:
          "Know Your Customer — 15-Minute Understanding Worksheet",

        prefill: {
          name: trimmedName,
          email: trimmedEmail,
          contact: trimmedPhone,
        },

        notes: {
          product:
            "Know Your Customer Worksheet",
        },

        theme: {
          color: "#e7a414",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        // ---------------------------------------------------
        // PAYMENT SUCCESS
        // ---------------------------------------------------

        handler: async (
          response: RazorpayResponse
        ) => {
          try {
            // -----------------------------------------------
            // VERIFY PAYMENT
            // -----------------------------------------------

            const verifyResponse =
              await fetch(
                "/api/kyc/verify-payment",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    fullName:
                      trimmedName,

                    email:
                      trimmedEmail,

                    phone:
                      trimmedPhone,
                  }),
                }
              );

            const verifyData =
              await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              !verifyData.success
            ) {
              throw new Error(
                verifyData.error ||
                  "Payment was received but could not be verified yet. Please contact support."
              );
            }

            // ---------------------------------------------
            // SUCCESS
            // ---------------------------------------------

            window.location.href =
              "/know-your-customer/success";
          } catch (
            verificationError: any
          ) {
            setLoading(false);

            setError(
              verificationError?.message ||
                "Payment verification failed. Please contact support."
            );
          }
        },
      };

      const razorpay =
        new window.Razorpay(options);

      // ---------------------------------------------------
      // PAYMENT FAILED
      // ---------------------------------------------------

      razorpay.on(
        "payment.failed",
        (response: any) => {
          setLoading(false);

          setError(
            response?.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (paymentError: any) {
      setLoading(false);

      setError(
        paymentError?.message ||
          "Something went wrong. Please try again."
      );
    }
  }

  return (
    <main className="kyc-checkout-page">

      <div className="kyc-checkout-wrap">

        {/* BACK */}

        <a
          href="/know-your-customer"
          className="kyc-checkout-back"
        >
          ← Back to worksheet
        </a>


        {/* CARD */}

        <div className="kyc-checkout-card">

          <div className="kyc-checkout-eyebrow">
            KNOW YOUR CUSTOMER
          </div>

          <h1>
            Get the worksheet.
          </h1>

          <p className="kyc-checkout-intro">
            Enter your details below. You’ll be
            taken to Razorpay to complete your
            ₹19 payment.
          </p>


          {/* PRICE */}

          <div className="kyc-checkout-price">

            <span>
              ONE-TIME PAYMENT
            </span>

            <strong>
              ₹19
            </strong>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="kyc-checkout-form"
          >

            {/* NAME */}

            <label>

              Full Name

              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                placeholder="Your full name"
                autoComplete="name"
                disabled={loading}
              />

            </label>


            {/* EMAIL */}

            <label>

              Email Address

              <input
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
              />

            </label>


            {/* WHATSAPP */}

            <label>

              WhatsApp Number

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="+91 9876543210"
                autoComplete="tel"
                inputMode="tel"
                disabled={loading}
              />

              <small>
                Your worksheet will be delivered
                to this WhatsApp number after
                successful payment.
              </small>

            </label>


            {/* ERROR */}

            {error && (
              <div className="kyc-checkout-error">
                {error}
              </div>
            )}


            {/* BUTTON */}

            <button
              type="submit"
              className="kyc-checkout-button"
              disabled={loading}
            >

              {loading
                ? "OPENING PAYMENT…"
                : "PAY ₹19 & GET THE WORKSHEET"}

              <span>
                →
              </span>

            </button>

          </form>


          {/* TRUST */}

          <div className="kyc-checkout-trust">

            🔒 Secure payment powered by
            Razorpay

            <br />

            ⚡ Instant digital delivery after
            payment

          </div>

        </div>

      </div>

    </main>
  );
}
