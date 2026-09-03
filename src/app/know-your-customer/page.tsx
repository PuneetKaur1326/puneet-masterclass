"use client";

import Link from "next/link";

const checkoutUrl = "/know-your-customer/checkout";

const customerInsights = [
  {
    number: "01",
    title: "WHAT THEY ACTUALLY WANT",
    text: "Get clearer on the outcome your customer is really looking for — not just the product or service they say they need.",
  },
  {
    number: "02",
    title: "WHAT'S HOLDING THEM BACK",
    text: "Understand the doubts, frustrations and objections that can stop someone from choosing your offer.",
  },
  {
    number: "03",
    title: "WHAT MAKES THEM SAY YES",
    text: "Identify what matters most to the right customer so your offer becomes easier to understand and easier to choose.",
  },
  {
    number: "04",
    title: "HOW TO SPEAK THEIR LANGUAGE",
    text: "Turn customer understanding into clearer words, stronger messaging and a more relevant offer.",
  },
];

const outcomes = [
  "A clearer picture of your ideal customer",
  "The problems they actually care about",
  "Their wants, frustrations and objections",
  "The reasons they may hesitate before buying",
  "Language you can use in your marketing",
  "A stronger foundation for your offer",
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

function CTA({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Link
      href={checkoutUrl}
      className="kyc-cta"
      style={{
        backgroundColor: "#111111",
        color: "#ffffff",
        WebkitTextFillColor: "#ffffff",
      }}
    >
      {children}
    </Link>
  );
}

export default function KnowYourCustomerPage() {
  return (
    <>
      <main className="kyc-page">

        {/* =========================
            HEADER
        ========================= */}

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


        {/* =========================
            HERO
        ========================= */}

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


              {/* MOBILE IMAGE
                  Appears immediately after
                  the subheadline on phones.
              */}

              <div className="kyc-mobile-hero-visual">

                <img
                  src="/kyc-sales-diagnostic.png"
                  alt="Customer insight tool showing how understanding customers can lead to better offers and more sales"
                />

              </div>


              <p className="kyc-hero-description">
                Your product may be good. Your service may be good. But if
                people are not buying, you need to understand what is happening
                on the other side of the sale.
              </p>

              <p className="kyc-hero-bold">
                This simple guided tool helps you understand what your
                customers want, what they struggle with, what makes them
                hesitate and what can make your offer easier to say yes to.
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
                <span>Use for any product, service or offer</span>
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


        {/* =========================
            THE REAL PROBLEM
        ========================= */}

        <section className="kyc-section kyc-dark-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              THE REAL PROBLEM
            </div>

            <h2 className="kyc-section-title">
              You don't always have a
              <br />
              <span>marketing problem.</span>
            </h2>

            <div className="kyc-two-column">

              <div>

                <p className="kyc-large-text">
                  Sometimes, you simply don't know enough about the person
                  you're trying to sell to.
                </p>

                <p>
                  You know your product. You know your service. You know how
                  much work goes into creating it.
                </p>

                <p>
                  But your customer is looking at it from a completely
                  different perspective.
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
                  That's what this worksheet helps you uncover.
                </p>

              </div>

            </div>


            <CTA>
              FIND OUT WHAT'S STOPPING YOUR CUSTOMERS — ₹19 →
            </CTA>

          </div>

        </section>


        {/* =========================
            CUSTOMER INSIGHTS
        ========================= */}

        <section className="kyc-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              THE CLARITY YOU NEED
            </div>

            <h2 className="kyc-section-title">
              What you'll finally
              <br />
              <span>understand about your customer.</span>
            </h2>

            <p className="kyc-section-intro">
              Instead of guessing what your audience wants, this tool helps
              you work through the questions that reveal the thinking behind
              their buying decision.
            </p>


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
                GET THIS CLARITY FOR ₹19 →
              </CTA>

            </div>

          </div>

        </section>


        {/* =========================
            BEFORE YOU SPEND MORE
        ========================= */}

        <section className="kyc-section kyc-light-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              BEFORE YOU SPEND MORE
            </div>


            <div className="kyc-two-column">

              <div>

                <h2 className="kyc-section-title left">
                  Before you spend more
                  <br />
                  <span>on marketing...</span>
                </h2>

                <p className="kyc-large-text">
                  Make sure you understand who you're actually trying to sell
                  to.
                </p>

                <p>
                  More ads, more content and more traffic won't solve a
                  fundamental disconnect between your offer and your customer.
                </p>

                <p>
                  Start by understanding the person on the other side of the
                  sale.
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


        {/* =========================
            WHAT YOU GET
        ========================= */}

        <section className="kyc-section kyc-dark-section">

          <div className="kyc-container">

            <div className="kyc-section-label">
              WHAT YOU GET
            </div>

            <h2 className="kyc-section-title">
              Everything you need to
              <br />
              <span>understand your customer better.</span>
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


        {/* =========================
            WHO IS THIS FOR
        ========================= */}

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
                  <span>something, this is for you.</span>
                </h2>

                <p className="kyc-large-text">
                  You don't need to be a marketing expert.
                </p>

                <p>
                  You simply need to want a better understanding of the person
                  you're trying to serve.
                </p>

              </div>


              <div className="kyc-audience-box">

                {audience.map((item) => (

                  <div
                    className="kyc-audience-item"
                    key={item}
                  >

                    <span>
                      ✓
                    </span>

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


        {/* =========================
            IDEA
        ========================= */}

        <section className="kyc-section kyc-idea-section">

          <div className="kyc-container">

            <div className="kyc-philosophy">

              <div className="kyc-section-label">
                THE IDEA BEHIND IT
              </div>

              <div className="kyc-quote">
                "The better you understand your customer,
                <br />
                the easier it becomes to create something
                <br />
                they actually want."
              </div>

              <p>
                You don't need to guess harder.
                <br />
                You need to understand better.
              </p>

              <CTA>
                STOP GUESSING — ₹19 →
              </CTA>

            </div>

          </div>

        </section>


        {/* =========================
            FINAL CTA
        ========================= */}

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

            <p>
              Find the answer in 15 minutes.
              <br />
              Understand your customer. Improve your offer.
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
          font-family:
            Arial,
            Helvetica,
            sans-serif;
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


        /* =========================
           HEADER
        ========================= */

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


        /* =========================
           HERO
        ========================= */

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

        .kyc-hero-description {
          margin: 26px 0 0;
          max-width: 650px;
          font-size: 16px;
          line-height: 1.65;
        }

        .kyc-hero-bold {
          margin: 20px 0 0;
          max-width: 680px;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 800;
        }


        /* =========================
           HERO IMAGE
        ========================= */

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


        /* =========================
           HERO CTA
        ========================= */

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
          border-radius: 12px;
          font-size: 34px;
          line-height: 1;
          font-weight: 950;
          letter-spacing: -0.05em;
        }


        /* =========================
           CTA
        ========================= */

        .kyc-cta {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;

          min-height: 68px !important;

          padding: 16px 24px !important;

          border: none !important;
          border-radius: 0 !important;

          background: #111111 !important;

          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;

          text-decoration: none !important;

          font-size: 13px !important;
          line-height: 1.2 !important;
          font-weight: 900 !important;
          letter-spacing: 0.04em !important;

          text-align: center !important;
          white-space: normal !important;

          cursor: pointer !important;

          transition:
            transform 0.2s ease,
            background-color 0.2s ease !important;
        }

        .kyc-cta:hover {
          background: #2b2b2b !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          transform: translateY(-2px);
        }


        /* =========================
           META
        ========================= */

        .kyc-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-top: 13px;
          font-size: 11px;
          color: #555555;
        }


        /* =========================
           GENERAL SECTIONS
        ========================= */

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

        .kyc-section-intro {
          max-width: 680px;
          margin: 22px 0 0;
          font-size: 16px;
          line-height: 1.65;
        }

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


        /* =========================
           HIGHLIGHT
        ========================= */

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

        .kyc-section .kyc-cta {
          margin-top: 40px;
        }


        /* =========================
           CUSTOMER INSIGHTS
        ========================= */

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
          margin-bottom: 35px;
          font-size: 12px;
          font-weight: 900;
          color: #f2a900;
        }

        .kyc-insight-card h3 {
          margin: 0 0 12px;
          font-size: 19px;
          line-height: 1.1;
          letter-spacing: -0.015em;
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


        /* =========================
           BEFORE YOU SPEND
        ========================= */

        .kyc-before-box {
          background: #ffffff;
          border: 1px solid #dddddd;
        }

        .kyc-before-row {
          display: grid;
          grid-template-columns:
            1fr auto 1fr;
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


        /* =========================
           OUTCOMES
        ========================= */

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
            50px minmax(0, 1fr);
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


        /* =========================
           AUDIENCE
        ========================= */

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


        /* =========================
           IDEA
        ========================= */

        .kyc-idea-section {
          background: #f2a900;
        }

        .kyc-philosophy {
          text-align: center;
        }

        .kyc-philosophy .kyc-section-label {
          margin-bottom: 30px;
        }

        .kyc-quote {
          font-size: clamp(30px, 4vw, 52px);
          line-height: 1.02;
          letter-spacing: -0.045em;
          font-weight: 950;
        }

        .kyc-philosophy > p {
          margin: 26px auto 0;
          font-size: 16px;
          line-height: 1.6;
          font-weight: 700;
        }

        .kyc-philosophy .kyc-cta {
          margin-top: 30px;
        }


        /* =========================
           FINAL CTA
        ========================= */

        .kyc-final {
          background: #111111;
          color: #ffffff;
          padding: 90px 0;
          text-align: center;
        }

        .kyc-final .kyc-section-label {
          color: #f2a900;
        }

        .kyc-final h2 {
          margin: 0;
          font-size: clamp(40px, 5.5vw, 72px);
          line-height: 0.94;
          letter-spacing: -0.05em;
          font-weight: 950;
        }

        .kyc-final > .kyc-container > p {
          margin: 26px auto 0;
          max-width: 600px;
          font-size: 17px;
          line-height: 1.5;
        }

        .kyc-final-action {
          justify-content: center;
        }

        .kyc-final-action .kyc-cta {
          min-height: 68px !important;
        }

        .kyc-final-meta {
          margin-top: 16px;
          font-size: 11px;
          color: #bbbbbb;
        }

        .kyc-footer-name {
          margin-top: 70px;
          padding-top: 22px;
          border-top: 1px solid #333333;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #999999;
        }


        /* =========================
           TABLET
        ========================= */

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

        }


        /* =========================
           MOBILE
        ========================= */

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


          /* =========================
             MOBILE CONTAINER
          ========================= */

          .kyc-container {
            width: calc(100% - 28px);
            max-width: none;
            margin-left: 14px;
            margin-right: 14px;
          }


          /* =========================
             MOBILE HEADER
          ========================= */

          .kyc-header-inner {
            min-height: 52px;
            height: 52px;
            gap: 8px;
          }

          .kyc-logo {
            font-size: 9px;
            letter-spacing: 0.055em;
            white-space: nowrap;
          }

          .kyc-download-pill {
            font-size: 7px;
            line-height: 1;
            padding: 6px 7px;
            letter-spacing: 0.035em;
            white-space: nowrap;
          }


          /* =========================
             MOBILE HERO
          ========================= */

          .kyc-hero {
            padding: 18px 0 42px;
          }

          .kyc-hero-grid {
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          .kyc-hero-copy {
            width: 100%;
            min-width: 0;
          }


          /* EYEBROW */

          .kyc-eyebrow {
            font-size: 8px;
            line-height: 1;
            padding: 7px 9px;
            margin-bottom: 15px;
            letter-spacing: 0.10em;
          }


          /* MAIN HEADLINE */

          .kyc-hero h1 {
            margin: 0;
            font-size: 38px;
            line-height: 0.94;
            letter-spacing: -0.045em;
          }


          /* SUBHEADLINE */

          .kyc-hero h2 {
            margin-top: 16px;
            font-size: 23px;
            line-height: 1.06;
            letter-spacing: -0.03em;
          }


          /* =========================
             MOBILE IMAGE
             FIRST SCROLL
          ========================= */

          .kyc-mobile-hero-visual {
            display: block;
            width: 100%;
            max-width: 100%;
            margin-top: 22px;
            margin-bottom: 23px;
          }

          .kyc-mobile-hero-visual img {
            display: block;
            width: 100%;
            max-width: 100%;
            height: auto;
            border-radius: 12px;
          }


          /* Hide desktop duplicate */

          .kyc-hero-visual {
            display: none;
          }


          /* =========================
             HERO DESCRIPTION
          ========================= */

          .kyc-hero-description {
            margin-top: 0;
            max-width: none;
            font-size: 14px;
            line-height: 1.58;
          }

          .kyc-hero-bold {
            margin-top: 16px;
            max-width: none;
            font-size: 12.5px;
            line-height: 1.56;
          }


          /* =========================
             HERO PRICE + CTA
          ========================= */

          .kyc-hero-action {
            display: grid;
            grid-template-columns: 88px minmax(0, 1fr);
            gap: 9px;
            width: 100%;
            margin-top: 23px;
          }

          .kyc-price {
            min-width: 0;
            width: 100%;
            min-height: 60px;
            height: 60px;
            padding: 7px;
            border-radius: 10px;
            font-size: 28px;
          }


          /* =========================
             ALL MOBILE CTAs
          ========================= */

          .kyc-cta {
            min-height: 60px !important;
            width: 100%;
            min-width: 0;

            padding: 12px 11px !important;

            font-size: 10.5px !important;
            line-height: 1.25 !important;
            letter-spacing: 0.018em !important;

            white-space: normal !important;
          }


          /* =========================
             META
          ========================= */

          .kyc-meta {
            margin-top: 10px;
            gap: 5px;
            font-size: 8.5px;
            line-height: 1.4;
          }


          /* =========================
             SECTIONS
          ========================= */

          .kyc-section {
            padding: 52px 0;
          }

          .kyc-section-label {
            font-size: 8.5px;
            line-height: 1;
            margin-bottom: 14px;
            letter-spacing: 0.115em;
          }

          .kyc-section-title {
            max-width: 100%;
            font-size: 32px;
            line-height: 0.98;
            letter-spacing: -0.04em;
          }

          .kyc-section-title.left {
            max-width: 100%;
          }

          .kyc-section-intro {
            max-width: 100%;
            margin-top: 17px;
            font-size: 13.5px;
            line-height: 1.58;
          }


          /* =========================
             TWO COLUMN → ONE COLUMN
          ========================= */

          .kyc-two-column {
            display: flex;
            flex-direction: column;
            gap: 27px;
            margin-top: 29px;
          }

          .kyc-two-column > div {
            width: 100%;
            min-width: 0;
          }

          .kyc-two-column p {
            max-width: 100%;
            font-size: 13.5px;
            line-height: 1.62;
          }

          .kyc-large-text {
            font-size: 17px !important;
            line-height: 1.38 !important;
          }


          /* =========================
             HIGHLIGHT BOX
          ========================= */

          .kyc-highlight-box {
            width: 100%;
            padding: 24px;
            border-radius: 11px;
          }

          .kyc-highlight-mark {
            font-size: 43px;
          }

          .kyc-highlight-box h3 {
            margin: 17px 0 11px;
            font-size: 21px;
            line-height: 1.05;
          }

          .kyc-highlight-box p {
            font-size: 13px !important;
            line-height: 1.5 !important;
          }

          .kyc-section .kyc-cta {
            margin-top: 29px;
          }


          /* =========================
             INSIGHTS
          ========================= */

          .kyc-insights-grid {
            display: flex;
            flex-direction: column;
            gap: 9px;
            margin-top: 29px;
          }

          .kyc-insight-card {
            width: 100%;
            padding: 21px;
          }

          .kyc-card-number {
            margin-bottom: 20px;
            font-size: 9px;
          }

          .kyc-insight-card h3 {
            margin-bottom: 10px;
            font-size: 16px;
            line-height: 1.08;
          }

          .kyc-insight-card p {
            font-size: 12.5px;
            line-height: 1.52;
          }

          .kyc-centered-cta {
            display: block;
            width: 100%;
          }


          /* =========================
             BEFORE YOU SPEND
          ========================= */

          .kyc-before-box {
            width: 100%;
          }

          .kyc-before-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 3px;
            padding: 16px;
            font-size: 9.5px;
            line-height: 1.3;
          }

          .kyc-before-row strong {
            display: none;
          }


          /* =========================
             OUTCOMES
          ========================= */

          .kyc-outcomes {
            margin-top: 29px;
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .kyc-outcome {
            display: grid;
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 8px;
            padding: 16px 0;
          }

          .kyc-outcome span {
            font-size: 9px;
          }

          .kyc-outcome p {
            font-size: 12.5px;
            line-height: 1.42;
          }


          /* =========================
             AUDIENCE
          ========================= */

          .kyc-audience-box {
            width: 100%;
          }

          .kyc-audience-item {
            padding: 12px 0;
            gap: 9px;
          }

          .kyc-audience-item span {
            font-size: 13px;
          }

          .kyc-audience-item p {
            font-size: 12.5px;
            line-height: 1.38;
          }


          /* =========================
             IDEA
          ========================= */

          .kyc-philosophy .kyc-section-label {
            margin-bottom: 21px;
          }

          .kyc-quote {
            font-size: 27px;
            line-height: 1.04;
            letter-spacing: -0.04em;
          }

          .kyc-philosophy > p {
            margin-top: 21px;
            font-size: 13.5px;
            line-height: 1.52;
          }

          .kyc-philosophy .kyc-cta {
            margin-top: 23px;
          }


          /* =========================
             FINAL CTA
          ========================= */

          .kyc-final {
            padding: 60px 0;
          }

          .kyc-final h2 {
            font-size: 39px;
            line-height: 0.94;
            letter-spacing: -0.045em;
          }

          .kyc-final > .kyc-container > p {
            margin-top: 19px;
            font-size: 14px;
            line-height: 1.5;
          }

          .kyc-final-action {
            display: grid;
            grid-template-columns: 88px minmax(0, 1fr);
            gap: 9px;
            width: 100%;
            margin-top: 24px;
          }

          .kyc-final-price {
            min-width: 0;
            width: 100%;
            min-height: 60px;
            height: 60px;
            padding: 7px;
            border-radius: 10px;
            font-size: 28px;
          }

          .kyc-final-action .kyc-cta {
            width: 100%;
            min-width: 0;
          }

          .kyc-final-meta {
            margin-top: 12px;
            font-size: 8.5px;
          }

          .kyc-footer-name {
            margin-top: 48px;
            padding-top: 17px;
            font-size: 8.5px;
          }

        }


        /* =========================
           VERY SMALL PHONES
        ========================= */

        @media (max-width: 380px) {

          .kyc-container {
            width: calc(100% - 24px);
            margin-left: 12px;
            margin-right: 12px;
          }

          .kyc-logo {
            font-size: 8px;
          }

          .kyc-download-pill {
            font-size: 6.5px;
            padding: 5px 6px;
          }

          .kyc-hero {
            padding-top: 16px;
          }

          .kyc-hero h1 {
            font-size: 35px;
          }

          .kyc-hero h2 {
            font-size: 21px;
          }

          .kyc-section-title {
            font-size: 29px;
          }

          .kyc-hero-action,
          .kyc-final-action {
            grid-template-columns: 78px minmax(0, 1fr);
          }

          .kyc-price,
          .kyc-final-price {
            font-size: 25px;
          }

          .kyc-cta {
            font-size: 9.5px !important;
            padding-left: 8px !important;
            padding-right: 8px !important;
          }

          .kyc-final h2 {
            font-size: 35px;
          }

        }

      `}</style>
    </>
  );
}
