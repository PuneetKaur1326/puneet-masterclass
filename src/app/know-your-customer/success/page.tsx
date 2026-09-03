export default function KycSuccessPage() {
  return (
    <main className="kyc-success-page">
      <div className="kyc-success-card">

        <div className="kyc-success-icon">
          ✓
        </div>

        <div className="kyc-success-eyebrow">
          PAYMENT SUCCESSFUL
        </div>

        <h1>
          You’re in.
        </h1>

        <p className="kyc-success-main">
          Your <strong>Know Your Customer</strong>{" "}
          worksheet is ready.
        </p>

        <p className="kyc-success-text">
          Thank you for your purchase. We’ll send
          the worksheet to your WhatsApp number
          shortly.
        </p>

        <div className="kyc-success-note">
          <span>⚡</span>
          <div>
            <strong>What happens next?</strong>
            <p>
              Check your WhatsApp for the worksheet
              and start working through it right away.
            </p>
          </div>
        </div>

        <a
          href="/know-your-customer"
          className="kyc-success-button"
        >
          BACK TO THE WORKSHEET
          <span>→</span>
        </a>

        <p className="kyc-success-footer">
          Thank you for choosing to understand your
          customer better.
        </p>

      </div>
    </main>
  );
}
