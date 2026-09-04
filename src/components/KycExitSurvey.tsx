"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyDtheMmy3cB9Pi_cdmnPMN_YbLdpgg7EgJYrB6Kcu5vki3CM5VYlOGWE_47aLNaNk/exec";

const REASONS = [
  "I'm not sure what I'll get",
  "I wanted to see more before buying",
  "I don't think I need it right now",
  "I'm not convinced it will help me",
  "I had another concern",
  "Other",
];

export default function KycExitSurvey() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [otherResponse, setOtherResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (pathname !== "/know-your-customer") return;

    const alreadyShown = sessionStorage.getItem(
      "kyc_exit_survey_shown"
    );

    if (alreadyShown) return;

    let triggered = false;
    let historyEntryAdded = false;

    /*
      ==================================================
      DESKTOP EXIT INTENT
      ==================================================

      Desktop visitors trigger the survey when they
      move their cursor toward the top of the browser
      after interacting with the page.
    */

    let detectionActive = false;
    let visitorInteracted = false;
    let previousMouseY = 0;

    const activationTimer = window.setTimeout(() => {
      detectionActive = true;
    }, 3000);

    const handleMouseMove = (event: MouseEvent) => {
      if (!detectionActive) return;

      visitorInteracted = true;
      previousMouseY = event.clientY;
    };

    const showSurvey = () => {
      if (triggered) return;

      triggered = true;

      sessionStorage.setItem(
        "kyc_exit_survey_shown",
        "1"
      );

      setOpen(true);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (window.innerWidth <= 768) return;
      if (!detectionActive) return;
      if (!visitorInteracted) return;
      if (triggered) return;

      const movingTowardTop =
        previousMouseY > 50 &&
        event.clientY <= 5;

      if (!movingTowardTop) return;

      showSurvey();
    };

    /*
      ==================================================
      MOBILE BACK BUTTON
      ==================================================

      We create one temporary browser-history entry.

      When the visitor presses the phone/browser
      Back button, the browser moves to that temporary
      entry instead of immediately leaving.

      We then show the survey.

      Once the survey is dismissed, the temporary
      history entry is removed so the NEXT Back action
      genuinely takes the visitor away.
    */

    const handlePopState = () => {
      if (window.innerWidth > 768) return;

      if (!triggered) {
        showSurvey();

        /*
          Put the temporary history entry back so
          the visitor remains on the landing page
          while the survey is visible.
        */
        window.history.pushState(
          { kycExitSurvey: true },
          "",
          window.location.href
        );

        historyEntryAdded = true;
      }
    };

    /*
      Add the temporary mobile history entry only
      after the visitor has had time to interact.
    */
    const mobileHistoryTimer = window.setTimeout(() => {
      if (window.innerWidth <= 768) {
        window.history.pushState(
          { kycExitSurvey: true },
          "",
          window.location.href
        );

        historyEntryAdded = true;
      }
    }, 4000);

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.clearTimeout(activationTimer);
      window.clearTimeout(mobileHistoryTimer);

      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, [pathname]);

  if (
    pathname !== "/know-your-customer" ||
    !open
  ) {
    return null;
  }

  const closeSurvey = () => {
    setOpen(false);

    /*
      Once the visitor dismisses the survey,
      the browser's next Back action should
      genuinely leave the landing page.

      We don't manually navigate here because
      the visitor may want to continue browsing.
    */
  };

  const submitSurvey = () => {
    if (!selectedReason) return;

    if (
      selectedReason === "Other" &&
      !otherResponse.trim()
    ) {
      return;
    }

    const formData = new URLSearchParams();

    formData.append(
      "reason",
      selectedReason
    );

    formData.append(
      "otherResponse",
      selectedReason === "Other"
        ? otherResponse.trim()
        : ""
    );

    formData.append(
      "page",
      "KYC Landing Page"
    );

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
      keepalive: true,
    }).catch(() => {
      // Keep the user experience smooth.
    });

    setSubmitted(true);
  };

  return (
    <div
      className="kyc-exit-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kyc-exit-title"
    >
      <div className="kyc-exit-card">

        {!submitted ? (
          <>
            <button
              type="button"
              className="kyc-exit-close"
              aria-label="Close"
              onClick={closeSurvey}
            >
              ×
            </button>

            <div className="kyc-exit-eyebrow">
              BEFORE YOU GO… 👀
            </div>

            <h2 id="kyc-exit-title">
              What stopped you from getting the tool?
            </h2>

            <p className="kyc-exit-subtitle">
              Your answer helps us make it more useful.
            </p>

            <div className="kyc-exit-options">
              {REASONS.map((reason) => (
                <button
                  type="button"
                  key={reason}
                  className={`kyc-exit-option ${
                    selectedReason === reason
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedReason(reason)
                  }
                >
                  <span className="kyc-exit-radio">
                    {selectedReason === reason
                      ? "✓"
                      : ""}
                  </span>

                  <span>{reason}</span>
                </button>
              ))}
            </div>

            {selectedReason === "Other" && (
              <textarea
                className="kyc-exit-other"
                value={otherResponse}
                onChange={(event) =>
                  setOtherResponse(
                    event.target.value
                  )
                }
                placeholder="Tell us what stopped you…"
                rows={3}
                maxLength={500}
              />
            )}

            <button
              type="button"
              className="kyc-exit-submit"
              onClick={submitSurvey}
              disabled={
                !selectedReason ||
                (selectedReason === "Other" &&
                  !otherResponse.trim())
              }
            >
              SUBMIT
            </button>

            <button
              type="button"
              className="kyc-exit-dismiss"
              onClick={closeSurvey}
            >
              No thanks
            </button>
          </>
        ) : (
          <div className="kyc-exit-thanks">

            <div className="kyc-exit-thanks-mark">
              ✓
            </div>

            <div className="kyc-exit-eyebrow">
              THANK YOU
            </div>

            <h2>
              That genuinely helps.
            </h2>

            <p>
              Thanks for telling us. We're always
              trying to make this more useful.
            </p>

            <button
              type="button"
              className="kyc-exit-submit"
              onClick={closeSurvey}
            >
              CONTINUE
            </button>

          </div>
        )}

      </div>

      <style jsx global>{`

        .kyc-exit-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background: rgba(0, 0, 0, 0.72);

          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .kyc-exit-card {
          position: relative;

          width: min(520px, 100%);
          max-height: calc(100vh - 40px);

          overflow-y: auto;

          padding: 42px 38px 30px;

          background: #ffffff;
          color: #111111;

          border: 3px solid #111111;

          border-radius: 0;

          box-shadow: 10px 10px 0 #e7a414;

          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .kyc-exit-close {
          position: absolute;

          top: 10px;
          right: 14px;

          width: 36px;
          height: 36px;

          padding: 0;

          border: 0;

          background: transparent;

          color: #111111;

          font-size: 30px;
          line-height: 1;

          cursor: pointer;
        }

        .kyc-exit-eyebrow {
          display: inline-block;

          margin-bottom: 13px;

          padding: 6px 9px;

          background: #111111;
          color: #ffffff;

          font-size: 10px;
          font-weight: 900;

          letter-spacing: 0.09em;
        }

        .kyc-exit-card h2 {
          margin: 0;

          max-width: 450px;

          font-size: clamp(
            28px,
            5vw,
            40px
          );

          line-height: 0.98;

          font-weight: 900;

          letter-spacing: -0.04em;
        }

        .kyc-exit-subtitle {
          margin: 13px 0 22px;

          color: #555555;

          font-size: 14px;

          line-height: 1.5;
        }

        .kyc-exit-options {
          display: grid;
          gap: 8px;
        }

        .kyc-exit-option {
          display: flex;

          align-items: center;

          gap: 11px;

          width: 100%;
          min-height: 51px;

          padding: 11px 13px;

          border: 1.5px solid #d7d7d7;

          background: #ffffff;

          color: #111111;

          text-align: left;

          font-size: 13px;

          font-weight: 700;

          line-height: 1.25;

          cursor: pointer;

          transition: 0.15s ease;
        }

        .kyc-exit-option:hover,
        .kyc-exit-option.selected {
          border-color: #111111;

          background: #fff5d9;
        }

        .kyc-exit-radio {
          flex: 0 0 22px;

          width: 22px;
          height: 22px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 2px solid #111111;

          border-radius: 50%;

          font-size: 12px;

          font-weight: 900;
        }

        .kyc-exit-option.selected
          .kyc-exit-radio {
          background: #e7a414;
        }

        .kyc-exit-other {
          width: 100%;

          margin-top: 10px;

          padding: 12px 14px;

          border: 1.5px solid #111111;

          border-radius: 0;

          resize: vertical;

          outline: none;

          font-family: inherit;

          font-size: 13px;
        }

        .kyc-exit-other:focus {
          box-shadow: 4px 4px 0 #e7a414;
        }

        .kyc-exit-submit {
          width: 100%;

          min-height: 52px;

          margin-top: 16px;

          border: 2px solid #111111;

          background: #e7a414;

          color: #111111;

          font-size: 12px;

          font-weight: 900;

          letter-spacing: 0.08em;

          cursor: pointer;
        }

        .kyc-exit-submit:hover:not(:disabled) {
          background: #111111;

          color: #ffffff;
        }

        .kyc-exit-submit:disabled {
          opacity: 0.45;

          cursor: not-allowed;
        }

        .kyc-exit-dismiss {
          display: block;

          margin: 12px auto 0;

          padding: 0;

          border: 0;

          background: transparent;

          color: #777777;

          font-size: 11px;

          cursor: pointer;
        }

        .kyc-exit-dismiss:hover {
          color: #111111;
          text-decoration: underline;
        }

        .kyc-exit-thanks {
          text-align: center;
        }

        .kyc-exit-thanks-mark {
          width: 58px;
          height: 58px;

          margin: 0 auto 18px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #e7a414;

          color: #111111;

          font-size: 30px;

          font-weight: 900;
        }

        .kyc-exit-thanks p {
          margin: 16px auto 0;

          max-width: 390px;

          color: #555555;

          font-size: 14px;

          line-height: 1.55;
        }

        @media (max-width: 600px) {

          .kyc-exit-overlay {
            align-items: flex-end;
            padding: 10px;
          }

          .kyc-exit-card {
            width: 100%;

            max-height: calc(100vh - 20px);

            padding: 34px 17px 20px;

            box-shadow: 6px 6px 0 #e7a414;
          }

          .kyc-exit-card h2 {
            font-size: 28px;
            line-height: 1;
          }

          .kyc-exit-subtitle {
            margin-bottom: 15px;
            font-size: 12px;
          }

          .kyc-exit-option {
            min-height: 47px;

            padding: 9px 10px;

            font-size: 12px;
          }

          .kyc-exit-submit {
            min-height: 49px;
          }

        }

      `}</style>
    </div>
  );
}
