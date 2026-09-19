"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PollChoice = "A" | "B" | null;

const learningPoints = [
  {
    number: "01",
    title: "ATTENTION",
    description: "What makes someone stop instead of scroll?",
  },
  {
    number: "02",
    title: "CURIOSITY",
    description: "Why do some messages make you want to know more?",
  },
  {
    number: "03",
    title: "RELEVANCE",
    description: "Why does some content feel like it was written just for you?",
  },
  {
    number: "04",
    title: "EMOTION",
    description: "Why does information alone rarely move people?",
  },
  {
    number: "05",
    title: "MEMORY",
    description: "Why do some brands and messages stay in your head?",
  },
];

const faqs = [
  {
    question: "Who is this webinar for?",
    answer:
      "Creators, content writers, freelancers, marketers, social media managers, founders, personal brands — or anyone who creates content and wants people to actually pay attention to it.",
  },
  {
    question: "Do I need to be a professional writer?",
    answer:
      "No. You don't need to be a writer, marketer or psychology expert. The session is about understanding how people respond to communication and applying that understanding to your own content.",
  },
  {
    question: "Is this an Instagram growth webinar?",
    answer:
      "No. There are no algorithm hacks, viral formulas or posting schedules. The focus is the psychology behind communication and why certain messages get attention.",
  },
  {
    question: "I already use AI for content. Is this relevant?",
    answer:
      "Absolutely. AI can help you create content faster. This webinar focuses on understanding what makes that content worth paying attention to in the first place.",
  },
  {
    question: "Is this a live webinar?",
    answer:
      "Yes. It's a 2-hour live webinar on 27 September at 11 AM IST.",
  },
  {
    question: "Is this only for social media content?",
    answer:
      "No. The principles can be applied to social media, advertising, brand communication, writing, personal branding and other forms of content.",
  },
];

const testimonials = [
  {
    quote:
      "I never knew content could be looked at from this perspective.",
    name: "Kunal Dhillon",
  },
  {
    quote:
      "I can now apply these learnings to my own content creation process.",
    name: "Mayank Singh",
  },
  {
    quote:
      "This webinar helped me understand human psychology and gave me more confidence to grow my page.",
    name: "Reet Kaur",
  },
];

export default function PsychologyBehindWritingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pollChoice, setPollChoice] = useState<PollChoice>(null);

  useEffect(() => {
    if (!pollChoice) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPollChoice(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pollChoice]);

  useEffect(() => {
    if (!pollChoice) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [pollChoice]);

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-[#171717]">
      {/* =========================================================
          HERO — INTERACTIVE POLL
      ========================================================= */}
      <section className="relative overflow-hidden px-5 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24 lg:pt-12">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#F4B400]/10 blur-[100px]" />

        <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-[#F4B400]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* TOP BAR */}
          <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#F4B400]" />
              <span className="text-xs font-black uppercase tracking-[0.2em] sm:text-sm">
                The Psychology Behind Writing
              </span>
            </div>

            <div className="hidden text-xs font-black uppercase tracking-[0.12em] text-black/45 sm:block">
              Live • ₹99
            </div>
          </div>

          {/* HERO COPY */}
          <div className="mx-auto max-w-5xl pt-14 text-center sm:pt-20">
            <div className="text-xs font-black uppercase tracking-[0.22em] text-black/45 sm:text-sm">
              Before you register, answer this:
            </div>

            <h1 className="mt-5 text-[clamp(3.1rem,8vw,7.5rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
              WHICH ONE
              <br />
              WOULD MAKE
              <br />
              <span className="text-[#F4B400]">YOU STOP?</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg font-bold leading-[1.25] tracking-[-0.02em] sm:text-2xl">
              Same subject. Two completely different ways of communicating it.
            </p>
          </div>

          {/* POLL OPTIONS */}
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setPollChoice("A")}
              className="group min-h-[280px] border border-black/10 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-6xl font-black text-black/10 sm:text-7xl">
                  A
                </span>

                <span className="border border-black/15 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-colors group-hover:bg-[#171717] group-hover:text-white">
                  Choose A
                </span>
              </div>

              <p className="mt-12 max-w-xl text-3xl font-black leading-[0.95] tracking-[-0.035em] sm:text-4xl">
                5 Ways to Improve Your Content
              </p>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-black/40">
                Clear. Useful. Familiar.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPollChoice("B")}
              className="group min-h-[280px] bg-[#F4B400] p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-6xl font-black text-black/15 sm:text-7xl">
                  B
                </span>

                <span className="border border-black/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-colors group-hover:bg-[#171717] group-hover:text-white">
                  Choose B
                </span>
              </div>

              <p className="mt-12 max-w-xl text-3xl font-black leading-[0.95] tracking-[-0.035em] sm:text-4xl">
                Your content isn&apos;t boring.
                <br />
                Your audience just has no reason to care.
              </p>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-black/50">
                Tension. Curiosity. Relevance.
              </p>
            </button>
          </div>

          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-sm font-bold text-black/45">
              There&apos;s no wrong answer. We&apos;re interested in what made
              you stop.
            </p>
          </div>

          {/* HERO DATE */}
          <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-5 border-t border-black/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.12em] text-black/50">
                The Psychology Behind Writing
              </div>

              <div className="mt-2 text-base font-bold">
                27 September 2026 • 11 AM IST
              </div>
            </div>

            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-[#171717] px-7 py-4 text-sm font-black uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#F4B400] hover:text-[#171717]"
            >
              I WANT MY CONTENT TO MAKE PEOPLE CARE →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          POLL MODAL
      ========================================================= */}
      {pollChoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="poll-result-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPollChoice(null);
            }
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#F8F6F0] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12">
            <button
              type="button"
              onClick={() => setPollChoice(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-black/15 text-xl font-black transition-colors hover:bg-black hover:text-white"
            >
              ×
            </button>

            <div className="pr-10">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                You chose {pollChoice}
              </div>

              {pollChoice === "A" ? (
                <>
                  <h2
                    id="poll-result-title"
                    className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-5xl"
                  >
                    Clear is good.
                    <br />
                    <span className="text-[#F4B400]">
                      But clear isn&apos;t always enough.
                    </span>
                  </h2>

                  <div className="mt-7 space-y-4 text-base leading-relaxed text-black/65 sm:text-lg">
                    <p>
                      “5 Ways to Improve Your Content” is useful, specific and
                      easy to understand.
                    </p>

                    <p>
                      But your audience has probably seen hundreds of headlines
                      like it.
                    </p>

                    <p className="font-bold text-black">
                      There&apos;s no tension. No curiosity. No strong reason to
                      stop right now.
                    </p>
                  </div>

                  <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                    <p className="text-xl font-black leading-tight sm:text-2xl">
                      Being useful isn&apos;t always enough to get attention.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2
                    id="poll-result-title"
                    className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-5xl"
                  >
                    You probably paused because it created a reaction.
                  </h2>

                  <div className="mt-7 space-y-4 text-base leading-relaxed text-black/65 sm:text-lg">
                    <p>
                      “Your content isn&apos;t boring. Your audience just has no
                      reason to care.”
                    </p>

                    <p>
                      It challenges you. It feels personal. And suddenly, you
                      want to know whether it&apos;s true.
                    </p>

                    <p className="font-bold text-black">
                      That little need to know more is exactly what makes you
                      keep reading.
                    </p>
                  </div>

                  <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                    <p className="text-xl font-black leading-tight sm:text-2xl">
                      Good communication doesn&apos;t just deliver information.
                      It creates a reason to pay attention.
                    </p>
                  </div>
                </>
              )}

              {/* POPUP CTA CHOICES */}
              <div className="mt-9 border-t border-black/10 pt-7">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-black/45">
                  So... what do you want to do with that?
                </p>

                <p className="mt-3 text-2xl font-black leading-tight">
                  Learn the psychology behind why some messages make people
                  stop, care and remember.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/register"
                    onClick={() => setPollChoice(null)}
                    className="inline-flex flex-1 items-center justify-center bg-[#171717] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#F4B400] hover:text-[#171717]"
                  >
                    YES — JOIN THE WEBINAR FOR ₹99 →
                  </Link>

                  <button
                    type="button"
                    onClick={() => setPollChoice(null)}
                    className="inline-flex flex-1 items-center justify-center border border-black/15 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.04em] text-black/55 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                  >
                    NO, I WISH TO STAY STUCK
                  </button>
                </div>

                <p className="mt-4 text-center text-xs font-bold text-black/35">
                  2-hour live webinar • 27 September 2026 • 11 AM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          AND THAT WAS THE POINT
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              And That Was The Point
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Same subject.
              <br />
              <span className="text-[#F4B400]">Different response.</span>
            </h2>

            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-white/65 sm:text-xl">
              <p>
                You just experienced how the same subject can feel completely
                different depending on how it is communicated.
              </p>

              <p>
                The difference wasn&apos;t the information.
              </p>

              <p className="text-xl font-black text-white sm:text-2xl">
                It was the psychology behind the message.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "ATTENTION",
                "CURIOSITY",
                "RELEVANCE",
                "EMOTION",
                "MEMORY",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-white/10 bg-white/5 px-4 py-5 text-center text-xs font-black uppercase tracking-[0.1em]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CORE PROMISE
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              The Core Idea
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-6xl">
              Learn to write for the person reading.
            </h2>

            <p className="mt-8 max-w-2xl text-xl font-bold leading-relaxed text-black/60 sm:text-2xl">
              Not just: “What do I want to say?”
            </p>

            <p className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
              But: “What will make them care?”
            </p>
          </div>

          <div className="mt-12 border-t border-black/10 pt-10">
            <p className="max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl">
              Inside this 2-hour live webinar, we&apos;ll break down what makes
              people stop, become curious, feel that something is relevant,
              connect emotionally and remember a message.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CREDIBILITY
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
                Why Listen To Me?
              </div>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">
                I&apos;ve spent years trying to understand why people care.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-black/65 sm:text-xl">
              <p>
                I&apos;m{" "}
                <strong className="text-black">Puneet Kaur Saluja</strong> — a
                writer, strategist and brand communication specialist.
              </p>

              <p className="font-black text-black">
                9+ YEARS OF WRITING • ADVERTISING • STRATEGY • BRAND
                COMMUNICATION
              </p>

              <p>
                I&apos;ve worked across writing, advertising, social media, brand
                communication, consumer insights and strategy.
              </p>

              <p>And somewhere along the way, I realised something:</p>

              <div className="border-l-4 border-[#F4B400] pl-6">
                <p className="text-2xl font-black leading-tight text-black sm:text-3xl">
                  Good writing isn&apos;t really about words.
                </p>

                <p className="mt-3 text-2xl font-black leading-tight text-[#F4B400] sm:text-3xl">
                  It&apos;s about understanding the person reading them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SELECTED WORK
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              Selected Work
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-6xl">
              This isn&apos;t just something I teach.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-black/60 sm:text-xl">
              I&apos;ve had to figure it out while working with real brands,
              real audiences and real communication problems.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="border border-black/10 bg-white p-7 sm:p-8">
              <div className="text-4xl font-black text-black/10">01</div>

              <h3 className="mt-10 text-3xl font-black uppercase tracking-[-0.03em]">
                SKYLEE
              </h3>

              <p className="mt-3 text-sm font-black uppercase tracking-[0.08em] text-black/45">
                Brand Communication • Campaign Strategy • UGC • Social Media
              </p>

              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="text-2xl font-black">90K+ Engagement</p>
                <p className="mt-2 text-sm font-bold text-black/50">
                  1.29K+ accounts reached • 3K+ influencer reach
                </p>
              </div>
            </div>

            <div className="bg-[#F4B400] p-7 sm:p-8">
              <div className="text-4xl font-black text-black/15">02</div>

              <h3 className="mt-10 text-3xl font-black uppercase tracking-[-0.03em]">
                A FRAGRANCE STORY
              </h3>

              <p className="mt-3 text-sm font-black uppercase tracking-[0.08em] text-black/55">
                Brand Communication • Social Media • Product Launch
              </p>

              <p className="mt-8 text-lg font-bold leading-relaxed">
                Building communication around a Made-in-India fragrance brand
                and its product launches.
              </p>
            </div>

            <div className="bg-[#171717] p-7 text-white sm:p-8">
              <div className="text-4xl font-black text-white/15">03</div>

              <h3 className="mt-10 text-3xl font-black uppercase tracking-[-0.03em]">
                POP FUSION
              </h3>

              <p className="mt-3 text-sm font-black uppercase tracking-[0.08em] text-white/45">
                Brand Communication • Social Media
              </p>

              <p className="mt-8 text-lg font-bold leading-relaxed text-white/70">
                Creating communication designed to make a food brand feel
                relevant in everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SKYLEE CASE STUDY
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              Case Study • Skylee
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">
              #ThankYouSkylee
            </h2>

            <p className="mt-6 text-2xl font-black leading-tight text-white/75 sm:text-3xl">
              What happens when you stop telling people why they should buy —
              and give them a reason to appreciate the brand?
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div className="border border-white/10 bg-white/5 p-7 sm:p-9">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#F4B400]">
                The Insight
              </div>

              <p className="mt-5 text-lg leading-relaxed text-white/65 sm:text-xl">
                After speaking personally with existing customers, one thing
                came through clearly: women appreciated getting good-quality
                outfits without having to spend a fortune.
              </p>

              <p className="mt-5 text-lg font-black leading-relaxed text-white sm:text-xl">
                They could look good, have more options and still feel that
                the quality justified what they were paying.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-7 sm:p-9">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#F4B400]">
                The Idea
              </div>

              <p className="mt-5 text-4xl font-black leading-none text-[#F4B400] sm:text-5xl">
                #ThankYouSkylee
              </p>

              <p className="mt-5 text-lg leading-relaxed text-white/65 sm:text-xl">
                Instead of another communication telling women that Skylee had
                great quality at affordable prices, the appreciation came from
                the audience.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-7 sm:p-9">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#F4B400]">
                The Execution
              </div>

              <p className="mt-5 text-lg leading-relaxed text-white/65 sm:text-xl">
                Different storylines brought the idea into real situations.
                One festive storyline featured a woman showcasing multiple
                outfits for different Diwali parties because she didn&apos;t
                need to repeat an outfit or spend a fortune on every look.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-white/65 sm:text-xl">
                Other storylines explored different festive needs, including
                options for different age groups and women who wanted to dress
                up without going overly heavy.
              </p>
            </div>

            <div className="bg-[#F4B400] p-7 text-[#171717] sm:p-9">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-black/55">
                The Psychology
              </div>

              <p className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
                “Thank You Skylee” → Skylee → appreciation/value
              </p>

              <p className="mt-5 text-lg font-bold leading-relaxed">
                The objective wasn&apos;t simply to show more outfits. It was to
                create an association with the brand and make the communication
                feel closer to word of mouth.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-[#F4B400]">
                  My Role
                </div>

                <p className="mt-5 text-lg font-bold leading-relaxed text-white/70">
                  As Senior Brand Manager, I personally worked across customer
                  conversations, strategy, communication, digital media
                  planning, scripts, UGC direction and shoot supervision.
                </p>
              </div>

              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-[#F4B400]">
                  The Result
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="bg-white/5 p-5">
                    <p className="text-3xl font-black">90K+</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-white/45">
                      Engagement
                    </p>
                  </div>

                  <div className="bg-white/5 p-5">
                    <p className="text-3xl font-black">1.29K+</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-white/45">
                      Accounts Reached
                    </p>
                  </div>

                  <div className="bg-white/5 p-5">
                    <p className="text-3xl font-black">3K+</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-white/45">
                      Influencer Reach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-l-4 border-[#F4B400] pl-6">
            <p className="text-2xl font-black leading-tight sm:text-3xl">
              The point wasn&apos;t just to sell an outfit.
            </p>

            <p className="mt-3 text-2xl font-black leading-tight text-[#F4B400] sm:text-3xl">
              It was to make the audience remember what Skylee meant to them.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT YOU'LL LEARN
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              Inside The Webinar
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-6xl">
              You&apos;ll start seeing content differently.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-5">
            {learningPoints.map((point) => (
              <div
                key={point.number}
                className="bg-[#F8F6F0] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
              >
                <div className="text-base font-black text-[#F4B400]">
                  {point.number}
                </div>

                <h3 className="mt-8 text-2xl font-black uppercase leading-tight">
                  {point.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-black/60">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl border-l-4 border-[#F4B400] pl-6">
            <p className="text-xl font-bold leading-relaxed">
              Knowing psychology is interesting.
            </p>

            <p className="mt-2 text-2xl font-black leading-tight">
              Knowing how to turn it into better communication is useful.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          AI
      ========================================================= */}
      <section className="bg-[#F4B400] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-black/50">
              And This Matters Even More Now
            </div>

            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
              AI can write your words.
            </h2>

            <p className="mt-7 text-3xl font-black leading-tight sm:text-4xl">
              But can it make people care?
            </p>

            <div className="mt-8 space-y-3 text-lg font-bold leading-relaxed">
              <p>Why would someone stop?</p>
              <p>Why would they care?</p>
              <p>Why would they remember?</p>
            </div>

            <div className="mt-8 border-t border-black/20 pt-8">
              <p className="text-xl font-black leading-tight sm:text-2xl">
                AI gives you the words.
              </p>

              <p className="mt-2 text-xl font-black leading-tight sm:text-2xl">
                Psychology helps you understand what those words need to do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHO IS THIS FOR
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              Is This For You?
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-6xl">
              This webinar is for you if you...
            </h2>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {[
              "Create content but struggle to get attention.",
              "Write captions, scripts, ads or social posts.",
              "Are a creator, freelancer, marketer or founder.",
              "Use AI to create content.",
              "Want people to care, not just consume.",
            ].map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-white/5 p-7 text-lg font-bold sm:text-xl"
              >
                <span className="mr-3 text-[#F4B400]">→</span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl border-t border-white/10 pt-8">
            <p className="text-lg text-white/55">
              You don&apos;t need to be a writer.
            </p>

            <p className="mt-2 text-2xl font-black text-[#F4B400] sm:text-3xl">
              You just need to understand the person on the other side of your
              content.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          REAL SHIFT
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              The Real Shift
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              You&apos;ll start thinking differently.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="border border-black/10 bg-white p-8 sm:p-10">
              <div className="text-sm font-black uppercase tracking-[0.15em] text-black/45">
                Instead of asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “What should I post?”
              </p>
            </div>

            <div className="bg-[#F4B400] p-8 sm:p-10">
              <div className="text-sm font-black uppercase tracking-[0.15em] text-black/55">
                Start asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “What will make someone stop?”
              </p>
            </div>

            <div className="border border-black/10 bg-white p-8 sm:p-10">
              <div className="text-sm font-black uppercase tracking-[0.15em] text-black/45">
                Instead of asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “How do I make this sound better?”
              </p>
            </div>

            <div className="bg-[#171717] p-8 text-white sm:p-10">
              <div className="text-sm font-black uppercase tracking-[0.15em] text-white/45">
                Start asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “How will someone interpret this?”
              </p>
            </div>

            <div className="border border-black/10 bg-white p-8 sm:p-10">
              <div className="text-sm font-black uppercase tracking-[0.15em] text-black/45">
                Instead of asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “What does my brand want to say?”
              </p>
            </div>

            <div className="bg-[#F4B400] p-8 sm:p-10">
              <div className="text-sm font-black uppercase tracking-[0.15em] text-black/55">
                Start asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “What does my audience need to hear?”
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl font-black uppercase sm:text-4xl">
              FROM CREATING CONTENT
              <br />
              <span className="text-[#F4B400]">
                → TO CREATING COMMUNICATION.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              What People Say
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-6xl">
              The people who&apos;ve experienced it.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`flex min-h-[280px] flex-col justify-between p-7 sm:p-8 ${
                  index === 1
                    ? "bg-[#F4B400]"
                    : index === 2
                      ? "bg-[#171717] text-white"
                      : "border border-black/10 bg-[#F8F6F0]"
                }`}
              >
                <div>
                  <div
                    className={`text-5xl font-black ${
                      index === 2 ? "text-white/15" : "text-black/10"
                    }`}
                  >
                    “
                  </div>

                  <p className="mt-5 text-xl font-black leading-tight">
                    {testimonial.quote}
                  </p>
                </div>

                <div
                  className={`mt-10 text-xs font-black uppercase tracking-[0.12em] ${
                    index === 2 ? "text-white/50" : "text-black/50"
                  }`}
                >
                  — {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          OFFER
      ========================================================= */}
      <section className="bg-[#F4B400] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="text-sm font-black uppercase tracking-[0.2em] text-black/55">
            The Psychology Behind Writing
          </div>

          <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
            2-HOUR LIVE WEBINAR
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold">
            Attention • Curiosity • Relevance • Emotion • Memory
          </p>

          <div className="mt-10">
            <div className="text-7xl font-black tracking-[-0.06em]">
              ₹99
            </div>
          </div>

          <div className="mt-5 text-sm font-black uppercase tracking-[0.12em] sm:text-base">
            27 September 2026 • 11 AM IST
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {[
              "2-hour live webinar",
              "Practical psychology principles for content",
              "Real-world brand examples",
              "Learnings you can apply to your own content",
            ].map((item) => (
              <div
                key={item}
                className="bg-black/10 p-4 text-sm font-black sm:text-base"
              >
                ✓ {item}
              </div>
            ))}
          </div>

          <Link
            href="/register"
            className="mt-10 inline-flex items-center justify-center bg-[#171717] px-10 py-5 text-sm font-black uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#171717]"
          >
            SAVE MY SEAT FOR ₹99 →
          </Link>

          <p className="mt-6 text-base font-medium text-black/60">
            No complicated theory. No marketing jargon. Just a better
            understanding of the person on the other side of your content.
          </p>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
              FAQ
            </div>

            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
              Questions?
            </h2>
          </div>

          <div className="border-t border-black/10">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-black/10"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-black sm:text-xl">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border border-black/20 text-xl transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-6"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pr-10 text-base leading-relaxed text-black/60 sm:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-center text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B400]">
            One Last Question
          </div>

          <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-6xl">
            Your audience doesn&apos;t owe your content their attention.
          </h2>

          <p className="mt-8 text-2xl font-black text-white/45 sm:text-4xl">
            You have to give them a reason to care.
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/55 sm:text-xl">
            Learn what happens between seeing something, caring about it,
            remembering it and acting on it.
          </p>

          <div className="mt-10 text-sm font-black uppercase tracking-[0.12em] text-[#F4B400]">
            27 September 2026 • 11 AM IST
          </div>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center bg-[#F4B400] px-9 py-5 text-sm font-black uppercase tracking-[0.05em] text-[#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            RESERVE MY SEAT — ₹99 →
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-black/10 bg-[#F8F6F0] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs font-bold uppercase tracking-[0.12em] text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <span>The Psychology Behind Writing</span>

          <span>
            Puneet Kaur Saluja • 27 September 2026 • 11 AM IST
          </span>
        </div>
      </footer>
    </main>
  );
}
