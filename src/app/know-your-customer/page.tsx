"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const checkoutUrl = "/know-your-customer/checkout";

const customerInsights = [
  {
    number: "01",
    title: "WHAT THEY WANT",
    text: "Understand the outcome your customer is really looking for.",
  },
  {
    number: "02",
    title: "WHAT HOLDS THEM BACK",
    text: "Spot the doubts, frustrations and objections that can stop a purchase.",
  },
  {
    number: "03",
    title: "WHAT MAKES THEM SAY YES",
    text: "Find what matters most when they decide whether to buy.",
  },
  {
    number: "04",
    title: "WHAT TO SAY",
    text: "Turn customer understanding into clearer, more relevant messaging.",
  },
];

const outcomes = [
  "A clearer picture of your customer",
  "Their real wants and frustrations",
  "The reasons they may hesitate",
  "Better language for your marketing",
  "A stronger foundation for your offer",
  "More clarity before you spend more",
];

const audience = [
  "Business owners",
  "Founders",
  "Coaches & consultants",
  "Freelancers",
  "Service providers",
  "Creators",
  "Anyone selling a product, service or offer",
];

function CTA({ children }: { children: ReactNode }) {
  return (
    <Link href={checkoutUrl} className="kyc-cta">
      {children}
    </Link>
  );
}

export default function KnowYourCustomerPage() {
  return (
    <>
      <main className="kyc-page">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="kyc-header">
          <div className="kyc-container kyc-header-inner">

            <Link
              href="/know-your-customer"
              className="kyc-logo"
            >
              PUNEET KAUR SALUJA
            </Link>

            <div className="kyc-download-pill">
              ↓ INSTANT DIGITAL DOWNLOAD
            </div>

          </div>
        </header>


        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="kyc-hero">

          <div className="kyc-container kyc-hero-grid">

            <div className="kyc-hero-copy">

              <div className="kyc-eyebrow">
                FOR BUSINESS OWNERS & FOUNDERS
              </div>

              <h1>
                WHY AREN'T PEOPLE
                <br />
                BUYING FROM ME?
              </h1>

              <h2>
                Find the answer in 15 minutes.
              </h2>


              {/* MOBILE IMAGE */}

              <div className="kyc-mobile-hero-visual">

                <img
                  src="/kyc-sales-diagnostic.png"
                  alt="Customer insight tool showing how understanding customers can lead to better offers and more sales"
                />

              </div>


              <p className="kyc-hero-short">
                Know what they want. What's stopping them.
                What to say next.
              </p>


              <div className="kyc-hero-action">

                <div className="kyc-price">
                  ₹19
                </div>

                <CTA>
                  GET THE TOOL — ₹19 →
                </CTA>

              </div>


              <div className="kyc-meta">
                <span>⚡ Instant digital download</span>
                <span>•</span>
                <span>For any product, service or offer</span>
              </div>

            </div>


            {/* DESKTOP IMAGE */}

            <div className="kyc-hero-visual">

              <img
                src="/kyc-sales-diagnostic.png"
                alt="Customer insight tool showing how understanding customers can lead to better offers and more sales"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            REAL PROBLEM
        ===================================================== */}

        <section className="kyc-section kyc-dark-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              THE REAL PROBLEM
            </div>

            <h2 className="kyc-section-title">
              Maybe it's not your
              <br />
              <span>product.</span>
            </h2>

            <div className="kyc-two-column">

              <div>

                <p className="kyc-large-text">
                  You may simply be trying to sell without knowing enough
                  about the person you're selling to.
                </p>

                <p>
                  They see your offer differently than you do.
                </p>

              </div>


              <div className="kyc-highlight-box">

                <div className="kyc-highlight-mark">
                  ?
                </div>

                <h3>
                  WHAT IF YOU COULD
                  <br />
                  SEE THE SALE
                  <br />
                  FROM THEIR SIDE?
                </h3>

                <p>
                  That's what this tool helps you uncover.
                </p>

              </div>

            </div>


            <CTA>
              FIND OUT WHAT'S STOPPING THEM — ₹19 →
            </CTA>

          </div>

        </section>


        {/* =====================================================
            CUSTOMER INSIGHTS
        ===================================================== */}

        <section className="kyc-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              CUSTOMER CLARITY
            </div>

            <h2 className="kyc-section-title">
              Understand what
              <br />
              <span>drives the decision.</span>
            </h2>

            <div className="kyc-insights-grid">

              {customerInsights.map((item) => (

                <div
                  className="kyc-insight-card"
                  key={item.number}
                >

                  <div className="kyc-card-number">
                    {item.number}
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>

              ))}

            </div>


            <div className="kyc-centered-cta">

              <CTA>
                GET THIS CLARITY — ₹19 →
              </CTA>

            </div>

          </div>

        </section>


        {/* =====================================================
            BEFORE YOU SPEND MORE
        ===================================================== */}

        <section className="kyc-section kyc-light-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              BEFORE YOU SPEND MORE
            </div>


            <div className="kyc-two-column">

              <div>

                <h2 className="kyc-section-title left">
                  Stop guessing.
                  <br />
                  <span>Start understanding.</span>
                </h2>

                <p className="kyc-large-text">
                  More marketing won't fix a customer disconnect.
                </p>

                <p>
                  Understand the person first. Then improve the offer,
                  message or campaign.
                </p>

              </div>


              <div className="kyc-before-box">

                <div className="kyc-before-row">
                  <span>GUESSING</span>
                  <strong>→</strong>
                  <span>UNDERSTANDING</span>
                </div>

                <div className="kyc-before-row">
                  <span>ASSUMING</span>
                  <strong>→</strong>
                  <span>LISTENING</span>
                </div>

                <div className="kyc-before-row">
                  <span>RANDOM MESSAGING</span>
                  <strong>→</strong>
                  <span>RELEVANT MESSAGING</span>
                </div>

              </div>

            </div>


            <CTA>
              UNDERSTAND YOUR CUSTOMER FIRST — ₹19 →
            </CTA>

          </div>

        </section>


        {/* =====================================================
            WHAT YOU GET
        ===================================================== */}

        <section className="kyc-section kyc-dark-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              WHAT YOU GET
            </div>

            <h2 className="kyc-section-title">
              Clarity you can
              <br />
              <span>actually use.</span>
            </h2>


            <div className="kyc-outcomes">

              {outcomes.map((item, index) => (

                <div
                  className="kyc-outcome"
                  key={item}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {item}
                  </p>

                </div>

              ))}

            </div>


            <CTA>
              GET EVERYTHING — ₹19 →
            </CTA>

          </div>

        </section>


        {/* =====================================================
            WHO IS THIS FOR
        ===================================================== */}

        <section className="kyc-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              WHO IS THIS FOR?
            </div>


            <div className="kyc-two-column">

              <div>

                <h2 className="kyc-section-title left">
                  If you sell
                  <br />
                  <span>something, start here.</span>
                </h2>

                <p className="kyc-large-text">
                  You don't need to be a marketing expert.
                </p>

                <p>
                  You just need to understand the person you're trying
                  to serve.
                </p>

              </div>


              <div className="kyc-audience-box">

                {audience.map((item) => (

                  <div
                    className="kyc-audience-item"
                    key={item}
                  >

                    <span>✓</span>

                    <p>
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>


            <CTA>
              UNDERSTAND YOUR CUSTOMER — ₹19 →
            </CTA>

          </div>

        </section>


        {/* =====================================================
            THE IDEA
        ===================================================== */}

        <section className="kyc-idea-section">

          <div className="kyc-container">

            <div className="kyc-idea-top">

              <div className="kyc-section-label">
                THE IDEA
              </div>


              <div className="kyc-idea-grid">

                <div className="kyc-idea-copy">

                  <h2>
                    Understand the person
                    <br />
                    <span>before trying to</span>
                    <br />
                    sell to them.
                  </h2>

                  <p>
                    Better customer understanding leads to better offers,
                    clearer messaging and stronger decisions.
                  </p>

                </div>


                <div className="kyc-idea-visual">

                  <div className="kyc-idea-step">

                    <span>01</span>

                    <div>
                      <small>CUSTOMER</small>

                      <strong>
                        Understand them.
                      </strong>
                    </div>

                  </div>


                  <div className="kyc-idea-step">

                    <span>02</span>

                    <div>
                      <small>INSIGHT</small>

                      <strong>
                        Know what matters.
                      </strong>
                    </div>

                  </div>


                  <div className="kyc-idea-step kyc-idea-step-final">

                    <span>03</span>

                    <div>
                      <small>OFFER</small>

                      <strong>
                        Give them a reason to say yes.
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

            </div>


            <div className="kyc-idea-bottom">

              <div className="kyc-idea-bottom-text">
                Stop guessing what your customer wants.
                <strong>Find out.</strong>
              </div>

              <CTA>
                STOP GUESSING — ₹19 →
              </CTA>

            </div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="kyc-final">

          <div className="kyc-container kyc-final-inner">

            <div className="kyc-section-label">
              START HERE
            </div>

            <h2>
              WHY AREN'T PEOPLE
              <br />
              BUYING FROM YOU?
            </h2>

            <p className="kyc-final-subtitle">
              Find the answer in 15 minutes.
            </p>


            <div className="kyc-final-action">

              <div className="kyc-final-price">
                ₹19
              </div>

              <CTA>
                YES, I WANT THE TOOL — ₹19 →
              </CTA>

            </div>


            <div className="kyc-final-meta">
              ⚡ Instant digital download
            </div>


            <div className="kyc-footer-name">
              PUNEET KAUR SALUJA
            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          GLOBAL STYLES
      ===================================================== */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          color: #111111;
          font-family: Arial, Helvetica, sans-serif;
        }

        img {
          max-width: 100%;
        }

        .kyc-page {
          width: 100%;
          min-width: 0;
          overflow-x: hidden;
          background: #ffffff;
        }

        .kyc-container {
          width: min(1180px, calc(100% - 80px));
          max-width: 1180px;
          margin: 0 auto;
        }


        /* =====================================================
           HEADER
        ===================================================== */

        .kyc-header {
          width: 100%;
          border-bottom: 1px solid #e8e8e8;
          background: #ffffff;
        }

        .kyc-header-inner {
          min-height: 76px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
        }

        .kyc-logo {
          color: #111111;
          text-decoration: none;

          font-size: 14px;
          font-weight: 900;

          letter-spacing: 0.08em;
        }

        .kyc-download-pill {
          border: 1px solid #111111;
          border-radius: 999px;

          padding: 9px 15px;

          font-size: 11px;
          font-weight: 800;

          letter-spacing: 0.06em;
        }


        /* =====================================================
           HERO
        ===================================================== */

        .kyc-hero {
          padding: 70px 0 80px;
        }

        .kyc-hero-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.85fr);

          gap: 60px;

          align-items: center;
        }

        .kyc-hero-copy {
          min-width: 0;
        }

        .kyc-eyebrow,
        .kyc-section-label {
          font-size: 11px;
          font-weight: 900;

          letter-spacing: 0.14em;

          margin-bottom: 18px;
        }

        .kyc-eyebrow {
          display: inline-block;

          background: #f2a900;

          padding: 8px 11px;
        }

        .kyc-hero h1 {
          margin: 0;

          font-size: clamp(38px, 4.5vw, 62px);

          line-height: 0.95;

          letter-spacing: -0.045em;

          font-weight: 950;
        }

        .kyc-hero h2 {
          margin: 20px 0 0;

          font-size: clamp(23px, 2.5vw, 34px);

          line-height: 1.05;

          letter-spacing: -0.03em;

          font-weight: 900;
        }

        .kyc-hero-short {
          margin: 26px 0 0;

          max-width: 520px;

          font-size: 17px;

          line-height: 1.55;

          font-weight: 700;
        }


        /* =====================================================
           HERO IMAGE
        ===================================================== */

        .kyc-hero-visual {
          width: 100%;
          min-width: 0;
        }

        .kyc-hero-visual img {
          display: block;

          width: 100%;
          max-width: 100%;

          height: auto;

          border-radius: 18px;
        }

        .kyc-mobile-hero-visual {
          display: none;
        }


        /* =====================================================
           CTA — DEFAULT
        ===================================================== */

        .kyc-hero-action,
        .kyc-final-action {
          display: flex;

          align-items: stretch;

          gap: 14px;

          margin-top: 28px;

          flex-wrap: wrap;
        }

        .kyc-price,
        .kyc-final-price {
          display: flex;

          align-items: center;
          justify-content: center;

          min-width: 105px;
          min-height: 68px;

          padding: 10px 18px;

          background: #f2a900;

          color: #111111;

          border-radius: 12px;

          font-size: 34px;

          line-height: 1;

          font-weight: 950;

          letter-spacing: -0.05em;
        }


        /* =====================================================
           PRIMARY CTA
        ===================================================== */

        .kyc-cta {
          display: inline-flex !important;

          align-items: center !important;
          justify-content: center !important;

          min-height: 68px !important;

          padding: 16px 24px !important;

          background: #f2a900 !important;

          color: #111111 !important;

          -webkit-text-fill-color: #111111 !important;

          border: 2px solid #f2a900 !important;

          border-radius: 0 !important;

          text-decoration: none !important;

          font-size: 13px !important;

          line-height: 1.2 !important;

          font-weight: 950 !important;

          letter-spacing: 0.035em !important;

          text-align: center !important;

          white-space: normal !important;

          cursor: pointer !important;

          transition:
            transform 0.18s ease,
            background-color 0.18s ease,
            color 0.18s ease !important;
        }

        .kyc-cta:hover {
          background: #111111 !important;

          color: #ffffff !important;

          -webkit-text-fill-color: #ffffff !important;

          border-color: #111111 !important;

          transform: translateY(-2px);
        }


        /* =====================================================
           DARK SECTIONS
        ===================================================== */

        .kyc-dark-section .kyc-cta {
          background: #f2a900 !important;

          color: #111111 !important;

          -webkit-text-fill-color: #111111 !important;

          border-color: #f2a900 !important;
        }

        .kyc-dark-section .kyc-cta:hover {
          background: #ffffff !important;

          color: #111111 !important;

          -webkit-text-fill-color: #111111 !important;

          border-color: #ffffff !important;
        }


        /* =====================================================
           IDEA SECTION
        ===================================================== */

        .kyc-idea-section .kyc-cta {
          background: #111111 !important;

          color: #ffffff !important;

          -webkit-text-fill-color: #ffffff !important;

          border-color: #111111 !important;
        }

        .kyc-idea-section .kyc-cta:hover {
          background: #ffffff !important;

          color: #111111 !important;

          -webkit-text-fill-color: #111111 !important;

          border-color: #ffffff !important;
        }


        /* =====================================================
           FINAL CTA
        ===================================================== */

        .kyc-final-action .kyc-cta {
          width: 100%;

          min-height: 64px !important;

          height: 64px;

          background: #f2a900 !important;

          color: #111111 !important;

          -webkit-text-fill-color: #111111 !important;

          border: 2px solid #f2a900 !important;

          font-size: 12px !important;

          font-weight: 950 !important;

          letter-spacing: 0.025em !important;

          border-radius: 0 !important;
        }

        .kyc-final-action .kyc-cta:hover {
          background: #ffffff !important;

          color: #111111 !important;

          -webkit-text-fill-color: #111111 !important;

          border-color: #ffffff !important;
        }


        /* =====================================================
           META
        ===================================================== */

        .kyc-meta {
          display: flex;

          flex-wrap: wrap;

          gap: 8px;

          align-items: center;

          margin-top: 13px;

          font-size: 11px;

          color: #555555;
        }


        /* =====================================================
           SECTIONS
        ===================================================== */

        .kyc-section {
          padding: 80px 0;
        }

        .kyc-dark-section {
          background: #111111;
          color: #ffffff;
        }

        .kyc-light-section {
          background: #f5f5f2;
        }

        .kyc-section-title {
          margin: 0;

          max-width: 820px;

          font-size: clamp(34px, 4vw, 54px);

          line-height: 1;

          letter-spacing: -0.045em;

          font-weight: 950;
        }

        .kyc-section-title.left {
          max-width: 650px;
        }

        .kyc-section-title span {
          color: #f2a900;
        }


        /* =====================================================
           TWO COLUMNS
        ===================================================== */

        .kyc-two-column {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 60px;

          margin-top: 45px;

          align-items: start;
        }

        .kyc-two-column p {
          max-width: 650px;

          font-size: 15px;

          line-height: 1.7;
        }

        .kyc-large-text {
          font-size: 21px !important;

          line-height: 1.4 !important;

          font-weight: 800;
        }

        .kyc-section .kyc-cta {
          margin-top: 40px;
        }


        /* =====================================================
           HIGHLIGHT
        ===================================================== */

        .kyc-highlight-box {
          background: #f2a900;

          color: #111111;

          padding: 34px;

          border-radius: 14px;
        }

        .kyc-highlight-mark {
          font-size: 54px;

          line-height: 0.8;

          font-weight: 950;
        }

        .kyc-highlight-box h3 {
          margin: 22px 0 14px;

          font-size: 26px;

          line-height: 1.05;

          letter-spacing: -0.03em;
        }

        .kyc-highlight-box p {
          margin-bottom: 0;
        }


        /* =====================================================
           INSIGHTS
        ===================================================== */

        .kyc-insights-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 16px;

          margin-top: 45px;
        }

        .kyc-insight-card {
          min-width: 0;

          padding: 30px;

          border: 1px solid #dddddd;

          background: #ffffff;
        }

        .kyc-card-number {
          margin-bottom: 30px;

          font-size: 12px;

          font-weight: 900;

          color: #f2a900;
        }

        .kyc-insight-card h3 {
          margin: 0 0 12px;

          font-size: 19px;

          line-height: 1.1;
        }

        .kyc-insight-card p {
          margin: 0;

          color: #555555;

          font-size: 14px;

          line-height: 1.6;
        }

        .kyc-centered-cta {
          display: flex;

          justify-content: center;
        }


        /* =====================================================
           BEFORE
        ===================================================== */

        .kyc-before-box {
          background: #ffffff;

          border: 1px solid #dddddd;
        }

        .kyc-before-row {
          display: grid;

          grid-template-columns:
            1fr
            auto
            1fr;

          gap: 18px;

          align-items: center;

          padding: 21px;

          border-bottom: 1px solid #dddddd;

          font-size: 12px;

          font-weight: 900;
        }

        .kyc-before-row:last-child {
          border-bottom: 0;
        }

        .kyc-before-row strong {
          color: #f2a900;

          font-size: 20px;
        }


        /* =====================================================
           OUTCOMES
        ===================================================== */

        .kyc-outcomes {
          margin-top: 45px;

          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          border-top: 1px solid #444444;
        }

        .kyc-outcome {
          display: grid;

          grid-template-columns:
            50px
            minmax(0, 1fr);

          gap: 14px;

          align-items: center;

          padding: 21px 0;

          border-bottom: 1px solid #444444;
        }

        .kyc-outcome span {
          color: #f2a900;

          font-size: 11px;

          font-weight: 900;
        }

        .kyc-outcome p {
          margin: 0;

          font-size: 15px;

          font-weight: 700;
        }


        /* =====================================================
           AUDIENCE
        ===================================================== */

        .kyc-audience-box {
          border-top: 2px solid #111111;
        }

        .kyc-audience-item {
          display: flex;

          gap: 14px;

          align-items: center;

          padding: 16px 0;

          border-bottom: 1px solid #dddddd;
        }

        .kyc-audience-item span {
          color: #f2a900;

          font-weight: 950;
        }

        .kyc-audience-item p {
          margin: 0;

          font-size: 15px;

          font-weight: 700;
        }


        /* =====================================================
           IDEA
        ===================================================== */

        .kyc-idea-section {
          background: #f2a900;

          color: #111111;

          padding: 90px 0 0;
        }

        .kyc-idea-section .kyc-section-label {
          margin: 0 0 38px;
        }

        .kyc-idea-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(0, 0.95fr);

          gap: 80px;

          align-items: center;
        }

        .kyc-idea-copy {
          min-width: 0;
        }

        .kyc-idea-copy h2 {
          margin: 0;

          font-size: clamp(42px, 5vw, 68px);

          line-height: 0.95;

          letter-spacing: -0.055em;

          font-weight: 950;
        }

        .kyc-idea-copy h2 span {
          color: #ffffff;
        }

        .kyc-idea-copy p {
          max-width: 520px;

          margin: 30px 0 0;

          font-size: 16px;

          line-height: 1.55;

          font-weight: 700;
        }


        /* IDEA VISUAL */

        .kyc-idea-visual {
          width: 100%;

          background: #ffffff;

          padding: 28px;

          border-radius: 16px;
        }

        .kyc-idea-step {
          display: grid;

          grid-template-columns:
            42px
            minmax(0, 1fr);

          gap: 16px;

          align-items: center;

          padding: 18px 0;

          border-bottom: 1px solid #dddddd;
        }

        .kyc-idea-step-final {
          border-bottom: none;
        }

        .kyc-idea-step > span {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 34px;
          height: 34px;

          border-radius: 50%;

          background: #111111;

          color: #f2a900;

          font-size: 10px;

          font-weight: 900;
        }

        .kyc-idea-step small {
          display: block;

          margin-bottom: 5px;

          font-size: 9px;

          font-weight: 900;

          letter-spacing: 0.12em;

          color: #777777;
        }

        .kyc-idea-step strong {
          display: block;

          font-size: 17px;

          line-height: 1.2;

          font-weight: 900;
        }


        /* IDEA BOTTOM */

        .kyc-idea-bottom {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 0.7fr);

          gap: 40px;

          align-items: center;

          margin-top: 70px;

          padding: 28px 0;

          border-top: 1px solid rgba(17, 17, 17, 0.25);
        }

        .kyc-idea-bottom-text {
          font-size: 18px;

          line-height: 1.35;

          font-weight: 700;
        }

        .kyc-idea-bottom-text strong {
          display: block;

          font-size: 24px;

          font-weight: 950;
        }

        .kyc-idea-bottom .kyc-cta {
          width: 100%;
        }


        /* =====================================================
           FINAL
        ===================================================== */

        .kyc-final {
          background: #111111;

          color: #ffffff;

          padding: 58px 0 30px;

          text-align: center;
        }

        .kyc-final-inner {
          display: flex;

          flex-direction: column;

          align-items: center;
        }

        .kyc-final .kyc-section-label {
          margin: 0 0 24px;

          color: #f2a900;

          font-size: 10px;

          line-height: 1;

          letter-spacing: 0.13em;
        }

        .kyc-final h2 {
          margin: 0;

          max-width: 850px;

          font-size: clamp(40px, 5.5vw, 72px);

          line-height: 0.94;

          letter-spacing: -0.05em;

          font-weight: 950;
        }

        .kyc-final-subtitle {
          margin: 18px 0 0 !important;

          font-size: 17px;

          line-height: 1.3;

          color: #ffffff;
        }


        /* FINAL ACTION */

        .kyc-final-action {
          display: grid;

          grid-template-columns:
            92px
            minmax(280px, 430px);

          gap: 9px;

          width: auto;

          margin: 27px auto 0;

          align-items: stretch;
        }

        .kyc-final-price {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 92px;

          height: 64px;

          min-height: 64px;

          padding: 8px;

          background: #f2a900;

          color: #111111;

          border-radius: 11px;

          font-size: 30px;

          line-height: 1;

          font-weight: 950;

          letter-spacing: -0.05em;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .kyc-container {
            width: calc(100% - 40px);
          }

          .kyc-hero {
            padding: 45px 0 60px;
          }

          .kyc-hero-grid {
            grid-template-columns: 1fr;

            gap: 38px;
          }

          .kyc-two-column {
            grid-template-columns: 1fr;

            gap: 40px;
          }

          .kyc-section {
            padding: 65px 0;
          }

          .kyc-insights-grid {
            grid-template-columns: 1fr;
          }

          .kyc-outcomes {
            grid-template-columns: 1fr;
          }

          .kyc-before-row {
            grid-template-columns: 1fr;

            gap: 6px;
          }

          .kyc-before-row strong {
            display: none;
          }

          .kyc-idea-grid {
            grid-template-columns: 1fr;

            gap: 40px;
          }

          .kyc-idea-bottom {
            grid-template-columns: 1fr;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          html,
          body {
            width: 100%;
            max-width: 100%;

            overflow-x: hidden;
          }

          .kyc-page {
            width: 100%;
            max-width: 100%;

            overflow-x: hidden;
          }


          /* CONTAINER */

          .kyc-container {
            width: calc(100% - 28px);

            max-width: none;

            margin-left: 14px;
            margin-right: 14px;
          }


          /* HEADER */

          .kyc-header-inner {
            min-height: 48px !important;

            height: 48px !important;

            gap: 8px;
          }

          .kyc-logo {
            font-size: 8.5px;

            letter-spacing: 0.055em;

            white-space: nowrap;
          }

          .kyc-download-pill {
            font-size: 6.5px;

            line-height: 1;

            padding: 5px 7px;

            letter-spacing: 0.03em;

            white-space: nowrap;
          }


          /* HERO */

          .kyc-hero {
            padding: 0 0 38px !important;

            margin-top: 0 !important;
          }

          .kyc-hero-grid {
            display: flex;

            flex-direction: column;

            gap: 0 !important;
          }

          .kyc-hero-copy {
            width: 100%;

            min-width: 0;

            margin-top: 0 !important;

            padding-top: 0 !important;
          }


          /* EYEBROW */

          .kyc-eyebrow {
            display: inline-block;

            font-size: 8px;

            line-height: 1;

            padding: 7px 9px;

            margin-top: 0 !important;

            margin-bottom: 13px;

            letter-spacing: 0.09em;
          }


          /* HEADLINE */

          .kyc-hero h1 {
            margin: 0 !important;

            padding: 0 !important;

            font-size: 36px;

            line-height: 0.94;

            letter-spacing: -0.045em;
          }


          /* SUBHEAD */

          .kyc-hero h2 {
            margin: 14px 0 0 !important;

            padding: 0 !important;

            font-size: 22px;

            line-height: 1.06;

            letter-spacing: -0.03em;
          }


          /* IMAGE */

          .kyc-mobile-hero-visual {
            display: block;

            width: 100%;

            max-width: 100%;

            margin-top: 18px !important;

            margin-bottom: 18px !important;

            padding: 0 !important;
          }

          .kyc-mobile-hero-visual img {
            display: block;

            width: 100%;

            max-width: 100%;

            height: auto;

            margin: 0 !important;

            padding: 0 !important;

            border-radius: 12px;
          }

          .kyc-hero-visual {
            display: none !important;
          }


          /* SHORT COPY */

          .kyc-hero-short {
            margin: 0 !important;

            padding: 0 !important;

            max-width: 100%;

            font-size: 14px;

            line-height: 1.45;

            font-weight: 800;
          }


          /* HERO CTA */

          .kyc-hero-action {
            display: grid;

            grid-template-columns:
              82px
              minmax(0, 1fr);

            gap: 8px;

            width: 100%;

            margin-top: 18px !important;
          }

          .kyc-price {
            min-width: 0;

            width: 100%;

            min-height: 58px;

            height: 58px;

            padding: 6px;

            border-radius: 10px;

            font-size: 27px;
          }


          /* MOBILE CTA */

          .kyc-cta {
            min-height: 58px !important;

            width: 100%;

            min-width: 0;

            padding: 10px 9px !important;

            font-size: 10px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.012em !important;

            white-space: normal !important;
          }


          /* META */

          .kyc-meta {
            margin-top: 8px !important;

            gap: 5px;

            font-size: 8px;

            line-height: 1.35;
          }


          /* SECTIONS */

          .kyc-section {
            padding: 48px 0;
          }

          .kyc-section-label {
            font-size: 8px;

            line-height: 1;

            margin-bottom: 13px;

            letter-spacing: 0.11em;
          }

          .kyc-section-title {
            max-width: 100%;

            font-size: 30px;

            line-height: 0.98;

            letter-spacing: -0.04em;
          }

          .kyc-section-title.left {
            max-width: 100%;
          }


          /* COLUMNS */

          .kyc-two-column {
            display: flex;

            flex-direction: column;

            gap: 25px;

            margin-top: 27px;
          }

          .kyc-two-column > div {
            width: 100%;

            min-width: 0;
          }

          .kyc-two-column p {
            max-width: 100%;

            font-size: 13px;

            line-height: 1.58;
          }

          .kyc-large-text {
            font-size: 16px !important;

            line-height: 1.38 !important;
          }


          /* HIGHLIGHT */

          .kyc-highlight-box {
            width: 100%;

            padding: 22px;

            border-radius: 10px;
          }

          .kyc-highlight-mark {
            font-size: 40px;
          }

          .kyc-highlight-box h3 {
            margin: 15px 0 10px;

            font-size: 20px;

            line-height: 1.04;
          }

          .kyc-highlight-box p {
            font-size: 12px !important;

            line-height: 1.45 !important;
          }

          .kyc-section .kyc-cta {
            margin-top: 26px;
          }


          /* INSIGHTS */

          .kyc-insights-grid {
            display: flex;

            flex-direction: column;

            gap: 8px;

            margin-top: 27px;
          }

          .kyc-insight-card {
            width: 100%;

            padding: 19px;
          }

          .kyc-card-number {
            margin-bottom: 17px;

            font-size: 8px;
          }

          .kyc-insight-card h3 {
            margin-bottom: 8px;

            font-size: 15px;

            line-height: 1.08;
          }

          .kyc-insight-card p {
            font-size: 12px;

            line-height: 1.48;
          }

          .kyc-centered-cta {
            display: block;

            width: 100%;
          }


          /* BEFORE */

          .kyc-before-box {
            width: 100%;
          }

          .kyc-before-row {
            display: flex;

            flex-direction: column;

            align-items: flex-start;

            gap: 3px;

            padding: 15px;

            font-size: 9px;

            line-height: 1.3;
          }

          .kyc-before-row strong {
            display: none;
          }


          /* OUTCOMES */

          .kyc-outcomes {
            margin-top: 27px;

            display: flex;

            flex-direction: column;

            width: 100%;
          }

          .kyc-outcome {
            display: grid;

            grid-template-columns:
              30px
              minmax(0, 1fr);

            gap: 7px;

            padding: 14px 0;
          }

          .kyc-outcome span {
            font-size: 8px;
          }

          .kyc-outcome p {
            font-size: 12px;

            line-height: 1.38;
          }


          /* AUDIENCE */

          .kyc-audience-box {
            width: 100%;
          }

          .kyc-audience-item {
            padding: 11px 0;

            gap: 8px;
          }

          .kyc-audience-item span {
            font-size: 12px;
          }

          .kyc-audience-item p {
            font-size: 12px;

            line-height: 1.35;
          }


          /* =================================================
             IDEA — MOBILE
          ================================================= */

          .kyc-idea-section {
            padding: 48px 0 0;
          }

          .kyc-idea-section .kyc-section-label {
            margin-bottom: 22px;

            font-size: 8px;

            letter-spacing: 0.11em;
          }

          .kyc-idea-grid {
            display: flex;

            flex-direction: column;

            gap: 25px;

            align-items: stretch;
          }

          .kyc-idea-copy {
            width: 100%;
          }

          .kyc-idea-copy h2 {
            font-size: 34px;

            line-height: 0.97;

            letter-spacing: -0.045em;
          }

          .kyc-idea-copy p {
            margin: 18px 0 0;

            max-width: 100%;

            font-size: 13px;

            line-height: 1.5;
          }


          /* IDEA VISUAL */

          .kyc-idea-visual {
            width: 100%;

            padding: 18px;

            border-radius: 11px;
          }

          .kyc-idea-step {
            grid-template-columns:
              32px
              minmax(0, 1fr);

            gap: 11px;

            padding: 13px 0;
          }

          .kyc-idea-step > span {
            width: 28px;

            height: 28px;

            font-size: 8px;
          }

          .kyc-idea-step small {
            margin-bottom: 4px;

            font-size: 7px;
          }

          .kyc-idea-step strong {
            font-size: 13px;

            line-height: 1.25;
          }


          /* IDEA BOTTOM */

          .kyc-idea-bottom {
            display: flex;

            flex-direction: column;

            align-items: stretch;

            gap: 16px;

            margin-top: 35px;

            padding: 22px 0 25px;
          }

          .kyc-idea-bottom-text {
            font-size: 13px;

            line-height: 1.4;
          }

          .kyc-idea-bottom-text strong {
            display: inline;

            font-size: 16px;
          }

          .kyc-idea-bottom .kyc-cta {
            width: 100%;

            min-height: 56px !important;
          }


          /* =================================================
             FINAL CTA — MOBILE
          ================================================= */

          .kyc-final {
            padding: 42px 0 18px;
          }

          .kyc-final-inner {
            align-items: stretch;
          }

          .kyc-final .kyc-section-label {
            margin-bottom: 20px;

            font-size: 8px;

            text-align: left;
          }

          .kyc-final h2 {
            width: 100%;

            max-width: 100%;

            font-size: 34px;

            line-height: 0.94;

            letter-spacing: -0.045em;

            text-align: center;
          }

          .kyc-final-subtitle {
            margin-top: 14px !important;

            font-size: 14px;

            line-height: 1.3;

            text-align: center;
          }


          /* FINAL CTA ROW */

          .kyc-final-action {
            display: grid;

            grid-template-columns:
              80px
              minmax(0, 1fr);

            gap: 7px;

            width: 100%;

            margin-top: 22px;
          }

          .kyc-final-price {
            width: 80px;

            height: 58px;

            min-height: 58px;

            border-radius: 10px;

            font-size: 26px;
          }

          .kyc-final-action .kyc-cta {
            width: 100%;

            height: 58px;

            min-height: 58px !important;

            padding: 8px 8px !important;

            font-size: 9.5px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.01em !important;

            white-space: normal !important;

            background: #f2a900 !important;

            color: #111111 !important;

            -webkit-text-fill-color: #111111 !important;

            border-color: #f2a900 !important;
          }

          .kyc-final-action .kyc-cta:hover {
            background: #ffffff !important;

            color: #111111 !important;

            -webkit-text-fill-color: #111111 !important;

            border-color: #ffffff !important;
          }


          /* FINAL META */

          .kyc-final-meta {
            margin-top: 10px;

            font-size: 8px;

            text-align: center;
          }


          /* FOOTER */

          .kyc-footer-name {
            width: 100%;

            margin-top: 32px;

            padding-top: 12px;

            font-size: 7.5px;

            text-align: left;
          }

        }


        /* =====================================================
           VERY SMALL PHONES
        ===================================================== */

        @media (max-width: 380px) {

          .kyc-container {
            width: calc(100% - 24px);

            margin-left: 12px;

            margin-right: 12px;
          }

          .kyc-hero {
            padding-top: 0 !important;
          }

          .kyc-hero h1 {
            font-size: 34px;
          }

          .kyc-hero h2 {
            font-size: 20px;
          }

          .kyc-section-title {
            font-size: 28px;
          }

          .kyc-hero-action {
            grid-template-columns:
              76px
              minmax(0, 1fr);
          }

          .kyc-final-action {
            grid-template-columns:
              74px
              minmax(0, 1fr);
          }

          .kyc-price,
          .kyc-final-price {
            font-size: 24px;
          }

          .kyc-cta {
            font-size: 9.2px !important;

            padding-left: 7px !important;

            padding-right: 7px !important;
          }

          .kyc-final h2 {
            font-size: 32px;
          }

          .kyc-final-subtitle {
            font-size: 13px;
          }

          .kyc-final-action .kyc-cta {
            font-size: 9px !important;
          }

        }

      `}</style>
    </>
  );
}
