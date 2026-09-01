import "./styles.css";

const CHECKOUT_URL = "https://puneetkaursaluja.com/checkout"; // Replace with your real payment link.

const steps = [
  ["01", "WHO IS YOUR CUSTOMER?", "Create a useful picture of the person you're actually serving."],
  ["02", "PROBLEM + DESIRE", "Understand what's happening in their world right now."],
  ["03", "GO ONE LEVEL DEEPER", "Discover the real reason behind what they say they want."],
  ["04", "WHAT HAVE THEY TRIED?", "Understand previous attempts and frustrations."],
  ["05", "WHAT STOPS THEM FROM BUYING?", "Identify objections, doubts and buying barriers."],
  ["06", "LISTEN TO THEIR LANGUAGE", "Capture the exact words your customers use."],
  ["07", "YOUR CUSTOMER SNAPSHOT", "Put all the insights together clearly."],
  ["08", "TURN INSIGHT INTO ACTION", "Turn what you learn into content and marketing."],
];

const previews = [
  ["02", "Understand their current situation and desired outcome."],
  ["04", "Go beyond the surface and find the deeper reason."],
  ["06", "Identify what's holding them back from taking action."],
  ["07", "Collect their exact words for stronger messaging."],
];

export default function KnowYourCustomer() {
  return (
    <main className="kyc">
      <header className="nav wrap">
        <a className="logo" href="#">
          <span className="logo-mark">✦</span>
          <span><b>Contentatia</b><small>The World of Content</small></span>
        </a>
        <div className="download-pill">✦ &nbsp; INSTANT DIGITAL DOWNLOAD</div>
      </header>

      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">CONTENT • CUSTOMER • COMMUNICATION</p>
          <h1>STOP GUESSING<br /><span>WHAT YOUR CUSTOMER</span><br />WANTS.</h1>
          <h2>Understand them. Speak to them. Serve them better.</h2>
          <p className="lead">
            A simple, guided 15-minute worksheet to uncover your customer&apos;s
            problems, desires, frustrations, objections and actual language —
            so you can create communication that truly connects.
          </p>

          <div className="buy-row">
            <div className="price"><small>ONLY</small><strong>₹20</strong></div>
            <a href={CHECKOUT_URL} className="btn">GET THE WORKSHEET FOR ₹20 <span>→</span></a>
          </div>
          <div className="tiny">⚡ Instant digital download &nbsp; • &nbsp; Use for any product, service or offer</div>
        </div>

        <div className="book-scene" aria-label="Know Your Customer worksheet preview">
          <div className="blob" />
          <div className="dots" />
          <div className="book">
            <div className="book-band" />
            <div className="rings">●<br />●<br />●<br />●<br />●<br />●</div>
            <div className="book-content">
              <b className="book-brand">Contentatia</b>
              <h3>KNOW<br />YOUR<br /><em>CUSTOMER</em></h3>
              <p>The 15-Minute Customer<br />Understanding Worksheet</p>
              <div className="magnify">⌕</div>
            </div>
          </div>
          <div className="pen" />
          <span className="spark a">✦</span><span className="spark b">✧</span>
        </div>
      </section>

      <section className="cream">
        <div className="wrap insight">
          <div className="target">◎</div>
          <div>
            <h2>Knowing your audience on the surface isn&apos;t enough.</h2>
            <p>You might know their age, location, industry or profession.</p>
            <div className="questions">
              {[
                "What are they struggling with right now?",
                "What have they already tried?",
                "What do they actually want?",
                "What's stopping them from buying?",
                "Why does that matter to them?",
                "What words do they actually use?",
              ].map(q => <div key={q}><b>⊗</b>{q}</div>)}
            </div>
            <p className="boldline">The answers to these questions change the way you communicate.</p>
          </div>
        </div>
      </section>

      <section className="wrap process">
        <div className="section-head">
          <p className="eyebrow">THE 15-MINUTE PROCESS</p>
          <h2>Work through <span>8 powerful parts.</span></h2>
          <p>One offer. One customer. Better questions.</p>
        </div>
        <div className="steps">
          {steps.map(([n,t,d]) => (
            <article key={n}>
              <div className="step-icon"><span>{n}</span></div>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cream previews">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">A PEEK INSIDE</p>
            <h2>A <span>peek</span> inside the worksheet.</h2>
            <p>9 pages of guided questions, prompts and action steps.</p>
          </div>
          <div className="preview-grid">
            {previews.map(([n, caption]) => (
              <figure key={n}>
                <div className="page-mock">
                  <div className="mock-top">0{n} • {n === "02" ? "PROBLEM + DESIRE" : n === "04" ? "GO ONE LEVEL DEEPER" : n === "06" ? "WHAT STOPS THEM FROM BUYING?" : "LISTEN TO THEIR LANGUAGE"}</div>
                  <div className="mock-title" />
                  <div className="mock-lines"><i/><i/><i/><i/><i/><i/></div>
                  <div className="mock-box" />
                  <div className="mock-box short" />
                </div>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap two-col">
        <div className="card">
          <p className="eyebrow">WHAT YOU GET</p>
          <h2>What you&apos;ll walk away with</h2>
          <ul>
            <li>Clear understanding of who your customer is</li>
            <li>Deeper insight into their problems and desires</li>
            <li>Awareness of objections and hesitations</li>
            <li>Real customer language you can use</li>
            <li>Content ideas, angles and messaging cues</li>
            <li>Better clarity for your offers and communication</li>
          </ul>
        </div>

        <div className="card">
          <p className="eyebrow">WHO IT&apos;S FOR</p>
          <h2>Anyone who wants to understand their customer better.</h2>
          <div className="audience">
            {["Founder", "Content Creator", "Marketer", "Freelancer / Agency", "Coach / Consultant", "Business Owner"].map(x =>
              <div key={x}><span>◇</span><b>{x}</b></div>
            )}
          </div>
        </div>
      </section>

      <section className="wrap philosophy">
        <div>
          <p className="eyebrow">THE IDEA BEHIND IT</p>
          <h2>This isn&apos;t about creating a fictional “perfect customer.”</h2>
          <p>You don&apos;t need to invent a fictional person and fill in random demographic details. You need to understand the real person behind the purchase.</p>
          <p>And sometimes, the most useful answer is simply: <b>“NEED TO FIND OUT.”</b></p>
          <p>An honest gap in your knowledge is better than a confident assumption.</p>
        </div>
        <aside>
          <small>ONE FINAL QUESTION</small>
          <blockquote>“Would my customer feel like I&apos;m talking <b>TO</b> them — or <b>ABOUT</b> my product?”</blockquote>
          <span>— Know Your Customer Worksheet</span>
        </aside>
      </section>

      <section className="final">
        <div className="wrap final-inner">
          <div>
            <p className="eyebrow">START SMALL. THINK BETTER.</p>
            <h2>One customer.<br />One offer.<br /><span>15 minutes.</span></h2>
            <p>If it helps you understand your customer even a little better, it&apos;s ₹20 well spent.</p>
          </div>
          <div className="final-buy">
            <div className="badge"><small>ONLY</small><b>₹20</b><span>INSTANT ACCESS</span></div>
            <a href={CHECKOUT_URL} className="btn">YES, I WANT THE WORKSHEET FOR ₹20 <span>→</span></a>
            <small>⚡ Instant digital download</small>
          </div>
        </div>
      </section>

      <footer className="wrap footer">
        <a className="logo" href="#"><span className="logo-mark">✦</span><span><b>Contentatia</b><small>The World of Content</small></span></a>
        <span>© {new Date().getFullYear()} Contentatia</span>
      </footer>
    </main>
  );
}
