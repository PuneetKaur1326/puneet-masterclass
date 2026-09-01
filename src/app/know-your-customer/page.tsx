"use client";

import Link from "next/link";

const CHECKOUT_URL = "#checkout";

const steps = [
  {
    number: "01",
    title: "WHO IS YOUR CUSTOMER?",
    description:
      "Create a useful picture of the person you're actually serving.",
  },
  {
    number: "02",
    title: "PROBLEM + DESIRE",
    description:
      "Understand what's happening in their world right now.",
  },
  {
    number: "03",
    title: "GO ONE LEVEL DEEPER",
    description:
      "Discover the real reason behind what they say they want.",
  },
  {
    number: "04",
    title: "WHAT HAVE THEY TRIED?",
    description:
      "Understand previous attempts and frustrations.",
  },
  {
    number: "05",
    title: "WHAT STOPS THEM FROM BUYING?",
    description:
      "Identify objections, doubts and buying barriers.",
  },
  {
    number: "06",
    title: "LISTEN TO THEIR LANGUAGE",
    description:
      "Capture the exact words your customers use.",
  },
  {
    number: "07",
    title: "YOUR CUSTOMER SNAPSHOT",
    description:
      "Put all the insights together clearly.",
  },
  {
    number: "08",
    title: "TURN INSIGHT INTO ACTION",
    description:
      "Turn what you learn into content and marketing.",
  },
];

const questions = [
  "What are they struggling with right now?",
  "What have they already tried?",
  "What do they actually want?",
  "What's stopping them from buying?",
  "Why does that matter to them?",
  "What words do they actually use?",
];

const audience = [
  "Founder",
  "Content Creator",
  "Marketer",
  "Freelancer / Agency",
  "Coach / Consultant",
  "Business Owner",
];

export default function KnowYourCustomerPage() {
  return (
    <main className="kyc-page">
      {/* NAVIGATION */}
      <header className="kyc-nav">
        <div className="kyc-container kyc-nav-inner">
          <Link href="#" className="kyc-logo">
            <span className="kyc-logo-star">✦</span>

            <span>
              <strong>Contentatia</strong>
              <small>The World of Content</small>
            </span>
          </Link>

          <div className="kyc-download-pill">
            <span>↓</span>
            INSTANT DIGITAL DOWNLOAD
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="kyc-hero">
        <div className="kyc-container kyc-hero-grid">
          <div className="kyc-hero-copy">
            <p className="kyc-eyebrow">
              CONTENT • CUSTOMER • COMMUNICATION
            </p>

            <h1>
              STOP GUESSING
              <br />
              <span>WHAT YOUR CUSTOMER</span>
              <br />
              WANTS.
            </h1>

            <h2>
              Understand them. <span className="kyc-highlight">Speak to them.</span>{" "}
              Serve them better.
            </h2>

            <p className="kyc-lead">
              A simple,{" "}
              <span className="kyc-highlight">
                guided 15-minute worksheet
              </span>{" "}
              to uncover your customer&apos;s problems, desires, frustrations,
              objections and actual language — so you can create communication
              that truly connects.
            </p>

            <div className="kyc-buy-row">
              <div className="kyc-price">
                <small>ONLY</small>
                <strong>₹20</strong>
              </div>

              <a href={CHECKOUT_URL} className="kyc-button">
                GET THE WORKSHEET FOR ₹20
                <span>→</span>
              </a>
            </div>

            <div className="kyc-micro">
              <span>⚡ Instant digital download</span>
              <span>•</span>
              <span>Use for any product, service or offer</span>
            </div>
          </div>

          {/* WORKSHEET VISUAL */}
          <div className="kyc-book-scene">
            <div className="kyc-blob" />
            <div className="kyc-dots" />

            <div className="kyc-book">
              <div className="kyc-book-band" />

              <div className="kyc-rings">
                <span>●</span>
                <span>●</span>
                <span>●</span>
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>

              <div className="kyc-book-content">
                <div className="kyc-book-brand">
                  Contentatia
                </div>

                <h3>
                  KNOW
                  <br />
                  YOUR
                  <br />
                  <em>CUSTOMER</em>
                </h3>

                <p>
                  The 15-Minute Customer
                  <br />
                  Understanding Worksheet
                </p>

                <div className="kyc-magnify">⌕</div>
              </div>
            </div>

            <div className="kyc-pen" />

            <span className="kyc-spark kyc-spark-a">✦</span>
            <span className="kyc-spark kyc-spark-b">✧</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="kyc-cream">
        <div className="kyc-container kyc-insight">
          <div className="kyc-target">◎</div>

          <div>
            <p className="kyc-eyebrow">THE REAL PROBLEM</p>

            <h2>
              Knowing your audience on the surface{" "}
              <span className="kyc-highlight">isn&apos;t enough.</span>
            </h2>

            <p className="kyc-section-copy">
              You might know their age, location, industry or profession.
              But that doesn&apos;t tell you what makes them think, feel,
              hesitate or buy.
            </p>

            <div className="kyc-questions">
              {questions.map((question) => (
                <div key={question}>
                  <b>⊗</b>
                  <span>{question}</span>
                </div>
              ))}
            </div>

            <p className="kyc-boldline">
              The answers to these questions can change the way you
              communicate.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="kyc-process">
        <div className="kyc-container">
          <div className="kyc-section-head">
            <p className="kyc-eyebrow">THE 15-MINUTE PROCESS</p>

            <h2>
              Work through{" "}
              <span className="kyc-highlight">8 powerful parts.</span>
            </h2>

            <p>One offer. One customer. Better questions.</p>
          </div>

          <div className="kyc-steps">
            {steps.map((step) => (
              <article key={step.number}>
                <div className="kyc-step-icon">
                  {step.number}
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE THE WORKSHEET */}
      <section className="kyc-cream kyc-previews">
        <div className="kyc-container">
          <div className="kyc-section-head">
            <p className="kyc-eyebrow">A PEEK INSIDE</p>

            <h2>
              See what you&apos;ll{" "}
              <span className="kyc-highlight">actually work through.</span>
            </h2>

            <p>
              9 pages of guided questions, prompts and action steps.
            </p>
          </div>

          <div className="kyc-preview-grid">
            <div className="kyc-preview-card">
              <div className="kyc-fake-page">
                <div className="fake-brand">CONTENTATIA</div>
                <div className="fake-title">
                  PROBLEM
                  <br />
                  + DESIRE
                </div>

                <div className="fake-line long" />
                <div className="fake-line" />
                <div className="fake-line medium" />

                <div className="fake-box" />

                <div className="fake-question">
                  What does your customer want?
                </div>
              </div>

              <p>
                Understand their current situation and desired outcome.
              </p>
            </div>

            <div className="kyc-preview-card">
              <div className="kyc-fake-page">
                <div className="fake-brand">CONTENTATIA</div>
                <div className="fake-title">
                  GO ONE
                  <br />
                  LEVEL DEEPER
                </div>

                <div className="fake-question">
                  Why do they want that?
                </div>

                <div className="fake-arrow">↓</div>

                <div className="fake-box yellow-box" />

                <div className="fake-question">
                  Why does that matter?
                </div>
              </div>

              <p>
                Go beyond the surface and find the deeper reason.
              </p>
            </div>

            <div className="kyc-preview-card">
              <div className="kyc-fake-page">
                <div className="fake-brand">CONTENTATIA</div>
                <div className="fake-title">
                  BUYING
                  <br />
                  BARRIERS
                </div>

                <div className="fake-line long" />
                <div className="fake-line" />

                <div className="fake-box" />

                <div className="fake-question">
                  What could stop them from buying?
                </div>
              </div>

              <p>
                Identify doubts, objections and barriers.
              </p>
            </div>

            <div className="kyc-preview-card">
              <div className="kyc-fake-page">
                <div className="fake-brand">CONTENTATIA</div>
                <div className="fake-title">
                  THEIR
                  <br />
                  LANGUAGE
                </div>

                <div className="speech">“I wish I could...”</div>
                <div className="speech">“I&apos;ve already tried...”</div>

                <div className="fake-box yellow-box" />
              </div>

              <p>
                Capture the exact words your customers use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET + WHO IT IS FOR */}
      <section className="kyc-container kyc-two-col">
        <div className="kyc-card">
          <p className="kyc-eyebrow">WHAT YOU GET</p>

          <h2>What you&apos;ll walk away with.</h2>

          <ul className="kyc-check-list">
            <li>Clear understanding of who your customer is</li>
            <li>Deeper insight into their problems and desires</li>
            <li>Awareness of objections and hesitations</li>
            <li>Real customer language you can use</li>
            <li>Content ideas, angles and messaging cues</li>
            <li>Better clarity for your offers and communication</li>
          </ul>
        </div>

        <div className="kyc-card">
          <p className="kyc-eyebrow">WHO IT&apos;S FOR</p>

          <h2>
            Anyone who wants to{" "}
            <span className="kyc-highlight">understand their customer better.</span>
          </h2>

          <div className="kyc-audience">
            {audience.map((person) => (
              <div key={person}>
                <span>◇</span>
                <b>{person}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="kyc-container kyc-philosophy">
        <div>
          <p className="kyc-eyebrow">THE IDEA BEHIND IT</p>

          <h2>
            This isn&apos;t about creating a fictional{" "}
            <span className="kyc-highlight">“perfect customer.”</span>
          </h2>

          <p>
            You don&apos;t need to invent a fictional person and fill in
            random demographic details. You need to understand the real
            person behind the purchase.
          </p>

          <p>
            And sometimes, the most useful answer is simply:
            <br />
            <strong>“NEED TO FIND OUT.”</strong>
          </p>

          <p>
            An honest gap in your knowledge is better than a confident
            assumption.
          </p>
        </div>

        <aside className="kyc-quote">
          <small>ONE FINAL QUESTION</small>

          <blockquote>
            “Would my customer feel like I&apos;m talking{" "}
            <b>TO</b> them — or <b>ABOUT</b> my product?”
          </blockquote>

          <span>— Know Your Customer Worksheet</span>
        </aside>
      </section>

      {/* FINAL CTA */}
      <section className="kyc-final" id="checkout">
        <div className="kyc-container kyc-final-inner">
          <div>
            <p className="kyc-eyebrow">START SMALL. THINK BETTER.</p>

            <h2>
              One customer.
              <br />
              One offer.
              <br />
              <span>15 minutes.</span>
            </h2>

            <p>
              If it helps you understand your customer even a little better,
              it&apos;s ₹20 well spent.
            </p>
          </div>

          <div className="kyc-final-buy">
            <div className="kyc-price-badge">
              <small>ONLY</small>
              <strong>₹20</strong>
              <span>INSTANT ACCESS</span>
            </div>

            <a href={CHECKOUT_URL} className="kyc-button kyc-button-final">
              YES, I WANT THE WORKSHEET FOR ₹20
              <span>→</span>
            </a>

            <small>⚡ Instant digital download</small>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="kyc-footer">
        <div className="kyc-container kyc-footer-inner">
          <div className="kyc-logo">
            <span className="kyc-logo-star">✦</span>

            <span>
              <strong>Contentatia</strong>
              <small>The World of Content</small>
            </span>
          </div>

          <p>© {new Date().getFullYear()} Contentatia. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
