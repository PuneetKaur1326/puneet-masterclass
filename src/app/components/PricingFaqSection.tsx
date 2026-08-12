'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronDown, Ticket } from 'lucide-react';

const faqs = [
  {
    question: "Is this only for writers?",
    answer: "Not at all. If your work involves communicating with customers, clients, or an audience, this workshop is for you.",
  },
  {
    question: "Will this be useful if I'm just starting out?",
    answer: "Absolutely. Whether you're building a personal brand or scaling a business, the principles you'll learn apply at every stage.",
  },
  {
    question: "Is this about copywriting?",
    answer: "No. This goes beyond writing. It's about understanding the psychology behind communication so every piece of content, every campaign, and every conversation creates a stronger impact.",
  },
  {
    question: "Will there be practical examples?",
    answer: "Yes. The session includes real brand examples and practical insights that you can apply immediately.",
  }
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b be-border last:border-0 ${isOpen ? 'faq-item-active' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-base font-bold text-foreground pr-8">{question}</span>
        <ChevronDown className="w-6 h-6 text-primary flex-shrink-0 faq-chevron" />
      </button>
      <div className="faq-answer">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function PricingFaqSection() {
  const includes = [
    "Live Interactive Session",
    "Practical Frameworks",
    "Real Brand Case Studies",
    "Actionable Communication Insights",
  ];

  return (
    <section className="py-12 md:py-24 bg-background relative" id="pricing">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto mb-32 scroll-reveal-item">
          <div className="text-center mb-12">
            <h2 className="text-section-xl font-bold text-foreground">
              Your Investment
            </h2>
          </div>
          
          <div className="pricing-card-shine rounded-[2rem] p-[1px]">
            <div className="relative bg-card rounded-[2rem] z-10 overflow-hidden flex flex-col md:flex-row">
              
              <div className="md:w-3/5 p-10 md:p-14 border-b md:border-b-0 md:border-r border-border bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 text-foreground leading-tight">
                  The Psychology Behind Writing — Live Workshop<br />
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 mt-4 rounded-md bg-amber-100 text-amber-800 text-sm font-bold uppercase tracking-wider">
                    16 August 2026, 11:00 AM IST
                  </span>
                </h3>
                
                <div className="space-y-5">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-2/5 p-10 md:p-14 bg-muted/30 flex flex-col justify-center items-center text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Today:</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold tracking-tighter gradient-amber">Only ₹99</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-8">
                  A small investment for an idea that can change the way your audience remembers your brand.
                </p>

                <a href="/register" className="w-full hover-lift group relative overflow-hidden bg-primary text-primary-foreground py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <Ticket className="w-5 h-5 relative z-10" />
                    <span className="relative z-10 uppercase tracking-widest">Join Now</span>
                </a>
              </div>
              
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="grid lg:grid-cols-12 gap-16" id="faq">
          <div className="lg:col-span-5 scroll-reveal-item">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground">
              Have a different question? Reach out to our support team.
            </p>
          </div>
          
          <div className="lg:col-span-7 scroll-reveal-item">
            <div className="border-t be-border">
              {faqs.map((faq, i) => (
                <FaqItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
