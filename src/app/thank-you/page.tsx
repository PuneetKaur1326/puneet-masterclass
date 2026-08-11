import { Container } from "@/components/layout/Layout"
import { Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registration Confirmed | The Psychology Behind Writing",
  description: "Your seat is confirmed for The Psychology Behind Writing live masterclass on 16 August 2026.",
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12 md:py-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">

          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
            You&apos;re In!
          </h1>
          <p className="text-lg text-gray-500 mb-12 leading-relaxed">
            Your registration is confirmed. Check WhatsApp for your joining details.
          </p>

          {/* Workshop Details Card */}
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 text-left mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-8 pb-6 border-b border-gray-100">
              Workshop Details
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Date</div>
                  <div className="text-gray-500 mt-0.5">Saturday, 16 August 2026</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Time</div>
                  <div className="text-gray-500 mt-0.5">11:00 AM IST (90 Minutes)</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Location</div>
                  <div className="text-gray-500 mt-0.5">Live on Google Meet — link shared via WhatsApp</div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>
      </Container>

      <footer className="mt-24 border-t border-gray-100 py-8 px-6 text-center">
        <p className="text-xs font-medium text-gray-400 flex items-center justify-center flex-wrap gap-4">
          <span>© 2026 Puneet Kaur Saluja.</span>
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms & Conditions</Link>
          <Link href="/refund-policy" className="hover:text-gray-900 transition-colors">Refund Policy</Link>
        </p>
      </footer>
    </main>
  )
}
