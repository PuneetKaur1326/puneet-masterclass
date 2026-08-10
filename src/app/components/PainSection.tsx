'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Ticket } from 'lucide-react';

export default function PainSection() {
  const checklist = [
    "Posting consistently.",
    "Trying AI tools.",
    "Following content trends.",
    "Creating \"valuable\" content.",
  ];

  return (
    <section className="py-12 md:py-24 bg-background relative border-t be-border overflow-hidden" id="pain">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="scroll-reveal-item">
            <h2 className="text-section-xl font-bold mb-10 text-foreground">
              You're Doing Everything They Told You To Do...
            </h2>
            <div className="grid gap-4">
              {checklist.map((item, index) => (
                <div key={index} className="outcome-card hover-lift flex items-center gap-4 p-6">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-12 scroll-reveal-item space-y-6">
            <h3 className="text-2xl font-bold text-muted-foreground mb-4">
              Yet...
            </h3>
            
            <p className="text-lg leading-relaxed text-foreground">
              People watch, scroll, and move on.
            </p>
            
            <p className="text-lg leading-relaxed text-primary font-bold">
              Very few remember your brand!
            </p>
            
            <p className="text-base leading-relaxed text-muted-foreground">
              And that's the real problem. Because businesses don't grow when people see them.
            </p>

            <p className="text-lg leading-relaxed text-foreground">
              They grow when people <span className="gradient-amber font-bold">remember</span> them.
            </p>

            <div className="pt-6">
              <a href="https://rzp.io/rzp/J6xwaRTb" className="inline-block w-full sm:w-auto hover-lift group relative overflow-hidden bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Ticket className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 uppercase tracking-widest">Join for ₹99</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
