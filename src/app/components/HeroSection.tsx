'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Ticket } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-12 md:pt-32 md:pb-24 flex items-center overflow-hidden" id="hero">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 blob-primary opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 blob-accent opacity-40" />
        <div className="absolute inset-0 diagonal-rays opacity-30" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="max-w-2xl scroll-reveal-item">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 pulse-dot">
              16 August 2026 • 11:00 AM IST
            </div>

            <h1 className="text-hero-xl font-bold mb-6 text-foreground">
              Your Content <br />
              Is Being <br />
              <span className="gradient-amber">Ignored.</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
              And it’s not because it’s bad. Discover the psychology behind communication that makes people remember your brand, trust your message, and choose you.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="/register" className="w-full sm:w-auto hover-lift group relative overflow-hidden bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Ticket className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 uppercase tracking-widest">Join Now · ₹99</span>
              </a>
            </div>
            
            <div className="mt-8 flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex -space-x-3">
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px]">P</div>
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px]">K</div>
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px]">S</div>
              </div>
              <p>By Puneet Kaur Saluja</p>
            </div>
          </div>

          {/* Visual */}
          <div className="relative scroll-reveal-item lg:block hidden">
            <div className="float-card relative z-10 rounded-[2.5rem] overflow-hidden border border-border shadow-2xl card-glow bg-card aspect-[4/5]">
              <AppImage 
                src="/images/hero/hero-new.png" 
                alt="Hero Illustration" 
                fill 
                priority 
                className="object-cover opacity-90"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
