"use client";

import { FormEvent, useState } from "react";

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

/* --------------------------------------------------
   LOAD RAZORPAY CHECKOUT SCRIPT
-------------------------------------------------- */

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

    const script =
      document.createElement("script");

    script.src = RAZORPAY_SCRIPT;
    script.async = true;

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}


/* --------------------------------------------------
   CHECKOUT PAGE
-------------------------------------------------- */

export default function KycCheckoutPage() {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [whatsappConsent, setWhatsappConsent] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  /* ------------------------------------------------
     FORM SUBMISSION
  ------------------------------------------------ */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const trimmedName =
      fullName.trim();

    const trimmedEmail =
      email.trim();

    // Keep only digits from the phone number.
    const cleanPhone =
      phone.replace(/\D/g, "");


    /* ----------------------------------------------
       NAME VALIDATION
    ---------------------------------------------- */

    if (trimmedName.length < 2) {
      setError(
        "Please enter your full name."
      );

      return;
    }


    /* ----------------------------------------------
       EMAIL VALIDATION
    ---------------------------------------------- */

    if (
      !/^\S+@\S+\.\S+$/.test(
        trimmedEmail
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }


    /* ----------------------------------------------
       PHONE VALIDATION
    ---------------------------------------------- */

    if (
      !/^[6-9]\d{9}$/.test(
        cleanPhone
      )
    ) {
      setError(
        "Please enter a valid 10-digit Indian WhatsApp number."
      );

      return;
    }


    /* ----------------------------------------------
       WHATSAPP CONSENT VALIDATION
    ---------------------------------------------- */

    if (!whatsappConsent) {
      setError(
        "Please agree to receive your worksheet and delivery updates on WhatsApp."
      );

      return;
    }


    // International WhatsApp format.
    const whatsappPhone =
      `91${cleanPhone}`;


    setLoading(true);


    try {

      /* --------------------------------------------
         LOAD RAZORPAY
      -------------------------------------------- */

      const razorpayLoaded =
        await loadRazorpay();


      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay could not be loaded. Please try again."
        );
      }


      /* --------------------------------------------
         CREATE ₹19 KYC ORDER

         IMPORTANT:
         This ONLY calls:

         /api/kyc/create-order

         It does NOT touch the ₹99 webinar
         payment endpoint.
      -------------------------------------------- */

      const orderResponse =
        await fetch(
          "/api/kyc/create-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              fullName:
                trimmedName,

              email:
                trimmedEmail,

              phone:
                whatsappPhone,
            }),
          }
        );


      const orderData =
        await orderResponse.json();


      /* --------------------------------------------
         CHECK ORDER RESPONSE
      -------------------------------------------- */

      if (
        !orderResponse.ok ||
        !orderData.order_id
      ) {
        throw new Error(
          orderData.error ||
            "Unable to start payment. Please try again."
        );
      }


      /* --------------------------------------------
         GET PUBLIC RAZORPAY KEY
      -------------------------------------------- */

      const publicKey =
        orderData.key_id;


      if (!publicKey) {
        throw new Error(
          "Razorpay public key was not returned by the payment server."
        );
      }


      /* --------------------------------------------
         RAZORPAY OPTIONS
      -------------------------------------------- */

      const options = {

        key: publicKey,

        amount:
          orderData.amount,

        currency:
          orderData.currency,

        order_id:
          orderData.order_id,

        name:
          "Puneet Kaur Saluja",

        description:
          "Know Your Customer — 15-Minute Understanding Worksheet",

        prefill: {

          name:
            trimmedName,

          email:
            trimmedEmail,

          contact:
            whatsappPhone,
        },

        notes: {

          product:
            "Know Your Customer Worksheet",

          product_price:
            "19",
        },


        theme: {

          color:
            "#e7a414",
        },


        /* ------------------------------------------
           RAZORPAY CLOSED
        ------------------------------------------ */

        modal: {

          ondismiss: () => {

            setLoading(false);

          },

        },


        /* ------------------------------------------
           PAYMENT SUCCESS
        ------------------------------------------ */

        handler: async (
          response: RazorpayResponse
        ) => {

          try {

            /* --------------------------------------
               VERIFY ₹19 PAYMENT
            -------------------------------------- */

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
                      whatsappPhone,

                  }),

                }
              );


            const verifyData =
              await verifyResponse.json();


            /* --------------------------------------
               VERIFY RESPONSE
            -------------------------------------- */

            if (
              !verifyResponse.ok ||
              !verifyData.success
            ) {

              throw new Error(
                verifyData.error ||
                  "Payment was received but could not be verified yet."
              );

            }


            /* --------------------------------------
               PAYMENT VERIFIED

               Redirect to success page.
            -------------------------------------- */

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


      /* --------------------------------------------
         CREATE RAZORPAY INSTANCE
      -------------------------------------------- */

      const razorpay =
        new window.Razorpay(
          options
        );


      /* --------------------------------------------
         PAYMENT FAILED
      -------------------------------------------- */

      razorpay.on(
        "payment.failed",
        (response: any) => {

          setLoading(false);

          setError(
            response?.error
              ?.description ||
              "Payment failed. Please try again."
          );

        }
      );


      /* --------------------------------------------
         OPEN RAZORPAY
      -------------------------------------------- */

      razorpay.open();


    } catch (
      paymentError: any
    ) {

      setLoading(false);

      setError(
        paymentError?.message ||
          "Something went wrong. Please try again."
      );

    }

  }


  /* ------------------------------------------------
     PAGE UI
  ------------------------------------------------ */

  return (

    <main className="kyc-checkout-page">

      <div className="kyc-checkout-wrap">


        {/* BACK LINK */}

        <a
          href="/know-your-customer"
          className="kyc-checkout-back"
        >
          ← Back to worksheet
        </a>


        {/* CHECKOUT CARD */}

        <div className="kyc-checkout-card">


          {/* EYEBROW */}

          <div className="kyc-checkout-eyebrow">
            KNOW YOUR CUSTOMER
          </div>


          {/* TITLE */}

          <h1>
            Get the worksheet.
          </h1>


          {/* INTRO */}

          <p className="kyc-checkout-intro">

            Enter your details below.
            You’ll be taken to Razorpay
            to complete your ₹19 payment.

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

                onChange={(event) =>
                  setFullName(
                    event.target.value
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

                onChange={(event) =>
                  setEmail(
                    event.target.value
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

                onChange={(event) => {
                  const digitsOnly =
                    event.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setPhone(
                    digitsOnly.slice(0, 10)
                  );
                }}

                placeholder="9876543210"

                autoComplete="tel"

                inputMode="numeric"

                maxLength={10}

                disabled={loading}
              />


              <small>

                Enter your 10-digit WhatsApp
                number. Your worksheet will
                be delivered here after
                successful payment.

              </small>

            </label>


            {/* WHATSAPP CONSENT */}

            <div className="flex items-start gap-3 mt-2">

              <input
                type="checkbox"

                id="whatsapp-consent"

                checked={whatsappConsent}

                onChange={(event) =>
                  setWhatsappConsent(
                    event.target.checked
                  )
                }

                disabled={loading}

                className="mt-1 w-5 h-5 shrink-0 rounded border-gray-300 text-amber-500 focus:ring-amber-500/30 transition-all cursor-pointer accent-amber-500"
              />

              <label
                htmlFor="whatsapp-consent"
                className="text-sm text-gray-500 leading-relaxed cursor-pointer select-none"
              >

                I agree to receive my
                purchased worksheet and
                delivery updates on WhatsApp
                at this number.

              </label>

            </div>


            {/* ERROR */}

            {error && (

              <div className="kyc-checkout-error">

                {error}

              </div>

            )}


            {/* PAYMENT BUTTON */}

            <button
              type="submit"

              className="kyc-checkout-button"

              disabled={
                loading ||
                !whatsappConsent
              }
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

            🔒 Secure payment powered
            by Razorpay

            <br />

            ⚡ Instant digital delivery
            after payment

          </div>


        </div>

      </div>

    </main>

  );
}
