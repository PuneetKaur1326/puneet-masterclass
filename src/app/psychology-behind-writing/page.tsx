import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const learningPoints = [
  {
    number: "01",
    title: "CONTENT vs COMMUNICATION",
    description:
      "Why simply creating more content may not be solving your real problem.",
  },
  {
    number: "02",
    title: "THE PSYCHOLOGY OF ATTENTION",
    description:
      "What makes people stop instead of scroll.",
  },
  {
    number: "03",
    title: "EMOTIONAL POSITIONING",
    description:
      "How brands become relevant by reflecting what their audience actually feels.",
  },
  {
    number: "04",
    title: "BUILDING BRAND MEMORY",
    description:
      "How consistent communication can make your brand more familiar — and more trusted.",
  },
];

const audience = [
  {
    title: "Coaches",
    description: "Create content that communicates and sells your expertise.",
  },
  {
    title: "Creators & Influencers",
    description: "Build a personal brand people actually remember.",
  },
  {
    title: "Tarot Readers & Consultants",
    description: "Create stronger emotional connections with your audience.",
  },
  {
    title: "SMEs & Business Owners",
    description: "Make social media communication contribute to your business.",
  },
];

export default function PsychologyBehindWritingPage() {
  return (
    <>
      <Header />

      <main className="psychology-page">
        {/* HERO */}
        <section className="hero">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="container hero-container">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              2-HOUR LIVE WEBINAR
            </div>

            <h1>
              THE PSYCHOLOGY
              <br />
              <span>BEHIND WRITING</span>
            </h1>

            <p className="hero-subtitle">
              Stop creating content people scroll past.
              <br />
              Learn how to make your audience{" "}
              <strong>stop, feel, remember & trust</strong> your brand.
            </p>

            <p className="hero-description">
              A 2-hour live webinar by <strong>Puneet Kaur Saluja</strong> for
              coaches, creators, influencers, tarot readers and business
              owners who want their social media communication to actually
              contribute to their brand and business.
            </p>

            <div className="hero-cta">
              <Link href="/register" className="primary-button">
                RESERVE MY SEAT FOR ₹99
                <span>→</span>
              </Link>
            </div>

            <div className="event-meta">
              <div>
                <span>DATE</span>
                <strong>________________</strong>
              </div>

              <div>
                <span>TIME</span>
                <strong>________________</strong>
              </div>

              <div>
                <span>DURATION</span>
                <strong>2 HOURS</strong>
              </div>
            </div>
          </div>
        </section>

        {/* THE REAL PROBLEM */}
        <section className="problem-section">
          <div className="container narrow">
            <div className="section-label">THE REAL PROBLEM</div>

            <h2>
              You're not struggling because you need
              <br />
              <span>more content ideas.</span>
            </h2>

            <p className="lead">
              You may be struggling because your content isn't communicating
              the right thing to the right person.
            </p>

            <div className="problem-card">
              <div className="problem-card-number">01</div>

              <div>
                <h3>Posting consistently isn't the same as building a memorable brand.</h3>

                <p>
                  Your audience is already surrounded by content. More posts,
                  more reels and more captions don't automatically create more
                  attention.
                </p>
              </div>
            </div>

            <div className="video-card">
              <div className="video-icon">▶</div>

              <div>
                <span>WATCH THIS BEFORE YOU REGISTER</span>
                <p>
                  Because posting consistently isn't the same as building a
                  memorable brand.
                </p>
              </div>
            </div>

            <Link href="/register" className="secondary-button">
              JOIN THE WEBINAR FOR ₹99 →
            </Link>
          </div>
        </section>

        {/* WHY CONTENT GETS FORGOTTEN */}
        <section className="attention-section">
          <div className="container">
            <div className="section-label">THE QUESTION</div>

            <h2>
              Why does some content get remembered...
              <br />
              <span>while the rest disappears after one scroll?</span>
            </h2>

            <div className="question-grid">
              <div className="question-item">
                <span>01</span>
                <strong>Better design?</strong>
              </div>

              <div className="question-item">
                <span>02</span>
                <strong>More followers?</strong>
              </div>

              <div className="question-item">
                <span>03</span>
                <strong>More content?</strong>
              </div>

              <div className="question-item">
                <span>04</span>
                <strong>Better algorithms?</strong>
              </div>
            </div>

            <div className="deeper-answer">
              <p>Or something deeper?</p>

              <h3>
                THE PSYCHOLOGY
                <br />
                BEHIND COMMUNICATION.
              </h3>

              <p className="deeper-copy">
                Your audience today is <strong>overstimulated, distracted</strong>{" "}
                and highly aware that they're being marketed to.
              </p>

              <p className="deeper-copy">
                So simply "posting consistently" isn't enough anymore.
              </p>
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="positioning-section">
          <div className="container narrow">
            <div className="section-label">THIS IS NOT ANOTHER WEBINAR</div>

            <h2>
              This is not another
              <br />
              <span>"Grow Your Instagram" webinar.</span>
            </h2>

            <div className="not-list">
              <div>
                <span>×</span>
                <p>No viral hacks.</p>
              </div>

              <div>
                <span>×</span>
                <p>No random growth tricks.</p>
              </div>

              <div>
                <span>×</span>
                <p>No endless list of tools.</p>
              </div>
            </div>

            <div className="communication-box">
              <span>THIS WEBINAR IS ABOUT ONE THING:</span>

              <h3>THE PSYCHOLOGY BEHIND COMMUNICATION.</h3>

              <div className="communication-points">
                <div>
                  <strong>Clear</strong>
                  <span>enough to understand.</span>
                </div>

                <div>
                  <strong>Human</strong>
                  <span>enough to connect.</span>
                </div>

                <div>
                  <strong>Strong</strong>
                  <span>enough to convince.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU WILL LEARN */}
        <section className="learn-section">
          <div className="container">
            <div className="section-label">INSIDE THE WEBINAR</div>

            <h2>
              What you'll
              <br />
              <span>learn</span>
            </h2>

            <div className="learning-grid">
              {learningPoints.map((item) => (
                <div className="learning-card" key={item.number}>
                  <span className="card-number">{item.number}</span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENTOR */}
        <section className="mentor-section">
          <div className="container mentor-grid">
            <div className="mentor-image">
              <div className="mentor-image-placeholder">
                <span>YOUR PHOTO</span>
              </div>
            </div>

            <div className="mentor-content">
              <div className="section-label">WHY LEARN FROM PUNEET?</div>

              <h2>
                9 YEARS OF
                <br />
                <span>WRITING. STRATEGY.</span>
                <br />
                ADVERTISING.
              </h2>

              <p>
                Puneet started writing before AI became part of everyday
                content creation.
              </p>

              <p>
                From her first paid writing project of <strong>₹500</strong> to
                working across writing, freelancing, advertising, strategy and
                brand communication, her journey has been built around
                understanding one thing:
              </p>

              <div className="mentor-question">
                WHAT MAKES PEOPLE
                <br />
                <strong>PAY ATTENTION?</strong>
              </div>

              <div className="mentor-question second">
                And more importantly:
                <br />
                <strong>WHAT MAKES THEM CARE?</strong>
              </div>

              <p>
                The webinar is based on that experience — not just
                content-production tricks.
              </p>
            </div>
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section className="audience-section">
          <div className="container">
            <div className="section-label">IS THIS FOR YOU?</div>

            <h2>
              Who is this
              <br />
              <span>for?</span>
            </h2>

            <div className="audience-grid">
              {audience.map((item, index) => (
                <div className="audience-card" key={item.title}>
                  <span>0{index + 1}</span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              ))}
            </div>

            <div className="better-question">
              <p>If you're tired of asking:</p>

              <h3>"What should I post today?"</h3>

              <div className="arrow">↓</div>

              <p>It's time to ask a much better question:</p>

              <h2>
                "What should my audience
                <br />
                <span>think, feel and remember?</span>"
              </h2>
            </div>
          </div>
        </section>

        {/* OFFER */}
        <section className="offer-section">
          <div className="container">
            <div className="offer-card">
              <div className="offer-top">
                <div>
                  <div className="section-label">THE OFFER</div>

                  <h2>
                    ₹99 TO CHANGE
                    <br />
                    THE WAY YOU
                    <br />
                    <span>LOOK AT CONTENT.</span>
                  </h2>
                </div>

                <div className="price">
                  <span>2-HOUR LIVE WEBINAR</span>
                  <div className="old-price">₹999</div>
                  <strong>₹99</strong>
                </div>
              </div>

              <div className="offer-divider" />

              <div className="offer-bottom">
                <div>
                  <span>THE PSYCHOLOGY BEHIND WRITING</span>
                  <p>
                    Learn why some communication makes people stop, connect
                    and remember.
                  </p>
                </div>

                <Link href="/register" className="primary-button">
                  YES, I WANT TO LEARN
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-section">
          <div className="container narrow">
            <div className="section-label">ONE LAST QUESTION...</div>

            <h2>
              You can keep creating
              <br />
              <span>more content.</span>
            </h2>

            <p>
              Or you can learn <strong>why some communication</strong> makes
              people stop, connect and remember.
            </p>

            <div className="final-statement">
              <p>Your content doesn't need to be louder.</p>

              <h3>
                It needs to mean something
                <br />
                to the person reading it.
              </h3>
            </div>

            <Link href="/register" className="primary-button large">
              RESERVE MY SEAT FOR ₹99
              <span>→</span>
            </Link>

            <div className="final-meta">
              <span>Date: __________________</span>
              <span>Time: __________________</span>
              <span>2 Hours</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .psychology-page {
          --ink: #171717;
          --muted: #666;
          --cream: #f7f4ed;
          --paper: #fffdf8;
          --accent: #f3c400;
          --line: rgba(23, 23, 23, 0.12);
          color: var(--ink);
          background: var(--paper);
          overflow: hidden;
        }

        .psychology-page * {
          box-sizing: border-box;
        }

        .psychology-page .container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .psychology-page .narrow {
          width: min(900px, calc(100% - 40px));
        }

        .psychology-page h1,
        .psychology-page h2,
        .psychology-page h3,
        .psychology-page p {
          margin-top: 0;
        }

        .psychology-page h1,
        .psychology-page h2,
        .psychology-page h3 {
          letter-spacing: -0.045em;
        }

        .psychology-page a {
          text-decoration: none;
        }

        .eyebrow,
        .section-label {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 26px;
          padding: 9px 13px;
          border: 1px solid rgba(23, 23, 23, 0.18);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.55);
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
        }

        .section-label {
          color: #777;
          margin-bottom: 20px;
        }

        .primary-button,
        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          min-height: 58px;
          padding: 0 27px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.04em;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .primary-button {
          color: #111;
          background: var(--accent);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .primary-button:hover,
        .secondary-button:hover {
          transform: translateY(-2px);
        }

        .primary-button span {
          font-size: 20px;
          line-height: 1;
        }

        .secondary-button {
          color: var(--ink);
          border: 1px solid var(--ink);
          background: transparent;
          margin-top: 28px;
        }

        /* HERO */

        .hero {
          position: relative;
          min-height: 780px;
          display: flex;
          align-items: center;
          padding: 110px 0 90px;
          background:
            radial-gradient(circle at 80% 25%, rgba(243, 196, 0, 0.16), transparent 28%),
            linear-gradient(135deg, #f8f5ed 0%, #fffdf8 65%, #f2efe6 100%);
        }

        .hero-container {
          text-align: center;
        }

        .hero h1 {
          margin-bottom: 26px;
          font-size: clamp(54px, 8vw, 105px);
          line-height: 0.88;
          font-weight: 950;
        }

        .hero h1 span {
          color: transparent;
          -webkit-text-stroke: 1.5px var(--ink);
        }

        .hero-subtitle {
          max-width: 800px;
          margin: 0 auto 24px;
          font-size: clamp(20px, 2.4vw, 30px);
          line-height: 1.35;
          font-weight: 500;
        }

        .hero-subtitle strong {
          font-weight: 900;
        }

        .hero-description {
          max-width: 720px;
          margin: 0 auto;
          color: #666;
          font-size: 16px;
          line-height: 1.7;
        }

        .hero-cta {
          margin-top: 34px;
        }

        .event-meta {
          display: flex;
          justify-content: center;
          gap: 70px;
          margin-top: 55px;
        }

        .event-meta div {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .event-meta span {
          color: #777;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .event-meta strong {
          font-size: 13px;
          letter-spacing: 0.04em;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
        }

        .hero-glow-one {
          width: 230px;
          height: 230px;
          top: 100px;
          left: -110px;
          border: 1px solid rgba(23, 23, 23, 0.08);
        }

        .hero-glow-two {
          width: 160px;
          height: 160px;
          bottom: 80px;
          right: -70px;
          background: rgba(243, 196, 0, 0.12);
        }

        /* PROBLEM */

        .problem-section {
          padding: 130px 0;
          background: #171717;
          color: #fff;
        }

        .problem-section .section-label {
          color: #aaa;
        }

        .problem-section h2 {
          max-width: 850px;
          font-size: clamp(42px, 6vw, 76px);
          line-height: 0.98;
          margin-bottom: 30px;
        }

        .problem-section h2 span {
          color: var(--accent);
        }

        .lead {
          max-width: 650px;
          color: #bdbdbd;
          font-size: 20px;
          line-height: 1.6;
        }

        .problem-card {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 25px;
          margin-top: 65px;
          padding: 38px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.035);
        }

        .problem-card-number {
          color: var(--accent);
          font-size: 14px;
          font-weight: 900;
        }

        .problem-card h3 {
          max-width: 650px;
          margin-bottom: 16px;
          font-size: 27px;
          line-height: 1.15;
        }

        .problem-card p {
          max-width: 650px;
          margin-bottom: 0;
          color: #999;
          line-height: 1.7;
        }

        .video-card {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-top: 24px;
          padding: 25px 30px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: #222;
        }

        .video-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: #111;
          background: var(--accent);
          font-size: 13px;
        }

        .video-card span {
          color: var(--accent);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .video-card p {
          margin: 6px 0 0;
          color: #aaa;
          font-size: 14px;
        }

        .problem-section .secondary-button {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.45);
        }

        /* ATTENTION */

        .attention-section {
          padding: 140px 0;
          background: var(--cream);
          text-align: center;
        }

        .attention-section h2 {
          max-width: 1000px;
          margin: 0 auto;
          font-size: clamp(40px, 6vw, 72px);
          line-height: 0.98;
        }

        .attention-section h2 span {
          color: #888;
        }

        .question-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 70px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .question-item {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 32px 15px;
          border-right: 1px solid var(--line);
        }

        .question-item:last-child {
          border-right: 0;
        }

        .question-item span {
          color: #999;
          font-size: 11px;
          font-weight: 800;
        }

        .question-item strong {
          font-size: 17px;
        }

        .deeper-answer {
          max-width: 760px;
          margin: 100px auto 0;
        }

        .deeper-answer > p:first-child {
          margin-bottom: 16px;
          color: #777;
          font-size: 17px;
        }

        .deeper-answer h3 {
          margin-bottom: 35px;
          font-size: clamp(44px, 6vw, 76px);
          line-height: 0.95;
        }

        .deeper-copy {
          max-width: 650px;
          margin: 12px auto;
          color: #666;
          font-size: 18px;
          line-height: 1.6;
        }

        /* POSITIONING */

        .positioning-section {
          padding: 140px 0;
          background: #fffdf8;
        }

        .positioning-section h2 {
          font-size: clamp(42px, 6vw, 72px);
          line-height: 0.97;
          margin-bottom: 55px;
        }

        .positioning-section h2 span {
          color: #888;
        }

        .not-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .not-list div {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 24px 10px;
          border-right: 1px solid var(--line);
        }

        .not-list div:last-child {
          border-right: 0;
        }

        .not-list span {
          color: #999;
          font-size: 22px;
        }

        .not-list p {
          margin: 0;
          font-size: 14px;
        }

        .communication-box {
          margin-top: 70px;
          padding: 55px;
          background: #171717;
          color: #fff;
        }

        .communication-box > span {
          color: var(--accent);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .communication-box h3 {
          max-width: 750px;
          margin: 18px 0 50px;
          font-size: clamp(35px, 5vw, 60px);
          line-height: 0.98;
        }

        .communication-points {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .communication-points div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
        }

        .communication-points strong {
          color: var(--accent);
          font-size: 20px;
        }

        .communication-points span {
          color: #aaa;
          font-size: 14px;
        }

        /* LEARN */

        .learn-section {
          padding: 140px 0;
          background: #f1eee6;
        }

        .learn-section h2 {
          margin-bottom: 60px;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.88;
        }

        .learn-section h2 span {
          color: #888;
        }

        .learning-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: var(--ink);
          border: 2px solid var(--ink);
        }

        .learning-card {
          min-height: 300px;
          padding: 40px;
          background: #fffdf8;
        }

        .card-number {
          display: block;
          margin-bottom: 55px;
          color: #999;
          font-size: 11px;
          font-weight: 900;
        }

        .learning-card h3 {
          margin-bottom: 15px;
          font-size: 22px;
        }

        .learning-card p {
          max-width: 430px;
          margin: 0;
          color: #666;
          font-size: 15px;
          line-height: 1.7;
        }

        /* MENTOR */

        .mentor-section {
          padding: 140px 0;
          background: #171717;
          color: #fff;
        }

        .mentor-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 90px;
          align-items: center;
        }

        .mentor-image-placeholder {
          aspect-ratio: 4 / 5;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(145deg, #303030, #1c1c1c);
          color: #777;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .mentor-content .section-label {
          color: #aaa;
        }

        .mentor-content h2 {
          margin-bottom: 35px;
          font-size: clamp(40px, 5vw, 68px);
          line-height: 0.92;
        }

        .mentor-content h2 span {
          color: var(--accent);
        }

        .mentor-content > p {
          max-width: 600px;
          color: #aaa;
          font-size: 16px;
          line-height: 1.7;
        }

        .mentor-question {
          margin: 35px 0;
          padding-left: 25px;
          border-left: 3px solid var(--accent);
          color: #aaa;
          font-size: 15px;
          line-height: 1.5;
        }

        .mentor-question strong {
          color: #fff;
          font-size: 24px;
        }

        .mentor-question.second {
          margin-top: 25px;
        }

        /* AUDIENCE */

        .audience-section {
          padding: 140px 0;
          background: var(--cream);
        }

        .audience-section h2 {
          margin-bottom: 60px;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.88;
        }

        .audience-section h2 span {
          color: #888;
        }

        .audience-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .audience-card {
          min-height: 280px;
          padding: 28px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.42);
        }

        .audience-card > span {
          color: #999;
          font-size: 11px;
          font-weight: 900;
        }

        .audience-card h3 {
          margin: 65px 0 15px;
          font-size: 20px;
        }

        .audience-card p {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.65;
        }

        .better-question {
          margin-top: 120px;
          text-align: center;
        }

        .better-question p {
          color: #777;
          font-size: 17px;
        }

        .better-question h3 {
          margin: 20px 0;
          font-size: clamp(30px, 4vw, 48px);
        }

        .arrow {
          margin: 25px 0;
          color: #aaa;
          font-size: 28px;
        }

        .better-question h2 {
          margin: 20px 0 0;
          font-size: clamp(35px, 5vw, 60px);
          line-height: 1;
        }

        .better-question h2 span {
          color: #777;
        }

        /* OFFER */

        .offer-section {
          padding: 120px 0;
          background: #171717;
        }

        .offer-card {
          padding: 55px;
          background: var(--accent);
          color: #111;
        }

        .offer-top {
          display: flex;
          justify-content: space-between;
          gap: 50px;
        }

        .offer-top .section-label {
          color: rgba(17, 17, 17, 0.55);
        }

        .offer-card h2 {
          margin: 0;
          font-size: clamp(40px, 5.5vw, 70px);
          line-height: 0.92;
        }

        .offer-card h2 span {
          color: #fff;
        }

        .price {
          min-width: 220px;
          text-align: right;
        }

        .price > span {
          display: block;
          margin-bottom: 15px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.13em;
        }

        .old-price {
          color: rgba(17, 17, 17, 0.5);
          font-size: 24px;
          text-decoration: line-through;
        }

        .price strong {
          display: block;
          font-size: clamp(65px, 8vw, 110px);
          line-height: 0.9;
          letter-spacing: -0.07em;
        }

        .offer-divider {
          height: 1px;
          margin: 50px 0 35px;
          background: rgba(17, 17, 17, 0.2);
        }

        .offer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .offer-bottom > div > span {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .offer-bottom p {
          max-width: 520px;
          margin: 8px 0 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .offer-bottom .primary-button {
          background: #171717;
          color: #fff;
          white-space: nowrap;
        }

        /* FINAL */

        .final-section {
          padding: 150px 0;
          text-align: center;
          background: var(--paper);
        }

        .final-section h2 {
          margin-bottom: 30px;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.9;
        }

        .final-section h2 span {
          color: #888;
        }

        .final-section > .container > p {
          max-width: 680px;
          margin: 0 auto;
          color: #666;
          font-size: 20px;
          line-height: 1.6;
        }

        .final-statement {
          margin: 80px auto 50px;
          padding: 50px 20px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .final-statement p {
          margin-bottom: 15px;
          color: #777;
          font-size: 17px;
        }

        .final-statement h3 {
          margin: 0;
          font-size: clamp(34px, 5vw, 60px);
          line-height: 1;
        }

        .primary-button.large {
          min-height: 66px;
          padding: 0 35px;
        }

        .final-meta {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 25px;
          margin-top: 30px;
          color: #888;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .hero {
            min-height: auto;
            padding: 90px 0 75px;
          }

          .event-meta {
            gap: 30px;
          }

          .question-grid,
          .audience-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .question-item:nth-child(2) {
            border-right: 0;
          }

          .question-item:nth-child(-n + 2) {
            border-bottom: 1px solid var(--line);
          }

          .not-list {
            grid-template-columns: 1fr;
          }

          .not-list div {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .not-list div:last-child {
            border-bottom: 0;
          }

          .mentor-grid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .mentor-image {
            max-width: 430px;
          }

          .offer-top {
            flex-direction: column;
          }

          .price {
            text-align: left;
          }

          .offer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .psychology-page .container,
          .psychology-page .narrow {
            width: min(100% - 28px, 900px);
          }

          .hero h1 {
            font-size: 52px;
          }

          .hero-subtitle {
            font-size: 20px;
          }

          .hero-description {
            font-size: 14px;
          }

          .event-meta {
            display: grid;
            grid-template-columns: 1fr;
            gap: 18px;
            margin-top: 40px;
          }

          .problem-section,
          .attention-section,
          .positioning-section,
          .learn-section,
          .mentor-section,
          .audience-section,
          .final-section {
            padding: 90px 0;
          }

          .problem-card {
            grid-template-columns: 1fr;
            padding: 28px;
          }

          .video-card {
            align-items: flex-start;
            padding: 22px;
          }

          .question-grid,
          .audience-grid,
          .learning-grid,
          .communication-points {
            grid-template-columns: 1fr;
          }

          .question-item {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .question-item:last-child {
            border-bottom: 0;
          }

          .learning-card {
            min-height: 250px;
          }

          .communication-box {
            padding: 32px 25px;
          }

          .communication-points {
            gap: 25px;
          }

          .offer-section {
            padding: 70px 0;
          }

          .offer-card {
            padding: 32px 24px;
          }

          .offer-bottom .primary-button,
          .offer-bottom .primary-button,
          .hero .primary-button,
          .final-section .primary-button {
            width: 100%;
          }

          .final-meta {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}
