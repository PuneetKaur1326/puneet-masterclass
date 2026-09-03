"use client";

import Link from "next/link";

const CHECKOUT_URL = "/know-your-customer/checkout";

const customerInsights = [
  {
    number: "01",
    title: "WHAT YOUR CUSTOMER REALLY WANTS",
    description:
      "Understand the result or outcome they are actually looking for — not just what they say they need.",
  },
  {
    number: "02",
    title: "THE PROBLEM THEY'RE TRYING TO SOLVE",
    description:
      "Get clear on the problem that is making them look for a solution in the first place.",
  },
  {
    number: "03",
    title: "WHY IT MATTERS TO THEM",
    description:
      "Understand the deeper reason behind the purchase and why solving this problem matters.",
  },
  {
    number: "04",
    title: "WHAT THEY'VE ALREADY TRIED",
    description:
      "See what they've already done, bought or experienced — and what may not have worked.",
  },
  {
    number: "05",
    title: "WHAT'S STOPPING THEM FROM BUYING",
    description:
      "Identify doubts, objections, fears and hesitation that may be standing between interest and purchase.",
  },
  {
    number: "06",
    title: "THE WORDS THEY ACTUALLY USE",
    description:
      "Understand how your customer describes their problem, needs and desires in their own language.",
  },
  {
    number: "07",
    title: "WHAT THEY NEED TO TRUST YOU",
    description:
      "Get clearer on what could make your customer feel confident enough to choose your offer.",
  },
  {
    number: "08",
    title: "WHAT YOU CAN DO DIFFERENTLY",
    description:
      "Turn what you discover into clearer direction for your offer, communication and sales approach.",
  },
];

const questions = [
  "What does my customer actually want?",
  "What problem are they trying to solve?",
  "Why does solving it matter to them?",
  "What's stopping them from buying?",
  "What have they already tried?",
  "What would make them trust my offer?",
];

const outcomes = [
  "A clearer picture of who you're actually selling to",
  "A better understanding of what your customer wants",
  "The doubts and objections that may be stopping a purchase",
  "The language your customer actually uses",
  "Better direction for your offer and communication",
  "More clarity about what to say and what to change",
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
          --yellow-dark: #d99f00;
          --black: #111111;
          --cream: #fffdf7;
          --soft: #f7f3e8;
          --line: #dedbd1;
          --muted: #66635c;

          width: 100%;
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

        .kyc-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          min-width: 0;
        }

        /* HEADER */

        .kyc-header {
          position: sticky;
          top: 0;
          z-index: 20;

          border-bottom: 1px solid var(--line);

          background: rgba(255, 253, 247, 0.96);
          backdrop-filter: blur(10px);
        }

        .kyc-header-inner {
          min-height: 70px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;
        }

        .kyc-brand {
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

        /* HERO */

        .kyc-hero {
          padding: 72px 0 88px;
        }

        .kyc-hero-grid {
          display: grid;

          grid-template-columns:
            minmax(0, 1.05fr)
            minmax(0, 0.95fr);

          gap: 60px;

          align-items: center;
        }

        .kyc-hero-copy {
          min-width: 0;
        }

        .kyc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 20px;

          color: #a86f00;

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
          margin: 0;

          max-width: 680px;

          font-size: clamp(48px, 6.2vw, 82px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 950;

          overflow-wrap: break-word;
        }

        .kyc-hero h2 {
          margin: 24px 0 0;

          font-size: clamp(24px, 2.7vw, 35px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          font-weight: 850;
        }

        .kyc-lead {
          max-width: 650px;

          margin: 25px 0 0;

          color: #45433e;

          font-size: 18px;
          line-height: 1.6;
        }

        .kyc-business-line {
          max-width: 640px;

          margin: 17px 0 0;

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

          transition: 0.2s ease;
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

        /* HERO VISUAL */

        .kyc-visual {
          width: 100%;
          min-width: 0;

          position: relative;
        }

        .kyc-visual img {
          width: 100%;
          height: auto;

          display: block;

          border: 2px solid var(--black);

          box-shadow: 14px 14px 0 var(--yellow);
        }

        /* GENERAL SECTIONS */

        .kyc-section {
          padding: 90px 0;

          border-top: 1px solid var(--line);
        }

        .kyc-section-soft {
          background: var(--soft);
        }

        .kyc-section-heading {
          width: 100%;
          max-width: 820px;
        }

        .kyc-section-heading h2 {
          margin: 0;

          font-size: clamp(38px, 5vw, 64px);
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

        /* WHY PEOPLE AREN'T BUYING */

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
          min-width: 0;
          min-height: 145px;

          padding: 27px 30px;

          display: flex;
          flex-direction: column;
          justify-content: center;

          background: white;

          border-right: 1px solid var(--black);
          border-bottom: 1px solid var(--black);
        }

        .kyc-question-card::before {
          content: "?";

          width: 32px;
          height: 32px;

          margin-bottom: 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 2px solid var(--black);
          border-radius: 50%;

          background: var(--yellow);

          font-size: 13px;
          font-weight: 900;
        }

        .kyc-question-card p {
          margin: 0;

          font-size: 16px;
          line-height: 1.4;
          font-weight: 800;

          overflow-wrap: anywhere;
        }

        .kyc-highlight-box {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin-top: 28px;

          padding: 24px 28px;

          background: white;

          border-left: 6px solid var(--yellow-dark);

          font-size: 18px;
          line-height: 1.55;
          font-weight: 800;

          overflow-wrap: anywhere;
        }

        /* CUSTOMER INSIGHTS */

        .kyc-insights-grid {
          width: 100%;
          max-width: 100%;

          margin-top: 50px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 14px;
        }

        .kyc-insight-card {
          min-width: 0;

          padding: 28px;

          display: grid;

          grid-template-columns: 52px minmax(0, 1fr);

          gap: 20px;

          background: white;

          border: 1px solid var(--black);
        }

        .kyc-insight-number {
          width: 46px;
          height: 46px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--yellow);

          border: 1px solid var(--black);

          font-size: 11px;
          font-weight: 950;
        }

        .kyc-insight-card h3 {
          margin: 0;

          font-size: 15px;
          line-height: 1.2;
          letter-spacing: 0.01em;
        }

        .kyc-insight-card p {
          margin: 9px 0 0;

          color: var(--muted);

          font-size: 13px;
          line-height: 1.5;
        }

        /* BUSINESS COST */

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

        .kyc-before h2 {
          margin: 0;

          font-size: clamp(38px, 4.5vw, 60px);
          line-height: 0.97;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .kyc-before-content p {
          margin: 0 0 18px;

          color: #4d4a44;

          font-size: 17px;
          line-height: 1.65;
        }

        .kyc-spend-box {
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
          line-height: 1.08;
          letter-spacing: -0.035em;
        }

        /* WHAT YOU GET */

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
          margin: 0;
          padding: 0;

          list-style: none;
        }

        .kyc-outcomes-list li {
          min-width: 0;

          padding: 17px 0;

          display: flex;

          gap: 13px;

          border-top: 1px solid var(--line);

          font-size: 15px;
          line-height: 1.45;
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

        /* WHO IT'S FOR */

        .kyc-audience-box {
          padding: 28px;

          background: white;

          border: 1px solid var(--black);
        }

        .kyc-audience-box h3 {
          margin: 0 0 18px;

          font-size: 25px;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .kyc-audience-box p {
          margin: 0 0 22px;

          color: var(--muted);

          font-size: 14px;
          line-height: 1.55;
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
          letter-spacing: 0.04em;
        }

        /* PHILOSOPHY */

        .kyc-philosophy {
          padding-top: 90px;
          padding-bottom: 90px;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.75fr);

          gap: 70px;

          align-items: center;
        }

        .kyc-philosophy h2 {
          margin: 0;

          font-size: clamp(38px, 5vw, 64px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .kyc-philosophy p {
          max-width: 760px;

          margin: 22px 0 0;

          color: #4e4b45;

          font-size: 17px;
          line-height: 1.65;
        }

        .kyc-quote {
          padding: 32px;

          background: var(--yellow);

          border: 2px solid var(--black);
        }

        .kyc-quote small {
          display: block;

          margin-bottom: 20px;

          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .kyc-quote blockquote {
          margin: 0;

          font-size: clamp(24px, 3vw, 36px);
          line-height: 1.05;
          letter-spacing: -0.04em;
          font-weight: 900;
        }

        .kyc-quote > span {
          display: block;

          margin-top: 20px;

          font-size: 10px;
          font-weight: 700;
        }

        /* FINAL CTA */

        .kyc-final {
          padding: 100px 0;

          background: var(--black);

          color: white;
        }

        .kyc-final-inner {
          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(280px, 0.55fr);

          gap: 60px;

          align-items: center;
        }

        .kyc-final .kyc-eyebrow {
          color: var(--yellow);
        }

        .kyc-final .kyc-eyebrow::before {
          background: var(--yellow);
        }

        .kyc-final h2 {
          margin: 0;

          max-width: 800px;

          font-size: clamp(48px, 6.5vw, 82px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 950;
        }

        .kyc-final h2 span {
          color: var(--yellow);
        }

        .kyc-final-copy {
          max-width: 650px;

          margin-top: 24px;

          color: #c8c5bd;

          font-size: 17px;
          line-height: 1.6;
        }

        .kyc-final-buy {
          padding: 30px;

          background: white;

          color: var(--black);

          border: 2px solid white;

          text-align: center;
        }

        .kyc-final-price {
          font-size: 54px;
          line-height: 1;

          font-weight: 950;

          letter-spacing: -0.06em;
        }

        .kyc-final-badge {
          display: inline-block;

          margin-top: 10px;
          padding: 7px 12px;

          background: var(--yellow);

          font-size: 9px;
          font-weight: 950;

          letter-spacing: 0.1em;
        }

        .kyc-final .kyc-cta {
          width: 100%;

          margin-top: 24px;

          background: var(--black);

          color: white;

          border-color: var(--black);
        }

        .kyc-final-buy > small {
          display: block;

          margin-top: 13px;

          color: var(--muted);

          font-size: 10px;
        }

        /* FOOTER */

        .kyc-footer {
          padding: 25px 0;

          background: var(--black);

          border-top: 1px solid #353535;

          color: #99968e;

          text-align: center;

          font-size: 10px;

          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* TABLET */

        @media (max-width: 850px) {
          .kyc-hero-grid,
          .kyc-before,
          .kyc-outcomes,
          .kyc-philosophy,
          .kyc-final-inner {
            grid-template-columns: minmax(0, 1fr);
          }

          .kyc-hero-grid {
            gap: 50px;
          }

          .kyc-insights-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .kyc-question-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .kyc-final-buy {
            max-width: 500px;
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .kyc-container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .kyc-header-inner {
            min-height: 62px;
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
          }

          .kyc-hero {
            padding: 52px 0 65px;
          }

          .kyc-hero h1 {
            font-size: clamp(45px, 13vw, 70px);
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

          .kyc-section-heading h2,
          .kyc-before h2,
          .kyc-philosophy h2 {
            font-size: clamp(38px, 11vw, 58px);
          }

          .kyc-question-card {
            min-height: 125px;
            padding: 22px;
          }

          .kyc-question-card p {
            font-size: 15px;
          }

          .kyc-highlight-box {
            padding: 20px;

            border-left-width: 5px;

            font-size: 15px;
          }

          .kyc-insight-card {
            padding: 21px;

            grid-template-columns: 44px minmax(0, 1fr);

            gap: 15px;
          }

          .kyc-insight-number {
            width: 40px;
            height: 40px;
          }

          .kyc-insight-card h3 {
            font-size: 14px;
          }

          .kyc-insight-card p {
            font-size: 12px;
          }

          .kyc-audience-box {
            padding: 22px;
          }

          .kyc-philosophy {
            padding-top: 65px;
            padding-bottom: 65px;
          }

          .kyc-quote {
            padding: 24px;
          }

          .kyc-final {
            padding: 70px 0;
          }

          .kyc-final h2 {
            font-size: clamp(45px, 13vw, 70px);
          }

          .kyc-final-buy {
            padding: 24px;
          }
        }
      `}</style>

      {/* HEADER */}

      <header className="kyc-header">
        <div className="kyc-container kyc-header-inner">
          <div className="kyc-brand">
            Puneet Kaur Saluja
            <span>The World of Content</span>
          </div>

          <div className="kyc-pill">
            ↓ INSTANT DIGITAL DOWNLOAD
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="kyc-hero">
        <div className="kyc-container kyc-hero-grid">
          <div className="kyc-hero-copy">
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

              <Link href={CHECKOUT_URL} className="kyc-cta">
                GET THE TOOL FOR ₹19 →
              </Link>
            </div>

            <div className="kyc-micro">
              <span>⚡ Instant digital download</span>
              <span>•</span>
              <span>Use for any product, service or offer</span>
            </div>
          </div>

          <div className="kyc-visual">
            <img
              src="/kyc-sales-diagnostic.png"
              alt="Why aren't people buying from me? Find the answer in 15 minutes"
            />
          </div>
        </div>
      </section>

      {/* WHY AREN'T PEOPLE BUYING */}

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
              worry about, what they have already tried and what is stopping
              them from buying.
            </p>
          </div>

          <div className="kyc-question-grid">
            {questions.map((question) => (
              <div className="kyc-question-card" key={question}>
                <p>{question}</p>
              </div>
            ))}
          </div>

          <div className="kyc-highlight-box">
            The better you understand the person you're selling to, the
            easier it becomes to make better decisions about what you offer
            and how you sell it.
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL FINALLY KNOW */}

      <section className="kyc-section">
        <div className="kyc-container">
          <div className="kyc-section-heading">
            <div className="kyc-eyebrow">
              WHAT YOU’LL FINALLY KNOW
            </div>

            <h2>
              Stop guessing.
              <br />
              Get clear on what’s happening in your customer’s mind.
            </h2>

            <p>
              In just 15 minutes, this tool helps you uncover the answers
              behind your customer's buying decision — so you can understand
              what they want, what's holding them back and what could make
              them choose you.
            </p>
          </div>

          <div className="kyc-insights-grid">
            {customerInsights.map((item) => (
              <div className="kyc-insight-card" key={item.number}>
                <div className="kyc-insight-number">
                  {item.number}
                </div>

                <div>
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="kyc-highlight-box">
            <strong>
              By the end, you won't just know more about your customer.
              You'll have a clearer idea of what may be standing between
              them and a purchase.
            </strong>
          </div>
        </div>
      </section>

      {/* BEFORE YOU SPEND MORE */}

      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-before">
            <div>
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
                Take 15 minutes to understand the person you're trying to sell
                to first.
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

      {/* HOW IT WORKS */}

      <section className="kyc-section">
        <div className="kyc-container">
          <div className="kyc-section-heading">
            <div className="kyc-eyebrow">
              THE 15-MINUTE PROCESS
            </div>

            <h2>
              One customer.
              <br />
              One offer.
              <br />
              <span>15 minutes.</span>
            </h2>

            <p>
              No complicated research. No marketing jargon. Just a simple
              guided process to help you think through your customer from
              their side of the sale.
            </p>
          </div>

          <div className="kyc-highlight-box">
            <strong>
              Pick one product, service or offer. Work through the tool.
              Leave with a much clearer picture of the person you're trying
              to sell to.
            </strong>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}

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

      {/* WHO IT'S FOR */}

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

            <div className="kyc-audience-box">
              <h3>Built for business owners.</h3>

              <p>
                Whether you're selling online, offline, one-to-one or at
                scale, the questions are simple: Who am I selling to? What do
                they want? And what might be stopping them from buying?
              </p>

              <div className="kyc-chips">
                {audience.map((item) => (
                  <span className="kyc-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDEA */}

      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container kyc-philosophy">
          <div>
            <div className="kyc-eyebrow">
              THE IDEA BEHIND IT
            </div>

            <h2>
              You don't need a “perfect customer.”
              <br />
              You need to understand a real one.
            </h2>

            <p>
              This isn't about inventing a fictional customer profile filled
              with demographics.
            </p>

            <p>
              It's about putting yourself in your customer's shoes and asking
              better questions before you make another sales decision.
            </p>

            <p>
              Because an honest gap in your knowledge is better than a
              confident assumption.
            </p>
          </div>

          <aside className="kyc-quote">
            <small>ONE FINAL QUESTION</small>

            <blockquote>
              “Would my customer feel like I'm talking <b>TO</b> them — or
              <b> ABOUT</b> my product?”
            </blockquote>

            <span>
              — Know Your Customer
            </span>
          </aside>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="kyc-final">
        <div className="kyc-container kyc-final-inner">
          <div>
            <div className="kyc-eyebrow">
              START WITH THE CUSTOMER
            </div>

            <h2>
              Why aren’t people
              <br />
              <span>buying from me?</span>
            </h2>

            <p className="kyc-final-copy">
              Find out what your customers want, what's stopping them and
              what you can do differently — starting with just 15 minutes.
            </p>
          </div>

          <div className="kyc-final-buy">
            <div className="kyc-final-price">
              ₹19
            </div>

            <div className="kyc-final-badge">
              INSTANT ACCESS
            </div>

            <Link
              href={CHECKOUT_URL}
              className="kyc-cta"
            >
              YES, I WANT THE TOOL →
            </Link>

            <small>
              ⚡ Instant digital download
            </small>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="kyc-footer">
        © {new Date().getFullYear()} Puneet Kaur Saluja • All Rights Reserved
      </footer>
    </main>
  );
}
