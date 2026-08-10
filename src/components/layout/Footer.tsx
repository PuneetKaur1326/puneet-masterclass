import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { ArrowRight, ShieldCheck, FileText, CreditCard, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background flex flex-col">
      {/* Legal & Policies Section */}
      <div className="py-16 md:py-24 px-6 md:px-12 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Legal & Policies</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Privacy Policy */}
            <Link href="/privacy" className="group flex flex-col justify-between p-8 bg-white border border-gray-200/60 rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
              <div>
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  Privacy Policy
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Learn how your information is collected, stored and protected.
                </p>
              </div>
              <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                View Privacy Policy
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Terms & Conditions */}
            <Link href="/terms" className="group flex flex-col justify-between p-8 bg-white border border-gray-200/60 rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
              <div>
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  Terms & Conditions
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Read the terms governing workshop registrations and website usage.
                </p>
              </div>
              <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                View Terms
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Refund Policy */}
            <Link href="/refund-policy" className="group flex flex-col justify-between p-8 bg-white border border-gray-200/60 rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:col-span-2 lg:col-span-1">
              <div>
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  Refund & Cancellation Policy
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Understand our cancellation, refund and payment policies before registering.
                </p>
              </div>
              <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                View Refund Policy
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              <AppLogo size={28} />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-foreground">Puneet Kaur Saluja</span>
                <span className="text-xs font-medium text-amber-600 uppercase tracking-widest">The Psychology Behind Writing</span>
                <span className="text-xs font-semibold text-muted-foreground mt-1">A Contentatia initiative</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="https://www.instagram.com/contentatia" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@contentatia970/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="mailto:puneet.contentatia@gmail.com" className="hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Quick Links</h4>
              <a href="/#discover" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Workshop</a>
              <a href="https://rzp.io/rzp/J6xwaRTb" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Register</a>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Contact</Link>
            </div>
            
            {/* Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Legal</h4>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Terms & Conditions</Link>
              <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Refund Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground">
              © 2026 Contentatia. All Rights Reserved
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-500"/> Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
