'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function DiscoverSection() {
  const discoveries = [
    "Why some brands become unforgettable while others disappear after one scroll.",
    "The psychological reason people trust certain businesses almost instantly.",
    "Why creating more content often doesn't create more impact.",
    "The communication mistakes that silently weaken your brand.",
    "How successful brands build trust long before they make an offer.",
    "A practical way to think about communication that you can apply to every post, campaign, presentation, or sales conversation."
  ];

  return (
    <section className="py-12 md:py-24 bg-background relative" id="discover">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal-item">
          <div className="inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest mb-6 pulse-dot">
            The Transformation
          </div>
          <h2 className="text-section-xl font-bold mb-6 text-foreground">
            What You'll Discover
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            By the end of this session, you'll look at marketing completely differently.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-foreground text-background font-black text-sm uppercase tracking-widest shadow-2xl">
             📅 23 August 2026 • 11:00 AM IST
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {discoveries.map((item, index) => (
            <div key={index} className="outcome-card hover-lift scroll-reveal-item flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
