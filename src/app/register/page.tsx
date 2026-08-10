import { ShieldCheck } from "lucide-react"
import { RegisterForm } from "@/components/forms/RegisterForm"

export const metadata = {
  title: 'Secure Registration | The Psychology Behind Writing',
  description: 'Reserve your seat for the live masterclass.',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 md:py-24 relative overflow-hidden">
      {/* Subtle Premium Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 to-transparent blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-xl mx-auto w-full relative">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-widest mb-6 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Secure Registration
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 leading-tight">
              Reserve Your Seat
            </h1>
            
            <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
              Fill in your details below to proceed to the secure checkout.
            </p>
          </div>

          {/* Centered Premium Registration Card */}
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500 mb-1">Total Investment</span>
                <span className="text-3xl font-bold text-gray-900 tracking-tight">₹99</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50/80 text-green-700 rounded-xl text-sm font-semibold border border-green-100/50">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure</span>
              </div>
            </div>

            <RegisterForm />
          </div>

        </div>
      </div>
    </main>
  )
}
