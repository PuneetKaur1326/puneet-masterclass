export default function KycSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-5 py-12 md:py-20">

      <div className="w-full max-w-2xl">

        {/* SUCCESS CARD */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_70px_-25px_rgba(0,0,0,0.18)] overflow-hidden">

          {/* TOP ACCENT */}
          <div className="h-1.5 bg-[#E7A414]" />

          <div className="px-6 py-10 md:px-12 md:py-14">

            {/* SUCCESS ICON */}
            <div className="flex justify-center mb-7">
              <div className="w-20 h-20 rounded-full bg-[#FFF4D6] flex items-center justify-center">

                <div className="w-12 h-12 rounded-full bg-[#E7A414] flex items-center justify-center shadow-sm">
                  <span className="text-white text-2xl font-bold">
                    ✓
                  </span>
                </div>

              </div>
            </div>


            {/* EYEBROW */}
            <div className="text-center">

              <p className="text-xs font-bold tracking-[0.22em] text-[#B27A00] uppercase mb-4">
                Payment Successful
              </p>

              {/* HEADLINE */}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.05]">
                You’re in.
              </h1>

              <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
                Your{" "}
                <strong className="text-gray-900">
                  Know Your Customer
                </strong>{" "}
                worksheet is ready.
              </p>

            </div>


            {/* WHATSAPP DELIVERY BOX */}
            <div className="mt-9 rounded-2xl bg-[#FFF9EA] border border-[#F4D98C] p-5 md:p-6">

              <div className="flex items-start gap-4">

                {/* WHATSAPP-STYLE ICON */}
                <div className="w-11 h-11 shrink-0 rounded-full bg-[#E7A414] flex items-center justify-center">

                  <span className="text-white text-lg">
                    ✓
                  </span>

                </div>

                <div>

                  <p className="font-bold text-gray-900">
                    Your worksheet is on its way.
                  </p>

                  <p className="mt-1.5 text-sm md:text-base text-gray-600 leading-relaxed">
                    We’ll send your worksheet to the
                    WhatsApp number you provided during
                    checkout.
                  </p>

                </div>

              </div>

            </div>


            {/* WHAT HAPPENS NEXT */}
            <div className="mt-10">

              <div className="flex items-center gap-3 mb-6">

                <div className="h-px flex-1 bg-gray-100" />

                <p className="text-xs font-bold tracking-[0.18em] text-gray-400 uppercase whitespace-nowrap">
                  What happens next?
                </p>

                <div className="h-px flex-1 bg-gray-100" />

              </div>


              {/* STEPS */}
              <div className="space-y-4">

                {/* STEP 1 */}
                <div className="flex items-start gap-4">

                  <div className="w-9 h-9 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>

                  <div className="pt-1">

                    <p className="font-semibold text-gray-900">
                      Open the worksheet
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Check WhatsApp for your PDF and
                      open it when it arrives.
                    </p>

                  </div>

                </div>


                {/* STEP 2 */}
                <div className="flex items-start gap-4">

                  <div className="w-9 h-9 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>

                  <div className="pt-1">

                    <p className="font-semibold text-gray-900">
                      Set aside 15 minutes
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Find a quiet moment to work through
                      the questions honestly.
                    </p>

                  </div>

                </div>


                {/* STEP 3 */}
                <div className="flex items-start gap-4">

                  <div className="w-9 h-9 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>

                  <div className="pt-1">

                    <p className="font-semibold text-gray-900">
                      Understand your customer better
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Use what you uncover to create
                      content, offers and messaging that
                      actually speak to them.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* CTA */}
            <div className="mt-10">

              <a
                href="/know-your-customer"
                className="w-full min-h-[58px] px-6 rounded-xl bg-gray-900 text-white font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-all duration-200 shadow-sm"
              >

                <span>
                  BACK TO KNOW YOUR CUSTOMER
                </span>

                <span className="text-lg">
                  →
                </span>

              </a>

            </div>


            {/* CLOSING MESSAGE */}
            <div className="mt-8 text-center">

              <p className="text-sm text-gray-400 leading-relaxed">
                ₹19 today.
                <br />
                A better understanding of your customer
                tomorrow.
              </p>

            </div>

          </div>

        </div>


        {/* BRAND FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-7">
          Thank you for choosing to understand your
          customer better.
        </p>

      </div>

    </main>
  );
}
