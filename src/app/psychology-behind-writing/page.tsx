"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const learningPoints = [
  {
    number: "01",
    title: "WHY PEOPLE STOP",
    description:
      "What makes someone pause instead of scroll?",
  },
  {
    number: "02",
    title: "WHY CONTENT FEELS RELEVANT",
    description:
      "How do you communicate what your audience is actually ready to hear?",
  },
  {
    number: "03",
    title: "WHY EMOTION MATTERS",
    description:
      "How do what people think and feel influence how they respond?",
  },
  {
    number: "04",
    title: "WHY SOME BRANDS ARE REMEMBERED",
    description:
      "How does communication create familiarity, recognition and memory?",
  },
];

const faqs = [
  {
    question: "Is this a writing workshop?",
    answer:
      "Not in the traditional sense. It's about the psychology behind communication, attention, relevance and brand memory.",
  },
  {
    question: "Do I need to be a professional writer?",
    answer:
      "No. If you use content to build a brand, business or practice, this is for you.",
  },
  {
    question: "Is this an Instagram growth webinar?",
    answer:
      "No. No algorithm hacks, viral formulas or posting schedules.",
  },
  {
    question: "I already use AI for content. Is this relevant?",
    answer:
      "Yes. AI can create the words. You still need to know what those words should communicate and why.",
  },
  {
    question: "Is it live?",
    answer:
      "Yes. It's a 2-hour live webinar on 06 September at 11 AM IST.",
  },
];

export default function PsychologyBehindWritingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const registerUrl = "/register";

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-[#171717]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-14">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#F4B400]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-[#F4B400]/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">

          {/* Eyebrow */}
          <div className="mb-10 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#F4B400]" />
            <span className="text-[10px] font-black uppercase tracking-[0.28em]">
              The Psychology Behind Writing
            </span>
          </div>

          {/* Main hero grid */}
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">

            {/* LEFT — HEADLINE */}
            <div>

              <h1 className="max-w-[680px] text-[clamp(3.6rem,7.2vw,7.8rem)] font-black uppercase leading-[0.82] tracking-[-0.065em]">
                WHY
                <br />
                ISN&apos;T
                <br />
                ANYONE
                <br />
                <span className="text-[#F4B400]">
                  NOTICING
                </span>
                <br />
                YOUR
                <br />
                CONTENT?
              </h1>

              <p className="mt-8 max-w-[620px] text-xl font-bold leading-[1.2] tracking-[-0.02em] sm:text-2xl lg:text-[2rem]">
                Learn what makes people stop, pay attention and actually
                process a message — instead of scrolling past it.
              </p>

              {/* Topic pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "ATTENTION",
                  "CURIOSITY",
                  "RELEVANCE",
                  "EMOTION",
                  "MEMORY",
                ].map((item) => (
                  <span
                    key={item}
                    className="border border-black/15 bg-white/50 px-4 py-2 text-[9px] font-black uppercase tracking-[0.15em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — VIDEO */}
            <div className="flex items-center justify-center lg:min-h-[650px]">

              <div className="w-full max-w-[600px]">

                {/* Watch first label */}
                <div className="relative z-10 mb-[-18px] ml-[-12px] inline-block rotate-[-4deg] bg-[#F4B400] px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] shadow-lg">
                  WATCH THIS FIRST
                </div>

                {/* Video */}
                <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#171717] shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/NoE0_t_EnAs"
                    title="The Psychology Behind Writing"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                </div>

                {/* Video caption */}
                <div className="mt-4 flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[0.14em] text-black/40">
                  <span>WATCH BEFORE YOU REGISTER</span>
                  <span className="text-right">
                    THE PSYCHOLOGY BEHIND WRITING
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* CTA + date */}
          <div className="mt-14 flex flex-col gap-5 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/45">
                LIVE • 2 HOURS • ₹99
              </div>

              <div className="mt-2 text-sm font-bold">
                06 September 2026 • 11 AM IST
              </div>
            </div>

            <Link
              href={registerUrl}
              className="inline-flex items-center justify-center bg-[#171717] px-7 py-4 text-sm font-black uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#F4B400] hover:text-[#171717]"
            >
              I WANT MY CONTENT TO MAKE PEOPLE CARE →
            </Link>

          </div>

        </div>
      </section>


      {/* =========================================================
          PROBLEM
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">

            <div className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
              The problem
            </div>

            <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              You probably don&apos;t have a content problem.
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/70">

              <p>
                You have ideas.
              </p>

              <p>
                You know your subject.
              </p>

              <p>
                You know you should post consistently.
              </p>

              <p>And yet...</p>

              <p className="text-3xl font-black text-white">
                You publish.
                <br />
                Maybe someone likes it.
                <br />
                Maybe someone comments.
                <br />
                And then...
              </p>

              <p className="text-5xl font-black text-[#F4B400]">
                Nothing.
              </p>

              <p>
                No conversation.
                <br />
                No enquiry.
                <br />
                No one remembers you the next day.
              </p>

            </div>

            <div className="mt-10 border-l-4 border-[#F4B400] pl-6">
              <p className="text-xl font-bold">
                You keep asking:
              </p>

              <p className="mt-2 text-3xl font-black">
                “What should I post today?”
              </p>

              <p className="mt-5 text-xl text-white/60">
                But maybe the better question is:
              </p>

              <p className="mt-2 text-3xl font-black text-[#F4B400]">
                “Why should my audience care?”
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          A / B TEST
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 max-w-2xl">

            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
              Let&apos;s test something
            </div>

            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Which one makes you stop?
            </h2>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* A */}
            <div className="border border-black/10 bg-white p-8 sm:p-10">
              <div className="mb-8 text-5xl font-black text-black/10">
                A
              </div>

              <p className="text-2xl font-black leading-tight">
                5 Content Writing Tips Every Business Owner Should Know
              </p>
            </div>

            {/* B */}
            <div className="relative overflow-hidden bg-[#F4B400] p-8 sm:p-10">

              <div className="mb-8 text-5xl font-black text-black/20">
                B
              </div>

              <p className="text-3xl font-black leading-tight sm:text-4xl">
                Your content isn&apos;t boring.
                <br />
                Your audience just has no reason to care.
              </p>

            </div>

          </div>

          <div className="mt-10 max-w-3xl">

            <p className="text-lg leading-relaxed text-black/65">
              If you paused at B, ask yourself why.
            </p>

            <p className="mt-4 text-xl font-bold">
              The information didn&apos;t suddenly become more valuable.
            </p>

            <p className="mt-4 text-xl font-bold">
              The message simply gave you a stronger reason to pay attention.
            </p>

            <p className="mt-8 text-3xl font-black uppercase">
              CONTENT ≠ COMMUNICATION
            </p>

          </div>

        </div>
      </section>


      {/* =========================================================
          WHAT YOU'LL LEARN
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="mb-14 max-w-3xl">

            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
              Inside the webinar
            </div>

            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              You&apos;ll learn to look at your content differently.
            </h2>

          </div>

          <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2">

            {learningPoints.map((point) => (
              <div
                key={point.number}
                className="bg-[#F8F6F0] p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
              >

                <div className="text-sm font-black text-[#F4B400]">
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

        </div>
      </section>


      {/* =========================================================
          AI SECTION
      ========================================================= */}
      <section className="bg-[#F4B400] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr]">

            <div>

              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">
                And this matters even more now
              </div>

              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
                AI can create the words.
              </h2>

            </div>

            <div>

              <div className="grid grid-cols-2 gap-2">
                {["Captions", "Hooks", "Scripts", "Ideas"].map((item) => (
                  <div
                    key={item}
                    className="border border-black/10 bg-white/40 p-5 text-center text-sm font-black uppercase"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-8 text-2xl font-black leading-tight">
                But AI hasn&apos;t made people care about your content.
              </p>

            </div>

          </div>

          <div className="mt-14 border-t border-black/20 pt-10">

            <p className="text-lg font-bold">
              The real skill is knowing:
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {[
                "What should I say?",
                "Why should I say it?",
                "What should my audience feel?",
                "What should they remember?",
              ].map((question) => (
                <div
                  key={question}
                  className="bg-[#171717] p-5 text-lg font-black text-white"
                >
                  {question}
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          ABOUT PUNEET
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            {/* PHOTO */}
            <div className="relative mx-auto w-full max-w-[430px]">

              <div className="absolute -bottom-5 -left-5 h-full w-full border border-[#F4B400]" />

              <div className="relative aspect-[3/4] overflow-hidden bg-[#E7D6B4]">

                <Image
                  src="/IMG_0161.JPG.jpeg"
                  alt="Puneet Kaur Saluja"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 430px"
                />

              </div>

            </div>

            {/* CONTENT */}
            <div>

              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
                Your mentor
              </div>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
                Puneet
                <br />
                Kaur Saluja
              </h2>

              <p className="mt-7 text-xl font-bold leading-relaxed">
                9 YEARS OF WRITING • ADVERTISING • STRATEGY • BRAND COMMUNICATION
              </p>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-black/65">

                <p>
                  My journey started with a <strong className="text-black">₹500 writing project</strong>.
                </p>

                <p>
                  Since then, I&apos;ve worked across writing, freelancing,
                  advertising, strategy, consumer insights and brand communication.
                </p>

                <p>
                  And I&apos;ve learned one thing:
                </p>

              </div>

              <div className="mt-8 border-l-4 border-[#F4B400] pl-6">

                <p className="text-2xl font-black leading-tight sm:text-3xl">
                  Writing isn&apos;t just about putting words together.
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
          WHO IS THIS FOR
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">

            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
              Is this for you?
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              You&apos;ve probably said one of these.
            </h2>

          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2">

            {[
              "I'm posting consistently but nothing is happening.",
              "People engage, but don't enquire.",
              "My content sounds like everyone else's.",
              "I know what I want to say, but I don't know how to say it.",
            ].map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-white/5 p-7 text-xl font-bold"
              >
                “{item}”
              </div>
            ))}

          </div>

          <div className="mt-12 max-w-3xl border-t border-white/10 pt-10">

            <p className="text-xl text-white/60">
              If that&apos;s you, you don&apos;t need another content calendar.
            </p>

            <p className="mt-3 text-3xl font-black text-[#F4B400]">
              You need to understand your audience better.
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

            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
              The real shift
            </div>

            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Change the question.
            </h2>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">

            <div className="border border-black/10 bg-white p-8 sm:p-10">

              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                Instead of asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “What should I post?”
              </p>

            </div>

            <div className="bg-[#F4B400] p-8 sm:p-10">

              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
                Start asking
              </div>

              <p className="mt-8 text-3xl font-black">
                “Why would someone care about this?”
              </p>

            </div>

          </div>

          <div className="mt-10 text-center">

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
          OFFER / CTA
      ========================================================= */}
      <section className="bg-[#F4B400] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-5xl text-center">

          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">
            The Psychology Behind Writing
          </div>

          <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
            2-HOUR LIVE WEBINAR
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold">
            Attention • Relevance • Emotion • Communication • Brand Memory
          </p>

          <div className="mt-10">

            <div className="text-sm font-bold line-through opacity-50">
              ₹999
            </div>

            <div className="mt-1 text-7xl font-black tracking-[-0.06em]">
              ₹99
            </div>

          </div>

          <div className="mt-8 text-sm font-black uppercase tracking-[0.12em]">
            06 September 2026 • 11 AM IST
          </div>

          <Link
            href={registerUrl}
            className="mt-10 inline-flex items-center justify-center bg-[#171717] px-10 py-5 text-sm font-black uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#171717]"
          >
            YES — I WANT TO LEARN THIS →
          </Link>

          <p className="mt-6 text-sm font-medium text-black/60">
            2 hours. One new way of looking at the content you create.
          </p>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-center text-white sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-4xl">

          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
            One last question
          </div>

          <h2 className="mt-6 text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] sm:text-6xl">
            You can keep asking:
          </h2>

          <p className="mt-8 text-3xl font-black text-white/40 sm:text-5xl">
            “What should I post?”
          </p>

          <p className="mt-10 text-xl font-bold text-white/60">
            Or start asking:
          </p>

          <p className="mt-3 text-4xl font-black text-[#F4B400] sm:text-6xl">
            “How do I make what I say matter?”
          </p>

          <Link
            href={registerUrl}
            className="mt-12 inline-flex items-center justify-center bg-[#F4B400] px-9 py-5 text-sm font-black uppercase tracking-[0.05em] text-[#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            RESERVE MY SEAT — ₹99 →
          </Link>

        </div>
      </section>


      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-4xl">

          <div className="mb-12">

            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F4B400]">
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
                  >

                    <span className="text-lg font-black">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center border border-black/20 text-xl transition-transform duration-300 ${
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

                      <p className="max-w-3xl pr-10 text-base leading-relaxed text-black/60">
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
          FOOTER
      ========================================================= */}
      <footer className="border-t border-black/10 bg-[#F8F6F0] px-5 py-8 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-black/40 sm:flex-row sm:items-center sm:justify-between">

          <span>
            The Psychology Behind Writing
          </span>

          <span>
            Puneet Kaur Saluja • 06 September 2026 • 11 AM IST
          </span>

        </div>

      </footer>

    </main>
  );
}
