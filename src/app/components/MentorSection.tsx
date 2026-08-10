'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function MentorSection() {
  return (
    <section className="py-12 md:py-24 bg-background relative border-t be-border overflow-hidden" id="mentor">
      <div className="absolute top-0 right-0 w-96 h-96 blob-accent opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 scroll-reveal-item relative">
            <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-6" />
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border shadow-2xl bg-card aspect-[4/5] hover-lift">
              <AppImage 
                src="/images/mentor/puneet-yellow.jpg" 
                alt="Puneet Kaur Saluja" 
                fill
                className="object-cover bg-card opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 max-w-2xl scroll-reveal-item space-y-8">
            <div>
              <h2 className="text-section-xl font-bold mb-2 text-foreground">
                Meet Your Mentor
              </h2>
              <h3 className="text-xl font-bold text-foreground">
                Puneet Kaur Saluja
              </h3>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-foreground">
              <p>
                What started as a ₹500 freelance writing project became a nine-year journey into content, branding, advertising, and communication strategy.
              </p>
              
              <p>
                While working with businesses across industries, one question kept appearing:
              </p>
              
              <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-xl">
                <p>
                  Why do some brands become unforgettable while others, despite creating good content, remain invisible?
                </p>
              </div>
              
              <p>
                That question led to years of studying consumer behaviour, communication psychology, and brand perception.
              </p>
              
              <p>
                Today, Puneet helps businesses move beyond creating content - and start creating communication that people actually remember.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
