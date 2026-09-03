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
      "Find out what they have already done, bought or experienced — and what didn't work for them.",
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
      "Understand the exact words your customer uses to talk about their problem, need or desire.",
  },
  {
    number: "07",
    title: "PUT IT ALL TOGETHER",
    description:
      "Turn your answers into a clear picture of the person you're actually trying to sell to.",
  },
  {
    number: "08",
    title: "USE WHAT YOU LEARN",
    description:
      "Use your customer insights to improve your offer, communication, content and sales conversations.",
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
          background: var(--cream);
          color: var(--black);
          min-height: 100vh;
          font-family: Arial, Helvetica, sans-serif;
        }

        .kyc-page * {
          box-sizing: border-box;
        }

        .kyc-header {
          border-bottom: 1px solid var(--line);
          background: rgba(255, 253, 247, 0.96);
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(10px);
        }

        .kyc-header-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .kyc-brand {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .kyc-brand span {
          display: block;
          font-size: 10px;
          font-weight: 500;
          color: var(--muted);
          margin-top: 3px;
          letter-spacing: 0.08em;
        }

        .kyc-pill {
          border: 1px solid var(--black);
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: var(--yellow);
        }

        .kyc-container {
          max-width: 1180px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        .kyc-hero {
          padding: 76px 0 88px;
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 70px;
          align-items: center;
        }

        .kyc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .kyc-eyebrow::before {
          content: "";
          width: 22px;
          height: 3px;
          background: var(--yellow-dark);
          display: inline-block;
        }

        .kyc-hero h1 {
          margin: 0;
          font-size: clamp(48px, 6vw, 82px);
          line-height: 0.9;
          letter-spacing: -0.055em;
          font-weight: 950;
          max-width: 700px;
        }

        .kyc-hero h2 {
          margin: 24px 0 0;
          font-size: clamp(23px, 2.5vw, 34px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          font-weight: 800;
        }

        .kyc-lead {
          max-width: 650px;
          color: #45433e;
          font-size: 18px;
          line-height: 1.6;
          margin: 24px 0 0;
        }

        .kyc-business-line {
          margin-top: 17px;
          font-weight: 800;
          font-size: 15px;
          line-height: 1.5;
          max-width: 610px;
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 24px;
          background: var(--black);
          color: white;
          border: 2px solid var(--black);
          text-decoration: none;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .kyc-cta:hover {
          transform: translateY(-2px);
          background: #2a2a2a;
        }

        .kyc-micro {
          margin-top: 15px;
          font-size: 11px;
          color: var(--muted);
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .kyc-mockup-wrap {
          position: relative;
        }

        .kyc-mockup {
          background: white;
          border: 2px solid var(--black);
          box-shadow: 14px 14px 0 var(--yellow);
          padding: 22px;
          transform: rotate(1.3deg);
        }

        .kyc-mockup-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--line);
          padding-bottom: 14px;
          margin-bottom: 18px;
        }

        .kyc-mockup-title {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .kyc-mockup-page {
          font-size: 10px;
          color: var(--muted);
        }

        .kyc-mockup h3 {
          font-size: 28px;
          line-height: 1;
          margin: 0 0 10px;
          letter-spacing: -0.04em;
        }

        .kyc-mockup p {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .kyc-question {
          padding: 14px 0;
          border-top: 1px solid var(--line);
        }

        .kyc-question-number {
          font-size: 9px;
          font-weight: 900;
          color: var(--yellow-dark);
          margin-bottom: 5px;
        }

        .kyc-question-text {
          font-size: 12px;
          font-weight: 800;
        }

        .kyc-writing-lines {
          margin-top: 8px;
          display: grid;
          gap: 7px;
        }

        .kyc-writing-lines span {
          display: block;
          height: 1px;
          background: #d8d5cd;
        }

        .kyc-section {
          padding: 90px 0;
          border-top: 1px solid var(--line);
        }

        .kyc-section-soft {
          background: var(--soft);
        }

        .kyc-section-heading {
          max-width: 760px;
        }

        .kyc-section-heading h2 {
          margin: 0;
          font-size: clamp(38px, 5vw, 62px);
          line-height: 0.96;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .kyc-section-heading p {
          margin: 20px 0 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.6;
        }

        .kyc-question-grid {
          margin-top: 45px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--black);
          border-left: 1px solid var(--black);
        }

        .kyc-question-card {
          padding: 26px;
          border-right: 1px solid var(--black);
          border-bottom: 1px solid var(--black);
          background: white;
          min-height: 120px;
        }

        .kyc-question-card::before {
          content: "?";
          display: block;
          width: 27px;
          height: 27px;
          border: 2px solid var(--black);
          background: var(--yellow);
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          font-weight: 900;
          font-size: 13px;
          margin-bottom: 15px;
        }

        .kyc-question-card p {
          margin: 0;
          font-size: 16px;
          line-height: 1.4;
          font-weight: 800;
        }

        .kyc-highlight {
          margin-top: 30px;
          padding: 24px 28px;
          border-left: 6px solid var(--yellow-dark);
          background: white;
          font-size: 18px;
          line-height: 1.5;
          font-weight: 850;
        }

        .kyc-steps {
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .kyc-step {
          background: white;
          border: 1px solid var(--black);
          padding: 26px;
          display: grid;
          grid-template-columns: 54px 1fr;
          gap: 20px;
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
          letter-spacing: 0.01em;
        }

        .kyc-step p {
          margin: 9px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.5;
        }

        .kyc-before {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 70px;
          align-items: start;
        }

        .kyc-before-copy h2 {
          margin: 0;
          font-size: clamp(38px, 4.5vw, 58px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .kyc-before-content p {
          margin: 0 0 18px;
          color: #4d4a44;
          font-size: 17px;
          line-height: 1.65;
        }

        .kyc-before-content strong {
          color: var(--black);
        }

        .kyc-spend-box {
          margin-top: 25px;
          border: 2px solid var(--black);
          background: var(--yellow);
          padding: 26px;
        }

        .kyc-spend-box small {
          display: block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
          margin-bottom: 9px;
        }

        .kyc-spend-box strong {
          display: block;
          font-size: 25px;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }

        .kyc-preview-grid {
          margin-top: 45px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .kyc-preview-card {
          aspect-ratio: 0.78;
          background: white;
          border: 1px solid var(--black);
          padding: 17px;
          position: relative;
          overflow: hidden;
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
          font-size: 9px;
          font-weight: 900;
          color: var(--yellow-dark);
        }

        .kyc-preview-card h3 {
          margin: 30px 0 10px;
          font-size: 20px;
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .kyc-preview-lines {
          display: grid;
          gap: 8px;
          margin-top: 20px;
        }

        .kyc-preview-lines span {
          height: 1px;
          background: #d6d3ca;
        }

        .kyc-outcomes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: start;
        }

        .kyc-outcomes-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .kyc-outcomes-list li {
          border-top: 1px solid var(--line);
          padding: 17px 0;
          display: flex;
          gap: 13px;
          font-size: 15px;
          line-height: 1.4;
          font-weight: 700;
        }

        .kyc-outcomes-list li::before {
          content: "✓";
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          background: var(--yellow);
          border: 1px solid var(--black);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 950;
        }

        .kyc-audience {
          border: 1px solid var(--black);
          background: white;
          padding: 28px;
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
          line-height: 1.5;
          font-size: 14px;
        }

        .kyc-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .kyc-chip {
          border: 1px solid var(--black);
          padding: 8px 11px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .kyc-idea {
          max-width: 850px;
        }

        .kyc-idea h2 {
          margin: 0;
          font-size: clamp(38px, 5vw, 64px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 950;
        }

        .kyc-idea p {
          margin: 22px 0 0;
          color: #4e4b45;
          font-size: 18px;
          line-height: 1.65;
        }

        .kyc-quote {
          margin-top: 38px;
          padding: 28px;
          background: var(--yellow);
          border: 2px solid var(--black);
          font-size: clamp(22px, 3vw, 34px);
          line-height: 1.1;
          letter-spacing: -0.035em;
          font-weight: 900;
        }

        .kyc-final {
          background: var(--black);
          color: white;
          padding: 100px 0;
          text-align: center;
        }

        .kyc-final .kyc-eyebrow {
          color: var(--yellow);
        }

        .kyc-final .kyc-eyebrow::before {
          background: var(--yellow);
        }

        .kyc-final h2 {
          margin: 0 auto;
          max-width: 850px;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 950;
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

        .kyc-footer {
          background: var(--black);
          color: #99968e;
          border-top: 1px solid #353535;
          padding: 25px 24px;
          text-align: center;
          font-size: 10px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        @media (max-width: 850px) {
          .kyc-hero {
            grid-template-columns: 1fr;
            gap: 50px;
            padding: 55px 0 70px;
          }

          .kyc-hero h1 {
            font-size: clamp(48px, 13vw, 72px);
          }

          .kyc-before,
          .kyc-outcomes {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .kyc-steps {
            grid-template-columns: 1fr;
          }

          .kyc-preview-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .kyc-question-grid {
            grid-template-columns: 1fr;
          }
        }

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

          .kyc-pill {
            font-size: 8px;
            padding: 8px 10px;
          }

          .kyc-lead {
            font-size: 16px;
          }

          .kyc-price-row {
            align-items: stretch;
            flex-direction: column;
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

          .kyc-question-card,
          .kyc-step {
            padding: 21px;
          }

          .kyc-preview-grid {
            gap: 10px;
          }

          .kyc-preview-card {
            padding: 12px;
          }

          .kyc-preview-card h3 {
            font-size: 17px;
            margin-top: 20px;
          }

          .kyc-final {
            padding: 75px 0;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="kyc-header">
        <div className="kyc-header-inner">
          <div className="kyc-brand">
            Puneet Kaur Saluja
            <span>The World of Content</span>
          </div>

          <div className="kyc-pill">↓ INSTANT DIGITAL DOWNLOAD</div>
        </div>
      </header>

      {/* HERO */}
      <section className="kyc-container">
        <div className="kyc-hero">
          <div>
            <div className="kyc-eyebrow">CUSTOMERS • SALES • BUSINESS</div>

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
              This guided 15-minute tool helps you understand what your
              customers want, what they struggle with, what makes them
              hesitate and what can make your offer easier to say yes to.
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

          {/* WORKSHEET MOCKUP */}
          <div className="kyc-mockup-wrap">
            <div className="kyc-mockup">
              <div className="kyc-mockup-top">
                <div className="kyc-mockup-title">KNOW YOUR CUSTOMER</div>
                <div className="kyc-mockup-page">01 / 09</div>
              </div>

              <h3>WHY WOULD THEY BUY?</h3>

              <p>
                Stop guessing. Start understanding the person you're trying
                to sell to.
              </p>

              {questions.slice(0, 3).map((question, index) => (
                <div className="kyc-question" key={question}>
                  <div className="kyc-question-number">
                    QUESTION 0{index + 1}
                  </div>
                  <div className="kyc-question-text">{question}</div>

                  <div className="kyc-writing-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REAL PROBLEM */}
      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-section-heading">
            <div className="kyc-eyebrow">WHY PEOPLE AREN’T BUYING</div>

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
              <div className="kyc-question-card" key={question}>
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

      {/* PROCESS */}
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
              these eight parts for one product, service or offer.
            </p>
          </div>

          <div className="kyc-steps">
            {steps.map((step) => (
              <div className="kyc-step" key={step.number}>
                <div className="kyc-step-number">{step.number}</div>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE SPENDING MORE */}
      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-before">
            <div className="kyc-before-copy">
              <div className="kyc-eyebrow">BEFORE YOU SPEND MORE</div>

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

      {/* PEEK INSIDE */}
      <section className="kyc-section">
        <div className="kyc-container">
          <div className="kyc-section-heading">
            <div className="kyc-eyebrow">A PEEK INSIDE</div>

            <h2>See what you’ll actually work through.</h2>

            <p>
              9 pages of guided questions, prompts and action steps designed
              to help you think from your customer's side of the table.
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
                <span />
              </div>
            </div>

            <div className="kyc-preview-card">
              <div className="kyc-preview-number">04</div>
              <h3>PUT IT ALL TOGETHER.</h3>

              <div className="kyc-preview-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="kyc-section kyc-section-soft">
        <div className="kyc-container">
          <div className="kyc-outcomes">
            <div>
              <div className="kyc-eyebrow">WHAT YOU GET</div>

              <div className="kyc-section-heading">
                <h2>What you'll walk away with.</h2>

                <p>
                  Not another theory. A clearer understanding of the person
                  you're trying to sell to.
                </p>
              </div>
            </div>

            <ul className="kyc-outcomes-list">
              {outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
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
              <div className="kyc-eyebrow">WHO IS THIS FOR?</div>

              <h2>Anyone who sells something.</h2>

              <p>
                You don't need to be a marketer. You don't need a marketing
                degree. If you have a product, service, offer or business,
                understanding your customer can help you make better decisions
                about how you sell it.
              </p>
            </div>

            <div className="kyc-audience">
              <h3>Built for business owners.</h3>

              <p>
                Whether you're selling online, offline, one-to-one or at
                scale, the questions are the same: Who am I selling to? What
                do they want? And why would they choose me?
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
        <div className="kyc-container">
          <div className="kyc-idea">
            <div className="kyc-eyebrow">THE IDEA BEHIND IT</div>

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

      {/* FINAL CTA */}
      <section className="kyc-final">
        <div className="kyc-container">
          <div className="kyc-eyebrow">START WITH THE CUSTOMER</div>

          <h2>
            Why aren’t people
            <br />
            <span>buying from me?</span>
          </h2>

          <p>
            Find out what your customers want, what is stopping them and what
            you can do differently — starting with just 15 minutes.
          </p>

          <div className="kyc-final-price">₹19</div>

          <div className="kyc-final-badge">INSTANT ACCESS</div>

          <br />

          <Link href={CHECKOUT_URL} className="kyc-cta">
            YES, I WANT TO UNDERSTAND MY CUSTOMER →
          </Link>

          <div className="kyc-micro">
            <span>⚡ Instant digital download</span>
            <span>•</span>
            <span>One product. One customer. 15 minutes.</span>
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
