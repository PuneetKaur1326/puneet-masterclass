"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type PollChoice = "A" | "B" | null;

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
    description: "Why does some content feel written just for you?",
  },
  {
    number: "04",
    title: "EMOTION",
    description: "Why does information alone rarely move people?",
  },
  {
    number: "05",
    title: "MEMORY",
    description: "Why do some messages stay in your head?",
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
      "Yes. It's a 2-hour live webinar on 27 September 2026 at 11 AM IST.",
  },
  {
    question: "Is this only for social media?",
    answer:
      "No. The principles can be applied to social media, advertising, brand communication, writing, personal branding and other forms of content.",
  },
];

export default function PsychologyBehindWritingPage() {
  const [pollChoice, setPollChoice] = useState<PollChoice>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!pollChoice) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPollChoice(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pollChoice]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6F0] text-[#171717]">

      {/* =========================================================
          TOP BAR
      ========================================================= */}
      <header className="border-b border-black/10 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#F4B400]" />

            <span className="text-xs font-black uppercase tracking-[0.18em] sm:text-sm">
              Puneet Kaur Saluja
            </span>
          </div>

          <div className="hidden text-xs font-black uppercase tracking-[0.12em] text-black/40 sm:block">
            The Psychology Behind Writing
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

            {/* HERO TEXT */}
            <div>
              <div className="mb-6 text-xs font-black uppercase tracking-[0.22em] text-black/45 sm:text-sm">
                A live 2-hour webinar • ₹99
              </div>

              <h1 className="text-[clamp(3.4rem,8vw,7.7rem)] font-black uppercase leading-[0.79] tracking-[-0.065em]">
                WHICH ONE
                <br />
                WOULD MAKE
                <br />
                <span className="text-[#F4B400]">YOU STOP?</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg font-bold leading-tight sm:text-2xl">
                Same subject. Two completely different ways of communicating
                it.
              </p>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-black/50">
                Click one. See what your choice reveals about attention,
                curiosity and the psychology behind communication.
              </p>
            </div>

            {/* HERO IMAGE */}
            <div className="relative">
              <div className="absolute -right-5 -top-5 z-0 h-32 w-32 rounded-full bg-[#F4B400] sm:h-44 sm:w-44" />

              <div className="relative z-10 overflow-hidden border border-black/10 bg-white">
                <Image
                  src="/landing-assets/puneet-profile.jpeg"
                  alt="Puneet Kaur Saluja"
                  width={1024}
                  height={768}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>

              <div className="relative z-20 -mt-8 ml-6 max-w-xs bg-[#171717] p-5 text-white sm:ml-10">
                <div className="text-xs font-black uppercase tracking-[0.15em] text-[#F4B400]">
                  9+ YEARS
                </div>

                <p className="mt-2 text-sm font-bold leading-relaxed text-white/70">
                  Writing • Advertising • Strategy • Brand Communication
                </p>
              </div>
            </div>
          </div>

          {/* POLL */}
          <div className="mt-16 grid gap-4 md:grid-cols-2">

            {/* OPTION A */}
            <button
              type="button"
              onClick={() => setPollChoice("A")}
              className="group min-h-[250px] border border-black/10 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-6xl font-black text-black/10">
                  A
                </span>

                <span className="border border-black/15 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] group-hover:bg-black group-hover:text-white">
                  Choose A
                </span>
              </div>

              <p className="mt-10 max-w-lg text-3xl font-black leading-[0.95] tracking-[-0.035em] sm:text-4xl">
                5 Ways to Improve Your Content
              </p>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.15em] text-black/40">
                Clear • Useful • Familiar
              </p>
            </button>

            {/* OPTION B */}
            <button
              type="button"
              onClick={() => setPollChoice("B")}
              className="group min-h-[250px] bg-[#F4B400] p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-6xl font-black text-black/15">
                  B
                </span>

                <span className="border border-black/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] group-hover:bg-black group-hover:text-white">
                  Choose B
                </span>
              </div>

              <p className="mt-10 max-w-lg text-3xl font-black leading-[0.95] tracking-[-0.035em] sm:text-4xl">
                Your content isn&apos;t boring.
                <br />
                Your audience just has no reason to care.
              </p>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.15em] text-black/50">
                Tension • Curiosity • Relevance
              </p>
            </button>
          </div>

          {/* DATE + CTA */}
          <div className="mt-8 flex flex-col gap-5 border-t border-black/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">
                Live Webinar
              </div>

              <div className="mt-2 font-black">
                27 September 2026 • 11 AM IST
              </div>
            </div>

            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-[#171717] px-7 py-4 text-sm font-black uppercase tracking-[0.04em] text-white transition hover:bg-[#F4B400] hover:text-black"
            >
              RESERVE SEAT — ₹99 →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          POLL MODAL
      ========================================================= */}
      {pollChoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPollChoice(null);
            }
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#F8F6F0] p-7 shadow-2xl sm:p-10 lg:p-12">

            <button
              type="button"
              onClick={() => setPollChoice(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-black/15 text-xl font-black hover:bg-black hover:text-white"
            >
              ×
            </button>

            <div className="pr-10">

              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                You chose {pollChoice}
              </div>

              {pollChoice === "A" ? (
                <>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-5xl">
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

                    <p className="font-black text-black">
                      There&apos;s no tension. No curiosity. No strong reason to
                      stop right now.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-5xl">
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

                    <p className="font-black text-black">
                      That little need to know more is exactly what makes you
                      keep reading.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                <p className="text-xl font-black leading-tight sm:text-2xl">
                  Good communication doesn&apos;t just deliver information.
                  It creates a reason to pay attention.
                </p>
              </div>

              <div className="mt-9 border-t border-black/10 pt-7">

                <p className="text-sm font-black uppercase tracking-[0.15em] text-black/40">
                  So... what do you want to do with that?
                </p>

                <div className="mt-3 text-2xl font-black leading-tight">
                  Learn the psychology behind why some messages make people
                  stop, care and remember.
                </div>

                {/* YES / NO */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href="/register"
                    onClick={() => setPollChoice(null)}
                    className="inline-flex flex-1 items-center justify-center bg-[#171717] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.03em] text-white hover:bg-[#F4B400] hover:text-black"
                  >
                    YES — JOIN THE WEBINAR FOR ₹99 →
                  </Link>

                  <button
                    type="button"
                    onClick={() => setPollChoice(null)}
                    className="inline-flex flex-1 items-center justify-center border border-black/15 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.03em] text-black/55 hover:bg-black hover:text-white"
                  >
                    NO, I WISH TO STAY UNAWARE AND STUCK
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          AND THAT WAS THE POINT
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">

            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                And That Was The Point
              </div>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.87] tracking-[-0.05em] sm:text-7xl">
                Same subject.
                <br />
                <span className="text-[#F4B400]">
                  Different response.
                </span>
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
                The difference wasn&apos;t the information.
              </p>

              <p className="mt-2 text-2xl font-black sm:text-3xl">
                It was the psychology behind the message.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <div className="text-6xl font-black text-[#F4B400]">
                01
              </div>

              <p className="mt-8 text-2xl font-black leading-tight">
                The way you communicate something can completely change how
                someone responds to it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          VIDEO
      ========================================================= */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                See Me Think
              </div>

              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">
                Don&apos;t just take my word for it.
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-black/55 sm:text-lg">
                See how I approach content, communication and the psychology
                behind what makes people pay attention.
              </p>
            </div>

            <div className="aspect-video overflow-hidden bg-black shadow-[0_25px_80px_rgba(0,0,0,0.15)]">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/NoE0_t_EnAs"
                title="The Psychology Behind Writing"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT PUNEET
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div className="relative">
              <div className="absolute -bottom-5 -left-5 h-28 w-28 bg-[#F4B400]" />

              <div className="relative overflow-hidden border border-black/10 bg-white">
                <Image
                  src="/landing-assets/puneet-profile.jpeg"
                  alt="Puneet Kaur Saluja"
                  width={1024}
                  height={768}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div>

              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                Why Listen To Me?
              </div>

              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">
                I&apos;ve spent years trying to understand why people care.
              </h2>

              <p className="mt-7 text-lg leading-relaxed text-black/60 sm:text-xl">
                I&apos;m Puneet Kaur Saluja — a writer, strategist and brand
                communication specialist.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">

                <div className="bg-[#171717] p-5 text-white">
                  <div className="text-3xl font-black">
                    9+
                  </div>

                  <div className="mt-2 text-xs font-black uppercase tracking-[0.1em] text-white/45">
                    Years
                  </div>
                </div>

                <div className="bg-[#F4B400] p-5">
                  <div className="text-3xl font-black">
                    ₹500
                  </div>

                  <div className="mt-2 text-xs font-black uppercase tracking-[0.1em] text-black/45">
                    Where I Started
                  </div>
                </div>

              </div>

              <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                <p className="text-xl font-black leading-tight sm:text-2xl">
                  Good writing isn&apos;t really about words.
                </p>

                <p className="mt-2 text-xl font-black leading-tight text-[#F4B400] sm:text-2xl">
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
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
              Selected Work
            </div>

            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl">
              This isn&apos;t just something I teach.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/55 sm:text-xl">
              I&apos;ve had to figure it out while working with real brands,
              real audiences and real communication problems.
            </p>

          </div>

          {/* FIRST ROW */}
          <div className="mt-14 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">

            {/* A FRAGRANCE STORY */}
            <div className="group overflow-hidden bg-white">

              <div className="overflow-hidden">
                <Image
                  src="/landing-assets/a-fragrance-story-brand.jpeg"
                  alt="A Fragrance Story brand communication work"
                  width={1024}
                  height={768}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="bg-white p-6 text-black">
                <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">
                  A Fragrance Story
                </div>

                <h3 className="mt-2 text-2xl font-black">
                  Brand Communication
                </h3>
              </div>

            </div>

            {/* POP FUSION */}
            <div className="group overflow-hidden bg-[#F4B400]">

              <div className="overflow-hidden">
                <Image
                  src="/landing-assets/pop-fusion.jpeg"
                  alt="Pop Fusion social media work"
                  width={1024}
                  height={768}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="bg-[#F4B400] p-6 text-black">
                <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">
                  Pop Fusion
                </div>

                <h3 className="mt-2 text-2xl font-black">
                  Social Media Copy
                </h3>
              </div>

            </div>

          </div>

          {/* SECOND ROW */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">

            {/* PRODUCT LAUNCH */}
            <div className="group overflow-hidden bg-white">

              <div className="overflow-hidden">
                <Image
                  src="/landing-assets/a-fragrance-story-product-launch.jpeg"
                  alt="A Fragrance Story product launch work"
                  width={1024}
                  height={768}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-6 text-black">
                <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">
                  A Fragrance Story
                </div>

                <h3 className="mt-2 text-2xl font-black">
                  Product Launch
                </h3>
              </div>

            </div>

            {/* FOODFOX */}
            <div className="group overflow-hidden bg-white">

              <div className="overflow-hidden">
                <Image
                  src="/landing-assets/foodfox.jpeg"
                  alt="FoodFox social media work"
                  width={1024}
                  height={768}
                  className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-6 text-black">
                <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">
                  FoodFox
                </div>

                <h3 className="mt-2 text-2xl font-black">
                  Social Media Copy
                </h3>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SKYLEE CASE STUDY
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            {/* LEFT */}
            <div>

              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                Case Study
              </div>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-7xl">
                #ThankYou
                <br />
                Skylee
              </h2>

              <p className="mt-7 text-lg font-bold leading-relaxed text-black/55">
                A communication idea built around appreciation, affordability
                and the feeling of finding something that simply makes life
                easier.
              </p>

            </div>

            {/* RIGHT */}
            <div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="bg-[#171717] p-7 text-white">

                  <div className="text-xs font-black uppercase tracking-[0.15em] text-[#F4B400]">
                    Insight
                  </div>

                  <p className="mt-5 text-lg font-bold leading-relaxed text-white/70">
                    Women appreciated getting good-quality outfits at prices
                    that allowed them to have more options without spending a
                    fortune.
                  </p>

                </div>

                <div className="bg-[#F4B400] p-7">

                  <div className="text-xs font-black uppercase tracking-[0.15em] text-black/50">
                    Idea
                  </div>

                  <p className="mt-5 text-lg font-black leading-relaxed">
                    Instead of the brand telling women why they should buy,
                    create communication that felt like appreciation coming
                    from the audience.
                  </p>

                </div>

                <div className="border border-black/10 bg-white p-7">

                  <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">
                    Execution
                  </div>

                  <p className="mt-5 text-lg leading-relaxed text-black/60">
                    Festive storylines, UGC direction, scripts, digital media
                    planning and shoot supervision built around relatable
                    “Skylee moments.”
                  </p>

                </div>

                <div className="border border-black/10 bg-white p-7">

                  <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">
                    My Role
                  </div>

                  <p className="mt-5 text-lg leading-relaxed text-black/60">
                    Senior Brand Manager — customer conversations, strategy,
                    communication, digital media plan, scripts, UGC direction
                    and shoot supervision.
                  </p>

                </div>

              </div>

              {/* RESULTS */}
              <div className="mt-4 grid grid-cols-3 gap-3">

                <div className="bg-[#171717] p-5 text-white">
                  <div className="text-2xl font-black sm:text-3xl">
                    90K+
                  </div>

                  <div className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-white/40">
                    Engagement
                  </div>
                </div>

                <div className="bg-[#171717] p-5 text-white">
                  <div className="text-2xl font-black sm:text-3xl">
                    1.29K+
                  </div>

                  <div className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-white/40">
                    Accounts Reached
                  </div>
                </div>

                <div className="bg-[#F4B400] p-5">
                  <div className="text-2xl font-black sm:text-3xl">
                    3K+
                  </div>

                  <div className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-black/45">
                    Influencer Reach
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* PSYCHOLOGY */}
          <div className="mt-14 bg-[#F4B400] p-8 sm:p-12">

            <div className="text-xs font-black uppercase tracking-[0.15em] text-black/50">
              The Psychology
            </div>

            <p className="mt-5 max-w-4xl text-3xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">
              The point wasn&apos;t just to sell an outfit.
              <br />

              <span className="text-black/45">
                It was to make the audience remember what Skylee meant to them.
              </span>
            </p>

          </div>

        </div>
      </section>

      {/* =========================================================
          WHAT YOU'LL LEARN
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.7fr]">

            <div>

              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                Inside The Webinar
              </div>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl">
                You&apos;ll start seeing content differently.
              </h2>

            </div>

            <p className="text-base leading-relaxed text-black/50 sm:text-lg">
              Five psychological lenses that change how you approach a
              headline, caption, script, ad or brand message.
            </p>

          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {learningPoints.map((point) => (
              <div
                key={point.number}
                className="group min-h-[250px] border border-black/10 p-6 transition hover:-translate-y-1 hover:bg-[#F4B400] sm:p-7"
              >

                <div className="text-sm font-black text-[#F4B400] group-hover:text-black/40">
                  {point.number}
                </div>

                <h3 className="mt-12 text-2xl font-black">
                  {point.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-black/55">
                  {point.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          AI
      ========================================================= */}
      <section className="bg-[#F4B400] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.7fr]">

            <div>

              <div className="text-xs font-black uppercase tracking-[0.2em] text-black/50">
                And This Matters Even More Now
              </div>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.87] tracking-[-0.05em] sm:text-7xl">
                AI can write
                <br />
                your words.
              </h2>

              <p className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
                But can it make people care?
              </p>

            </div>

            <div className="border border-black/15 bg-black/5 p-8">

              <p className="text-xl font-black leading-tight">
                AI helps you create faster.
              </p>

              <p className="mt-5 text-xl font-black leading-tight">
                Psychology helps you understand what those words need to do.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          WHO IS THIS FOR
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">

            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
              Is This For You?
            </div>

            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl">
              If you create content,
              <br />
              probably.
            </h2>

          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">

            {[
              "Creators",
              "Content Writers",
              "Freelancers",
              "Marketers",
              "Social Media Managers",
              "Founders",
              "Personal Brands",
              "Anyone creating content",
            ].map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-white/5 p-6 text-xl font-black"
              >
                <span className="mr-3 text-[#F4B400]">
                  →
                </span>

                {item}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          MINDSET SHIFT
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">

            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
              The Real Shift
            </div>

            <h2 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl">
              From creating content
              <br />
              to creating communication.
            </h2>

          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2">

            {[
              [
                "What should I post?",
                "What will make someone stop?",
              ],
              [
                "How do I make this sound better?",
                "How will someone interpret this?",
              ],
              [
                "What does my brand want to say?",
                "What does my audience need to hear?",
              ],
            ].map(([from, to]) => (
              <div
                key={from}
                className="border border-black/10 bg-white p-7 sm:p-9"
              >

                <div className="text-xs font-black uppercase tracking-[0.12em] text-black/35">
                  Instead of
                </div>

                <p className="mt-5 text-2xl font-black text-black/35 line-through">
                  {from}
                </p>

                <div className="my-5 h-px bg-black/10" />

                <div className="text-xs font-black uppercase tracking-[0.12em] text-[#F4B400]">
                  Start asking
                </div>

                <p className="mt-3 text-2xl font-black leading-tight">
                  {to}
                </p>

              </div>
            ))}

            <div className="flex items-center bg-[#F4B400] p-7 sm:p-9">

              <p className="text-3xl font-black uppercase leading-[0.9] sm:text-4xl">
                Your audience doesn&apos;t need more content.
                <br />

                <span className="text-black/45">
                  They need a reason to care about yours.
                </span>
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
            What People Say
          </div>

          <h2 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl">
            When the way you see content changes.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">

            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`flex min-h-[290px] flex-col justify-between p-7 sm:p-8 ${
                  index === 0
                    ? "bg-[#F8F6F0]"
                    : index === 1
                      ? "bg-[#F4B400]"
                      : "bg-[#171717] text-white"
                }`}
              >

                <div>

                  <div className="text-5xl font-black opacity-20">
                    “
                  </div>

                  <p className="mt-5 text-xl font-black leading-tight">
                    {testimonial.quote}
                  </p>

                </div>

                <div className="text-xs font-black uppercase tracking-[0.12em] opacity-50">
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

          <div className="text-xs font-black uppercase tracking-[0.2em] text-black/50">
            The Psychology Behind Writing
          </div>

          <h2 className="mt-5 text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-7xl">
            2-HOUR LIVE
            <br />
            WEBINAR
          </h2>

          <div className="mt-8 text-7xl font-black tracking-[-0.07em]">
            ₹99
          </div>

          <div className="mt-4 text-sm font-black uppercase tracking-[0.12em]">
            27 September 2026 • 11 AM IST
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">

            {[
              "Attention",
              "Curiosity",
              "Relevance",
              "Emotion",
              "Memory",
              "Real-world brand examples",
            ].map((item) => (
              <div
                key={item}
                className="bg-black/10 p-4 text-sm font-black uppercase tracking-[0.06em]"
              >
                ✓ {item}
              </div>
            ))}

          </div>

          <Link
            href="/register"
            className="mt-10 inline-flex items-center justify-center bg-[#171717] px-10 py-5 text-sm font-black uppercase tracking-[0.05em] text-white transition hover:bg-white hover:text-black"
          >
            SAVE MY SEAT FOR ₹99 →
          </Link>

        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">

          <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
            FAQ
          </div>

          <h2 className="mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl">
            Questions?
          </h2>

          <div className="mt-12 border-t border-black/10">

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
                  >

                    <span className="text-lg font-black sm:text-xl">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border border-black/20 text-xl transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
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

                      <p className="max-w-3xl pr-10 text-base leading-relaxed text-black/55 sm:text-lg">
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
        <div className="mx-auto max-w-5xl">

          <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
            One Last Question
          </div>

          <h2 className="mt-6 text-5xl font-black uppercase leading-[0.86] tracking-[-0.05em] sm:text-7xl">
            Your audience doesn&apos;t owe your content their attention.
          </h2>

          <p className="mt-8 text-2xl font-black text-white/45 sm:text-4xl">
            You have to give them a reason to care.
          </p>

          <div className="mt-8 text-sm font-black uppercase tracking-[0.12em] text-[#F4B400]">
            27 September 2026 • 11 AM IST
          </div>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center bg-[#F4B400] px-9 py-5 text-sm font-black uppercase tracking-[0.05em] text-black transition hover:bg-white"
          >
            RESERVE MY SEAT — ₹99 →
          </Link>

        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-black/10 bg-[#F8F6F0] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs font-bold uppercase tracking-[0.1em] text-black/40 sm:flex-row sm:items-center sm:justify-between">

          <span>
            The Psychology Behind Writing
          </span>

          <span>
            Puneet Kaur Saluja • 27 September 2026 • 11 AM IST
          </span>

        </div>
      </footer>

    </main>
  );
}
