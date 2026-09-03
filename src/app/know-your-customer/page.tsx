"use client";

import Link from "next/link";

const CHECKOUT_URL = "/know-your-customer/checkout";

const steps = [
  {
    number: "01",
    title: "WHO ARE YOU SELLING TO?",
    description:
      "Get clear on the actual person you want to buy from you — not just their age, location or job.",
  },
  {
    number: "02",
    title: "WHAT DO THEY WANT?",
    description:
      "Understand the result your customer is really looking for when they consider buying from you.",
  },
  {
    number: "03",
    title: "WHY DO THEY WANT IT?",
    description:
      "Go deeper into the reason behind the purchase and what actually matters to them.",
  },
  {
    number: "04",
    title: "WHAT HAVE THEY TRIED?",
    description:
      "Understand what they have already done, bought or experienced — and what didn't work.",
  },
  {
    number: "05",
    title: "WHY HAVEN'T THEY BOUGHT YET?",
    description:
      "Uncover the doubts, objections, fears and hesitation that can stop someone from saying yes.",
  },
  {
    number: "06",
    title: "HOW DO THEY DESCRIBE THEIR PROBLEM?",
    description:
      "Find the words your customer actually uses to talk about their problem or desire.",
  },
  {
    number: "07",
    title: "PUT IT ALL TOGETHER",
    description:
      "Turn your answers into a clearer picture of the person you're trying to sell to.",
  },
  {
    number: "08",
    title: "USE WHAT YOU LEARN",
    description:
      "Use what you discover to improve your offer, communication and sales approach.",
  },
];

const questions = [
  "What does my customer actually want?",
  "What problem are they trying to solve?",
  "Why does solving it matter to them?",
  "What is stopping them from buying?",
  "What have they already tried?",
  "What would make them trust my offer enough to say yes?",
];

const outcomes = [
  "A clearer picture of who you're actually selling to",
  "A better understanding of what your customer wants",
  "The reasons and objections that may be stopping a purchase",
  "The actual language your customer uses to describe their problem",
  "Better ideas for your offer, content and communication",
  "More clarity on what to say and how to position what you sell",
];

const audience = [
  "Business Owners",
  "Founders",
  "Coaches",
  "Consultants",
  "Freelancers",
  "Service Providers",
  "Creators",
  "Local Businesses",
];

export default function KnowYourCustomerPage() {
  return (
    <main className="kyc-page">
      <style jsx global>{`
        .kyc-page {
          --yellow: #f4c542;
          --yellow-dark: #dba900;
          --black: #111111;
          --cream: #fffdf7;
          --soft: #f7f3e8;
          --line: #dedbd1;
          --muted: #66635c;

          width: 100%;
          max-width: 100%;
          min-height: 100vh;
          overflow-x: hidden;

          background: var(--cream);
          color: var(--black);

          font-family: Arial, Helvetica, sans-serif;
        }

        .kyc-page *,
        .kyc-page *::before,
        .kyc-page *::after {
          box-sizing: border-box;
        }

        .kyc-page img {
          max-width: 100%;
        }

        /* =========================
           HEADER
        ========================= */

        .kyc-header {
          position: sticky;
          top: 0;
          z-index: 20;

          width: 100%;

          border-bottom: 1px solid var(--line);
          background: rgba(255, 253, 247, 0.96);

          backdrop-filter: blur(10px);
        }

        .kyc-header-inner {
          width: 100%;
          max-width: 1180px;

          margin: 0 auto;
          padding: 18px 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
        }

        .kyc-brand {
          min-width: 0;

          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .kyc-brand span {
          display: block;

          margin-top: 3px;

          color: var(--muted);

          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
        }

        .kyc-pill {
          flex-shrink: 0;

          padding: 9px 14px;

          border: 1px solid var(--black);
          border-radius: 999px;

          background: var(--yellow);

          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        /* =========================
           CONTAINER
        ========================= */

        .kyc-container {
          width: 100%;
          max-width: 1180px;

          margin: 0 auto;

          padding-left: 24px;
          padding-right: 24px;

          min-width: 0;
        }

        /* =========================
           HERO
        ========================= */

        .kyc-hero {
          width: 100%;
          min-width: 0;

          padding: 75px 0 90px;

          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

          gap: 65px;
          align-items: center;
        }

        .kyc-hero > * {
          min-width: 0;
        }

        .kyc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 20px;

          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .kyc-eyebrow::before {
          content: "";

          width: 22px;
          height: 3px;

          flex-shrink: 0;

          background: var(--yellow-dark);
        }

        .kyc-hero h1 {
          max-width: 650px;

          margin: 0;

          font-size: clamp(48px, 6vw, 80px);
          line-height: 0.9;
          letter-spacing: -0.055em;
          font-weight: 950;

          overflow-wrap: break-word;
        }

        .kyc-hero h2 {
          margin: 25px 0 0;

          font-size: clamp(24px, 2.5vw, 34px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          font-weight: 800;
        }

        .kyc-lead {
          max-width: 640px;

          margin: 24px 0 0;

          color: #45433e;

          font-size: 18px;
          line-height: 1.6;
        }

        .kyc-business-line {
          max-width: 620px;

          margin: 16px 0 0;

          font-size: 15px;
          line-height: 1.55;
          font-weight: 800;
        }

        .kyc-price-row {
          margin-top: 30px;

          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 18px;
        }

        .kyc-price {
          font-size: 48px;
          font-weight: 950;
          letter-spacing: -0.06em;
        }

        .kyc-cta {
          min-height: 54px;

          padding: 0 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          background: var(--black);
          color: white;

          border: 2px solid var(--black);

          text-decoration: none;

          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;

          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .kyc-cta:hover {
          transform: translateY(-2px);
          background: #292929;
        }

        .kyc-micro {
          margin-top: 15px;

          display: flex;
          flex-wrap: wrap;

          gap: 10px;

          color: var(--muted);

          font-size: 11px;
        }

        /* =========================
           HERO IMAGE
        ========================= */

        .kyc-visual {
          width: 100%;
          min-width: 0;

          position: relative;
        }

        .kyc-visual img {
          width: 100%;
          max-width: 100%;
          height: auto;

          display: block;

          border: 2px solid var(--black);

          box-shadow: 14px 14px 0 var(--yellow);
        }

        /* =========================
           SECTIONS
        ========================= */

        .kyc-section {
          width: 100%;
          min-width: 0;

          padding: 90px 0;

          border-top: 1px solid var(--line);
        }

        .kyc-section-soft {
          background: var(--soft);
        }

        .kyc-section-heading {
          width: 100%;
          max-width: 800px;
          min-width: 0;
        }

        .kyc-section-heading h2 {
          max-width: 800px;

          margin: 0;

          font-size: clamp(38px, 5vw, 62px);
          line-height: 0.96;
          letter-spacing: -0.055em;
          font-weight: 950;

          overflow-wrap: break-word;
        }

        .kyc-section-heading p {
          max-width: 760px;

          margin: 20px 0 0;

          color: var(--muted);

          font-size: 17px;
          line-height: 1.6;
        }

        /* =========================
           CUSTOMER QUESTIONS
        ========================= */

        .kyc-question-grid {
          width: 100%;
          max-width: 100%;

          margin-top: 45px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          border-top: 1px solid var(--black);
          border-left: 1px solid var(--black);

          overflow: hidden;
        }

        .kyc-question-card {
          width: 100%;
          min-width: 0;
          min-height: 150px;

          padding: 28px 32px;

          background: white;

          border-right: 1px solid var(--black);
          border-bottom: 1px solid var(--black);

          display: flex;
          flex-direction: column;
          justify-content: center;

          overflow-wrap: anywhere;
        }

        .kyc-question-card::before {
          content: "?";

          width: 34px;
          height: 34px;

          flex: 0 0 auto;

          margin-bottom: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 2px solid var(--black);
          border-radius: 50%;

          background: var(--yellow);

          font-size: 14px;
          font-weight: 900;
        }

        .kyc-question-card p {
          width: 100%;
          max-width: 100%;

          margin: 0;

          font-size: 16px;
          line-height: 1.4;
          font-weight: 800;

          overflow-wrap: anywhere;
        }

        /* =========================
           HIGHLIGHT BOX
        ========================= */

        .kyc-highlight {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin-top: 28px;

          padding: 25px 28px;

          display: block;

          background: white;

          border-left: 6px solid var(--yellow-dark);

          color: var(--black);

          font-size: 18px;
          line-height: 1.55;
          font-weight: 850;

          text-align: left;

          overflow-wrap: anywhere;
          word-break: normal;
        }

        /* =========================
           STEPS
        ========================= */

        .kyc-steps {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin-top: 50px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 14px;
        }

        .kyc-step {
          width: 100%;
          min-width: 0;

          padding: 26px;

          display: grid;

          grid-template-columns: 54px minmax(0, 1fr);

          gap: 20px;

          background: white;

          border: 1px solid var(--black);
        }

        .kyc-step-number {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--yellow);

          border: 1px solid var(--black);

          font-size: 12px;
          font-weight: 950;
        }

        .kyc-step h3 {
          margin: 0;

          font-size: 15px;
          line-height: 1.15;
        }

        .kyc-step p {
          margin: 9px 0 0;

          color: var(--muted);

          font-size: 13px;
          line-height: 1.5;
        }

        /* =========================
           BEFORE YOU SPEND MORE
        ========================= */

        .kyc-before {
          width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            minmax(0, 0.8fr)
            minmax(0, 1.2fr);

          gap: 70px;
        }

        .kyc-before > * {
          min-width: 0;
        }

        .kyc-before-copy h2 {
          margin: 0;

          font-size: clamp(38px, 4.5vw, 58px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 950;

          overflow-wrap: break-word;
        }

        .kyc-before-content p {
          margin: 0 0 18px;

          color: #4d4a44;

          font-size: 17px;
          line-height: 1.65;
        }

        .kyc-spend-box {
          width: 100%;
          max-width: 100%;

          margin-top: 25px;

          padding: 26px;

          background: var(--yellow);

          border: 2px solid var(--black);
        }

        .kyc-spend-box small {
          display: block;

          margin-bottom: 9px;

          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .kyc-spend-box strong {
          display: block;

          font-size: 25px;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }

        /* =========================
           PREVIEW
        ========================= */

        .kyc-preview-grid {
          width: 100%;
          max-width: 100%;

          margin-top: 45px;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 14px;
        }

        .kyc-preview-card {
          width: 100%;
          min-width: 0;

          aspect-ratio: 0.78;

          position: relative;

          padding: 17px;

          overflow: hidden;

          background: white;

          border: 1px solid var(--black);
        }

        .kyc-preview-card:nth-child(2) {
          transform: translateY(18px);
        }

        .kyc-preview-card:nth-child(3) {
          transform: translateY(5px);
        }

        .kyc-preview-card:nth-child(4) {
          transform: translateY(25px);
        }

        .kyc-preview-number {
          color: var(--yellow-dark);

          font-size: 9px;
          font-weight: 900;
        }

        .kyc-preview-card h3 {
          margin: 30px 0 10px;

          font-size: 20px;
          line-height: 1;

          letter-spacing: -0.035em;
        }

        .kyc-preview-lines {
          margin-top: 20px;

          display: grid;

          gap: 8px;
        }

        .kyc-preview-lines span {
          width: 100%;
          height: 1px;

          background: #d6d3ca;
        }

        /* =========================
           OUTCOMES
        ========================= */

        .kyc-outcomes {
          width: 100%;
          min-width: 0;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 70px;

          align-items: start;
        }

        .kyc-outcomes > * {
          min-width: 0;
        }

        .kyc-outcomes-list {
          width: 100%;
          min-width: 0;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .kyc-outcomes-list li {
          width: 100%;
          min-width: 0;

          padding: 17px 0;

          display: flex;

          gap: 13px;

          border-top: 1px solid var(--line);

          font-size: 15px;
          line-height: 1.4;
          font-weight: 700;
        }

        .kyc-outcomes-list li::before {
          content: "✓";

          flex: 0 0 auto;

          width: 22px;
          height: 22px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border: 1px solid var(--black);
          border-radius: 50%;

          background: var(--yellow);

          font-size: 11px;
          font-weight: 950;
        }

        /* =========================
           AUDIENCE
        ========================= */

        .kyc-audience {
          width: 100%;
          min-width: 0;

          padding: 28px;

          background: white;

          border: 1px solid var(--black);
        }

        .kyc-audience h3 {
          margin: 0 0 18px;

          font-size: 25px;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .kyc-audience p {
          margin: 0 0 22px;

          color: var(--muted);

          font-size: 14px;
          line-height: 1.5;
        }

        .kyc-chips {
          display: flex;
          flex-wrap: wrap;

          gap: 8px;
        }

        .kyc-chip {
          padding: 8px 11px;

          border: 1px solid var(--black);

          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }

        /* =========================
           IDEA
        ========================= */

        .kyc-idea {
          width: 100%;
          max-width: 850px;
          min-width: 0;
        }

        .kyc-idea h2 {
          margin: 0;

          font-size: clamp(38px, 5vw, 64px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 950;

          overflow-wrap: break-word;
        }

        .kyc-idea p {
          margin: 22px 0 0;

          color: #4e4b45;

          font-size: 18px;
          line-height: 1.65;
        }

        .kyc-quote {
          width: 100%;
          max-width: 100%;

          margin-top: 38px;

          padding: 28px;

          background: var(--yellow);

          border: 2px solid var(--black);

          font-size: clamp(22px, 3vw, 34px);
          line-height: 1.1;
          letter-spacing: -0.035em;
          font-weight: 900;

          overflow-wrap: anywhere;
        }

        /* =========================
           FINAL CTA
        ========================= */

        .kyc-final {
          width: 100%;

          padding: 100px 0;

          background: var(--black);

          color: white;

          text-align: center;
        }

        .kyc-final .kyc-eyebrow {
          color: var(--yellow);
        }

        .kyc-final .kyc-eyebrow::before {
          background: var(--yellow);
        }

        .kyc-final h2 {
          max-width: 850px;

          margin: 0 auto;

          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 950;

          overflow-wrap: break-word;
        }

        .kyc-final h2 span {
          color: var(--yellow);
        }

        .kyc-final p {
          max-width: 680px;

          margin: 25px auto 0;

          color: #c8c5bd;

          font-size: 17px;
          line-height: 1.6;
        }

        .kyc-final-price {
          margin-top: 30px;

          font-size: 52px;
          line-height: 1;

          font-weight: 950;

          letter-spacing: -0.06em;
        }

        .kyc-final-badge {
          display: inline-block;

          margin-top: 12px;

          padding: 7px 12px;

          background: var(--yellow);
          color: var(--black);

          font-size: 9px;
          font-weight: 950;
          letter-spacing: 0.1em;
        }

        .kyc-final .kyc-cta {
          margin-top: 25px;

          background: var(--yellow);
          color: var(--black);

          border-color: var(--yellow);
        }

        .kyc-final .kyc-cta:hover {
          background: white;
          border-color: white;
        }

        .kyc-final .kyc-micro {
          justify-content: center;

          color: #a9a69f;
        }

        /* =========================
           FOOTER
        ========================= */

        .kyc-footer {
          width: 100%;

          padding: 25px 24px;

          background: var(--black);

          border-top: 1px solid #353535;

          color: #99968e;

          text-align: center;

          font-size: 10px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 850px) {
          .kyc-hero {
            grid-template-columns: minmax(0, 1fr);

            gap: 50px;

            padding: 55px 0 70px;
          }

          .kyc-before,
          .kyc-outcomes {
            grid-template-columns: minmax(0, 1fr);

            gap: 40px;
          }

          .kyc-steps {
            grid-template-columns: minmax(0, 1fr);
          }

          .kyc-preview-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .kyc-question-grid {
            grid-template-columns:
              minmax(0, 1fr);
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 600px) {
          .kyc-header-inner {
            padding: 14px 16px;
          }

          .kyc-container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .kyc-brand {
            font-size: 12px;
          }

          .kyc-brand span {
            font-size: 8px;
          }

          .kyc-pill {
            padding: 8px 10px;

            font-size: 8px;
            letter-spacing: 0.05em;
          }

          .kyc-hero h1 {
            font-size: clamp(46px, 13vw, 70px);
          }

          .kyc-lead {
            font-size: 16px;
          }

          .kyc-price-row {
            flex-direction: column;
            align-items: stretch;
          }

          .kyc-price {
            font-size: 42px;
          }

          .kyc-cta {
            width: 100%;
          }

          .kyc-section {
            padding: 65px 0;
          }

          .kyc-question-grid {
            margin-top: 35px;
          }

          .kyc-question-card {
            min-height: 130px;

            padding: 22px;
          }

          .kyc-question-card::before {
            width: 30px;
            height: 30px;

            margin-bottom: 13px;
          }

          .kyc-question-card p {
            font-size: 15px;
          }

          .kyc-highlight {
            margin-top: 22px;

            padding: 20px 20px;

            border-left-width: 5px;

            font-size: 15px;
            line-height: 1.5;
          }

          .kyc-step {
            padding: 21px;

            grid-template-columns: 46px minmax(0, 1fr);

            gap: 15px;
          }

          .kyc-step-number {
            width: 42px;
            height: 42px;
          }

          .kyc-preview-grid {
            gap: 10px;
          }

          .kyc-preview-card {
            padding: 12px;
          }

          .kyc-preview-card h3 {
            margin-top: 20px;

            font-size: 17px;
          }

          .kyc-audience {
            padding: 22px;
          }

          .kyc-quote {
            padding: 22px;

            font-size: 23px;
          }

          .kyc-final {
            padding: 75px 0;
          }

          .kyc-final h2 {
            font-size: clamp(45px, 13vw, 70px);
          }
        }
      `}</style>

      {/* =========================
          HEADER
      ========================= */}

      <header className="kyc-header">
        <div className="kyc-header-inner">
          <div className="kyc-brand">
            Puneet Kaur Saluja
            <span>The World of Content</span>
          </div>

          <div className="kyc-pill">
            ↓ INSTANT DIGITAL DOWNLOAD
          </div>
        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}

      <section className="kyc-container">
        <div className="kyc-hero">
          <div>
            <div className="kyc-eyebrow">
              CUSTOMERS • SALES • BUSINESS
            </div>

            <h1>
              WHY AREN’T
              <br />
              PEOPLE
              <br />
              BUYING
              <br />
              FROM ME?
            </h1>

            <h2>Find the answer in 15 minutes.</h2>

            <p className="kyc-lead">
              Your product may be good. Your service may be good. But if
              people are not buying, you need to understand what is happening
              on the other side of the sale.
            </p>

            <p className="kyc-business-line">
              This simple guided tool helps you understand what your customers
              want, what they struggle with, what makes them hesitate and what
              can make your offer easier to say yes to.
            </p>

            <div className="kyc-price-row">
              <div className="kyc-price">₹19</div>

              <Link
                href={CHECKOUT_URL}
                className="kyc-cta"
              >
                GET THE TOOL FOR ₹19 →
              </Link>
            </div>

            <div className="kyc-micro">
              <span>⚡ Instant digital download</span>

              <span>•</span>

              <span>
                Use for any product, service or offer
              </span>
            </div>
          </div>

          <div className="kyc-visual">
            <img
              src="/kyc-sales-diagnostic.png"
              alt="Why aren't people buying from me? 15-minute customer diagnostic tool"
            />
          </div>
        </div>
      </section>

      {/* =========================
          REAL PROBLEM
      ========================= */}

      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-section-heading">
            <div className="kyc-eyebrow">
              WHY PEOPLE AREN’T BUYING
            </div>

            <h2>
              You know what you sell.
              <br />
              But do you know what makes your customer say yes?
            </h2>

            <p>
              Most business owners know their product, their price and their
              process really well. But that's only one side of the sale.
            </p>

            <p>
              The other side is your customer — what they want, what they
              worry about, what they have already tried, what they don't
              understand and what is stopping them from buying.
            </p>
          </div>

          <div className="kyc-question-grid">
            {questions.map((question) => (
              <div
                className="kyc-question-card"
                key={question}
              >
                <p>{question}</p>
              </div>
            ))}
          </div>

          <div className="kyc-highlight">
            The better you understand the person you're selling to, the
            easier it becomes to create an offer and message that actually
            makes sense to them.
          </div>
        </div>
      </section>

      {/* =========================
          PROCESS
      ========================= */}

      <section className="kyc-section">
        <div className="kyc-container">
          <div className="kyc-section-heading">
            <div className="kyc-eyebrow">
              THE 15-MINUTE CUSTOMER UNDERSTANDING PROCESS
            </div>

            <h2>
              8 simple questions.
              <br />
              One clearer picture of your customer.
            </h2>

            <p>
              No complicated research. No marketing jargon. Just work through
              eight simple areas for one product, service or offer.
            </p>
          </div>

          <div className="kyc-steps">
            {steps.map((step) => (
              <div
                className="kyc-step"
                key={step.number}
              >
                <div className="kyc-step-number">
                  {step.number}
                </div>

                <div>
                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          BEFORE YOU SPEND MORE
      ========================= */}

      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-before">
            <div className="kyc-before-copy">
              <div className="kyc-eyebrow">
                BEFORE YOU SPEND MORE
              </div>

              <h2>
                Don't spend more money trying to sell to people you don't
                understand.
              </h2>
            </div>

            <div className="kyc-before-content">
              <p>
                You can spend more on ads. Post more content. Change your
                website. Change your pricing. Launch another offer.
              </p>

              <p>
                <strong>
                  But if you don't understand what your customer actually
                  wants, you may simply be getting better at talking past
                  them.
                </strong>
              </p>

              <p>
                Take 15 minutes to understand the person you're trying to
                sell to first.
              </p>

              <div className="kyc-spend-box">
                <small>THE SIMPLE IDEA</small>

                <strong>
                  Understand your customer first.
                  <br />
                  Then improve how you sell.
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          WHAT'S INSIDE
      ========================= */}

      <section className="kyc-section">
        <div className="kyc-container">
          <div className="kyc-section-heading">
            <div className="kyc-eyebrow">
              WHAT’S INSIDE
            </div>

            <h2>
              A simple process.
              <br />
              Not another complicated course.
            </h2>

            <p>
              You don't need hours of customer research. This is designed to
              help you sit down, think clearly about your customer and get
              useful answers in around 15 minutes.
            </p>
          </div>

          <div className="kyc-preview-grid">
            <div className="kyc-preview-card">
              <div className="kyc-preview-number">01</div>

              <h3>WHO IS YOUR CUSTOMER?</h3>

              <div className="kyc-preview-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="kyc-preview-card">
              <div className="kyc-preview-number">02</div>

              <h3>WHAT DO THEY WANT?</h3>

              <div className="kyc-preview-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="kyc-preview-card">
              <div className="kyc-preview-number">03</div>

              <h3>WHAT'S STOPPING THEM?</h3>

              <div className="kyc-preview-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="kyc-preview-card">
              <div className="kyc-preview-number">04</div>

              <h3>WHAT DO YOU DO NEXT?</h3>

              <div className="kyc-preview-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          OUTCOMES
      ========================= */}

      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-outcomes">
            <div>
              <div className="kyc-eyebrow">
                WHAT YOU GET
              </div>

              <div className="kyc-section-heading">
                <h2>
                  What you'll walk away with.
                </h2>

                <p>
                  Not another theory. A clearer understanding of the person
                  you're trying to sell to.
                </p>
              </div>
            </div>

            <ul className="kyc-outcomes-list">
              {outcomes.map((outcome) => (
                <li key={outcome}>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================
          WHO IT'S FOR
      ========================= */}

      <section className="kyc-section">
        <div className="kyc-container">
          <div className="kyc-outcomes">
            <div className="kyc-section-heading">
              <div className="kyc-eyebrow">
                WHO IS THIS FOR?
              </div>

              <h2>
                Anyone who sells something.
              </h2>

              <p>
                You don't need to be a marketer. If you have a product,
                service, offer or business, understanding your customer can
                help you make better decisions about how you sell it.
              </p>
            </div>

            <div className="kyc-audience">
              <h3>Built for business owners.</h3>

              <p>
                Whether you're selling online, offline, one-to-one or at
                scale, the questions are simple: Who am I selling to? What do
                they want? And what might be stopping them from buying?
              </p>

              <div className="kyc-chips">
                {audience.map((item) => (
                  <span
                    className="kyc-chip"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          IDEA
      ========================= */}

      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-idea">
            <div className="kyc-eyebrow">
              THE IDEA BEHIND IT
            </div>

            <h2>
              You don't need to create a “perfect customer.”
              <br />
              You need to understand a real one.
            </h2>

            <p>
              This isn't about inventing a fictional customer profile filled
              with demographics.
            </p>

            <p>
              It's about putting yourself in the customer's shoes and asking
              better questions before you make another sales decision.
            </p>

            <div className="kyc-quote">
              “Would my customer feel like I'm talking TO them — or ABOUT my
              product?”
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="kyc-final">
        <div className="kyc-container">
          <div className="kyc-eyebrow">
            START WITH THE CUSTOMER
          </div>

          <h2>
            Why aren’t people
            <br />
            <span>buying from me?</span>
          </h2>

          <p>
            Find out what your customers want, what is stopping them and what
            you can do differently — starting with just 15 minutes.
          </p>

          <div className="kyc-final-price">
            ₹19
          </div>

          <div className="kyc-final-badge">
            INSTANT ACCESS
          </div>

          <br />

          <Link
            href={CHECKOUT_URL}
            className="kyc-cta"
          >
            YES, I WANT TO UNDERSTAND MY CUSTOMER →
          </Link>

          <div className="kyc-micro">
            <span>⚡ Instant digital download</span>

            <span>•</span>

            <span>
              One product. One customer. 15 minutes.
            </span>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="kyc-footer">
        © {new Date().getFullYear()} Puneet Kaur Saluja • All Rights Reserved
      </footer>
    </main>
  );
}
