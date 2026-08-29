'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PsychologyBehindWritingPage() {
  const learningPoints = [
    {
      number: '01',
      title: 'WHY PEOPLE STOP',
      question: 'What makes someone pause instead of scroll?',
    },
    {
      number: '02',
      title: 'WHY CONTENT FEELS RELEVANT',
      question: 'How do you communicate what your audience is actually ready to hear?',
    },
    {
      number: '03',
      title: 'WHY EMOTION MATTERS',
      question: 'How do what people think and feel influence how they respond?',
    },
    {
      number: '04',
      title: 'WHY SOME BRANDS ARE REMEMBERED',
      question: 'How does communication create familiarity, recognition and memory?',
    },
  ];

  const audience = [
    'Coaches',
    'Creators',
    'Consultants',
    'Service Providers',
    'Tarot Readers',
    'Business Owners',
  ];

  const faqs = [
    {
      question: 'Is this a writing workshop?',
      answer:
        "Not in the traditional sense. It's about the psychology behind communication, attention, relevance and brand memory.",
    },
    {
      question: 'Do I need to be a professional writer?',
      answer:
        'No. If you use content to build a brand, business or practice, this is for you.',
    },
    {
      question: 'Is this an Instagram growth webinar?',
      answer:
        "No. There are no algorithm hacks, viral formulas or posting schedules.",
    },
    {
      question: 'I already use AI for content. Is this relevant?',
      answer:
        'Yes. AI can create the words. You still need to know what those words should communicate and why.',
    },
    {
      question: 'Is it live?',
      answer:
        "Yes. It's a 2-hour live webinar on 06 September at 11 AM IST.",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-[#F8F6EF] text-[#171717]">

        {/* =========================================================
            HERO
        ========================================================= */}
        <section className="relative border-b border-black/10">
          <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">

            <div className="mb-8 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F4B400]" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em]">
                2-HOUR LIVE WEBINAR
              </span>
            </div>

            <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_.75fr]">

              <div>
                <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-black/45">
                  THE PSYCHOLOGY BEHIND WRITING
                </p>

                <h1 className="max-w-5xl text-[clamp(3.7rem,9vw,8.5rem)] font-black leading-[0.79] tracking-[-0.075em]">
                  YOUR CONTENT
                  <br />
                  DOESN&apos;T NEED
                  <br />
                  <span className="text-[#F4B400]">MORE IDEAS.</span>
                </h1>

                <div className="mt-8 max-w-3xl">
                  <p className="text-[clamp(2rem,4vw,4rem)] font-black leading-[0.95] tracking-[-0.05em]">
                    It needs to make
                    <br />
                    <span className="relative inline-block">
                      people care.
                      <span className="absolute -bottom-2 left-0 h-2 w-full bg-[#F4B400]" />
                    </span>
                  </p>
                </div>
              </div>

              {/* Hero visual */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#171717] p-7 text-white shadow-2xl sm:p-9">

                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/45">
                      THE QUESTION
                    </span>

                    <span className="rounded-full bg-[#F4B400] px-3 py-1 text-[9px] font-black text-black">
                      ₹99
                    </span>
                  </div>

                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/45">
                    Your next post:
                  </p>

                  <p className="mt-3 text-3xl font-black leading-none tracking-[-0.05em] sm:text-4xl">
                    What should
                    <br />
                    I post?
                  </p>

                  <div className="my-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/15" />
                    <span className="text-xs text-[#F4B400]">OR</span>
                    <div className="h-px flex-1 bg-white/15" />
                  </div>

                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/45">
                    A better question:
                  </p>

                  <p className="mt-3 text-3xl font-black leading-none tracking-[-0.05em] text-[#F4B400] sm:text-4xl">
                    Why should
                    <br />
                    they care?
                  </p>

                  <div className="mt-10 border-t border-white/10 pt-5">
                    <p className="text-xs leading-relaxed text-white/50">
                      That shift is what this webinar is about.
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-4 hidden rotate-[-4deg] bg-[#F4B400] px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] shadow-xl sm:block">
                  STOP → CONNECT → REMEMBER
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-7 border-t border-black/10 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-2xl text-base leading-7 text-black/60 sm:text-lg">
                A 2-hour LIVE webinar for people who want to use content to
                build trust, attract clients and grow their business.
              </p>

              <div className="flex flex-col items-start gap-3 sm:items-end">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-5 bg-[#171717] px-7 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-1"
                >
                  I WANT MY CONTENT TO MAKE PEOPLE CARE
                  <span className="text-xl transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <div className="flex gap-5 text-[10px] font-black uppercase tracking-[0.12em] text-black/45">
                  <span>06 SEPTEMBER 2026</span>
                  <span>11 AM IST</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PAIN
        ========================================================= */}
        <section className="bg-[#171717] text-white">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">

              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F4B400]">
                  THE REAL PROBLEM
                </span>

                <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.86] tracking-[-0.065em]">
                  You probably
                  <br />
                  don&apos;t have a
                  <br />
                  <span className="text-white/35">content problem.</span>
                </h2>
              </div>

              <div className="flex flex-col justify-end">

                <div className="space-y-1 text-xl font-bold sm:text-2xl">
                  <p>You have ideas.</p>
                  <p>You know your subject.</p>
                  <p>You know you should post consistently.</p>
                </div>

                <div className="my-9 h-px bg-white/10" />

                <p className="text-sm leading-7 text-white/50">
                  And yet...
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {['You publish.', 'Someone likes.', 'Someone comments.', 'Then... nothing.'].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`min-h-[100px] p-4 ${
                          index === 3
                            ? 'bg-[#F4B400] text-black'
                            : 'border border-white/10 bg-white/[0.03]'
                        }`}
                      >
                        <span className="text-[9px] font-black uppercase tracking-wider opacity-50">
                          0{index + 1}
                        </span>
                        <p className="mt-5 text-sm font-black leading-tight">
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-10">
                  <p className="text-sm uppercase tracking-[0.15em] text-white/40">
                    So you ask:
                  </p>

                  <p className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                    “What should I post today?”
                  </p>

                  <p className="mt-7 text-sm text-white/40">
                    But maybe the better question is:
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#F4B400] sm:text-4xl">
                    “Why should my audience care?”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            A/B EXPERIMENT
        ========================================================= */}
        <section className="bg-[#F4B400]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/55">
                LET&apos;S TEST SOMETHING
              </p>

              <h2 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.86] tracking-[-0.065em]">
                Which one makes
                <br />
                you stop?
              </h2>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2">

              {/* A */}
              <div className="relative min-h-[300px] rounded-[1.5rem] border-2 border-black/15 bg-[#F8F6EF] p-7 sm:p-10">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                  A
                </span>

                <p className="mt-12 max-w-md text-3xl font-black leading-[0.98] tracking-[-0.05em] sm:text-4xl">
                  5 Content Writing Tips Every Business Owner Should Know
                </p>

                <span className="absolute bottom-7 right-7 text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                  INFORMATION
                </span>
              </div>

              {/* B */}
              <div className="relative min-h-[300px] rounded-[1.5rem] bg-[#171717] p-7 text-white shadow-2xl sm:p-10">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F4B400] text-xs font-black text-black">
                  B
                </span>

                <p className="mt-12 max-w-md text-3xl font-black leading-[0.98] tracking-[-0.05em] sm:text-4xl">
                  Your content isn&apos;t boring.
                  <br />
                  <span className="text-[#F4B400]">
                    Your audience just has no reason to care.
                  </span>
                </p>

                <span className="absolute bottom-7 right-7 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                  ATTENTION
                </span>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-3xl text-center">
              <p className="text-base leading-7 text-black/65 sm:text-lg">
                If you paused at <strong>B</strong>, ask yourself why.
              </p>

              <p className="mt-4 text-xl font-black leading-tight sm:text-2xl">
                The information didn&apos;t suddenly become more valuable.
              </p>

              <p className="mt-2 text-xl font-black leading-tight sm:text-2xl">
                The message simply gave you a stronger reason to pay attention.
              </p>

              <div className="mx-auto mt-8 h-1 w-16 bg-black" />

              <p className="mt-8 text-[clamp(1.7rem,4vw,3rem)] font-black leading-[0.95] tracking-[-0.05em]">
                CONTENT ≠ COMMUNICATION
              </p>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-black/55">
                More content doesn&apos;t automatically create more impact.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            AI
        ========================================================= */}
        <section className="bg-[#F8F6EF]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">

              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
                  WHY THIS MATTERS NOW
                </span>

                <h2 className="mt-5 text-[clamp(3.2rem,6vw,6.5rem)] font-black leading-[0.82] tracking-[-0.07em]">
                  AI can write
                  <br />
                  your content.
                  <br />
                  <span className="text-[#F4B400]">But can it</span>
                  <br />
                  <span className="text-black/30">make people care?</span>
                </h2>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3">
                  {['Captions', 'Hooks', 'Scripts', 'Ideas'].map((item) => (
                    <div
                      key={item}
                      className="flex min-h-[100px] items-end border border-black/10 bg-white p-5"
                    >
                      <span className="text-lg font-black">{item}.</span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm leading-7 text-black/55">
                  AI can generate all of these in seconds.
                </p>

                <div className="my-7 h-px bg-black/10" />

                <p className="text-sm font-black uppercase tracking-[0.12em]">
                  But someone still has to answer:
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    'What should I say?',
                    'Why should I say it?',
                    'What should my audience feel?',
                    'What should they remember?',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 border-b border-black/10 pb-3"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#F4B400]" />
                      <span className="text-lg font-black tracking-[-0.02em]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-2xl font-black tracking-[-0.04em]">
                  That&apos;s where the real skill lies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHAT YOU'LL LEARN
        ========================================================= */}
        <section className="bg-[#171717] text-white">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-10 md:flex-row md:items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F4B400]">
                  INSIDE THE WEBINAR
                </span>

                <h2 className="mt-5 text-[clamp(3.2rem,6vw,6.5rem)] font-black leading-[0.82] tracking-[-0.07em]">
                  You&apos;ll stop
                  <br />
                  looking at
                  <br />
                  <span className="text-white/35">content the same way.</span>
                </h2>
              </div>

              <div className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-white/35">
                LIVE
                <br />
                2 HOURS
              </div>
            </div>

            <div className="mt-10 divide-y divide-white/10">
              {learningPoints.map((item) => (
                <div
                  key={item.number}
                  className="grid gap-6 py-9 md:grid-cols-[80px_1fr_1fr] md:items-center"
                >
                  <span className="text-xs font-black text-[#F4B400]">
                    {item.number}
                  </span>

                  <h3 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-6 text-white/45">
                    {item.question}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-4 bg-[#F4B400] px-7 py-4 text-xs font-black uppercase tracking-wide text-black transition hover:-translate-y-1"
              >
                RESERVE MY SEAT — ₹99
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            SAME MESSAGE / COMMUNICATION
        ========================================================= */}
        <section className="bg-[#EDE9DE]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <div className="max-w-4xl">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
                SAME SUBJECT. DIFFERENT COMMUNICATION.
              </span>

              <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.84] tracking-[-0.07em]">
                The words matter.
                <br />
                <span className="text-black/30">But so does the way</span>
                <br />
                you enter the mind.
              </h2>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2">

              <div className="border border-black/10 bg-white p-7 sm:p-10">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-black/35">
                  GENERIC
                </span>

                <p className="mt-10 text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl">
                  “I help businesses grow through strategic content.”
                </p>

                <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                    Clear
                  </span>

                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                    Forgettable?
                  </span>
                </div>
              </div>

              <div className="border-2 border-[#F4B400] bg-[#171717] p-7 text-white sm:p-10">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#F4B400]">
                  ANOTHER WAY
                </span>

                <p className="mt-10 text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl">
                  “You&apos;re not struggling to create content.
                  <br />
                  <span className="text-[#F4B400]">
                    You&apos;re struggling to make people care about it.”
                  </span>
                </p>

                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                    Different entry point
                  </span>

                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#F4B400]">
                    Why?
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-2xl text-center">
              <p className="text-lg font-black leading-tight sm:text-xl">
                That&apos;s the kind of thinking we&apos;ll unpack during the webinar.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            PUNEET
        ========================================================= */}
        <section className="bg-[#F8F6EF]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">

              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-[#171717]">
                  <div className="flex h-full flex-col justify-between p-7 text-white sm:p-10">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
                      PUNEET KAUR SALUJA
                    </span>

                    <div>
                      <p className="text-[clamp(4rem,7vw,7rem)] font-black leading-[0.8] tracking-[-0.08em]">
                        9
                      </p>

                      <p className="mt-2 text-xl font-black uppercase tracking-[-0.02em]">
                        YEARS
                      </p>

                      <div className="mt-5 h-1 w-14 bg-[#F4B400]" />

                      <p className="mt-5 max-w-xs text-sm leading-6 text-white/50">
                        Writing • Advertising • Strategy • Consumer Insights •
                        Brand Communication
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-5 -right-3 bg-[#F4B400] px-5 py-4 shadow-xl">
                  <span className="block text-[9px] font-black uppercase tracking-[0.15em]">
                    FIRST PAID PROJECT
                  </span>
                  <strong className="mt-1 block text-2xl font-black">
                    ₹500
                  </strong>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
                  WHY LEARN FROM PUNEET?
                </span>

                <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.83] tracking-[-0.07em]">
                  I&apos;ve spent 9 years
                  <br />
                  trying to answer
                  <br />
                  <span className="text-[#F4B400]">one question.</span>
                </h2>

                <p className="mt-9 text-[clamp(1.5rem,3vw,2.4rem)] font-black leading-[0.98] tracking-[-0.04em]">
                  Why does one message make people stop...
                  <br />
                  while another dies after one scroll?
                </p>

                <p className="mt-8 max-w-2xl text-sm leading-7 text-black/55">
                  My journey started with a ₹500 writing project. Since then,
                  I&apos;ve worked across writing, freelancing, advertising,
                  strategy, consumer insights and brand communication.
                </p>

                <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                  <p className="text-lg font-black leading-tight">
                    Writing isn&apos;t just about putting words together.
                  </p>

                  <p className="mt-2 text-lg font-black leading-tight text-black/45">
                    It&apos;s about understanding the person reading them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHO IT'S FOR
        ========================================================= */}
        <section className="bg-[#F4B400]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/50">
                  THIS IS FOR YOU IF...
                </span>

                <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.82] tracking-[-0.07em]">
                  You use
                  <br />
                  content to
                  <br />
                  <span className="text-white">build something.</span>
                </h2>
              </div>

              <div>
                <p className="max-w-xl text-lg font-bold leading-7 text-black/65">
                  If you&apos;ve ever thought any of these, you&apos;ll understand
                  why this webinar exists:
                </p>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {[
                    'I’m posting consistently but nothing is happening.',
                    'People engage, but don’t enquire.',
                    'My content sounds like everyone else’s.',
                    'I know what I want to say, but I don’t know how to say it.',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex min-h-[120px] items-end bg-[#F8F6EF] p-5"
                    >
                      <p className="text-sm font-black leading-tight">
                        “{item}”
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {audience.map((item) => (
                    <span
                      key={item}
                      className="border border-black/20 bg-black/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-9 text-xl font-black leading-tight sm:text-2xl">
                  You don&apos;t need another content calendar.
                  <br />
                  <span className="text-white">
                    You need to understand your audience better.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SHIFT
        ========================================================= */}
        <section className="bg-[#171717] text-white">
          <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 lg:py-32">

            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F4B400]">
                THE REAL SHIFT
              </span>

              <h2 className="mt-5 text-[clamp(3rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.075em]">
                FROM CREATING
                <br />
                <span className="text-white/30">CONTENT</span>
                <br />
                TO CREATING
                <br />
                <span className="text-[#F4B400]">COMMUNICATION.</span>
              </h2>
            </div>

            <div className="mx-auto mt-16 max-w-3xl">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-white/10 p-7">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                    BEFORE
                  </span>
                  <p className="mt-5 text-xl font-black">
                    “What should I post?”
                  </p>
                </div>

                <div className="border border-[#F4B400] bg-[#F4B400] p-7 text-black">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-black/50">
                    AFTER
                  </span>
                  <p className="mt-5 text-xl font-black">
                    “Why would someone care about this?”
                  </p>
                </div>

                <div className="border border-white/10 p-7">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                    BEFORE
                  </span>
                  <p className="mt-5 text-xl font-black">
                    “What information should I give?”
                  </p>
                </div>

                <div className="border border-white/10 p-7">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                    AFTER
                  </span>
                  <p className="mt-5 text-xl font-black">
                    “What should they think, feel or remember?”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            OFFER
        ========================================================= */}
        <section className="bg-[#F8F6EF]">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

            <div className="overflow-hidden bg-[#F4B400]">

              <div className="grid lg:grid-cols-[1fr_auto]">

                <div className="p-8 sm:p-12 lg:p-16">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/50">
                    THE WEBINAR
                  </span>

                  <h2 className="mt-6 text-[clamp(3.2rem,6vw,6.5rem)] font-black leading-[0.8] tracking-[-0.075em]">
                    THE
                    <br />
                    PSYCHOLOGY
                    <br />
                    BEHIND
                    <br />
                    <span className="text-white">WRITING.</span>
                  </h2>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {[
                      'Attention',
                      'Relevance',
                      'Emotion',
                      'Communication',
                      'Brand Memory',
                    ].map((item) => (
                      <span
                        key={item}
                        className="border border-black/15 bg-black/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex min-w-[280px] flex-col justify-between bg-[#171717] p-8 text-white sm:p-12 lg:min-w-[330px]">

                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/40">
                      LIVE WEBINAR
                    </span>

                    <div className="mt-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                        DATE
                      </p>
                      <p className="mt-2 text-lg font-black">
                        06 SEPTEMBER 2026
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                        TIME
                      </p>
                      <p className="mt-2 text-lg font-black">
                        11 AM IST
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                        DURATION
                      </p>
                      <p className="mt-2 text-lg font-black">
                        2 HOURS
                      </p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                      ENTRY
                    </p>

                    <p className="mt-1 text-6xl font-black tracking-[-0.07em] text-[#F4B400]">
                      ₹99
                    </p>

                    <Link
                      href="/register"
                      className="mt-7 flex w-full items-center justify-between bg-[#F4B400] px-5 py-4 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-white"
                    >
                      RESERVE MY SEAT
                      <span className="text-xl">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-7 max-w-xl text-center text-sm leading-6 text-black/45">
              2 hours. One new way of looking at the content you create.
            </p>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================= */}
        <section className="relative bg-[#EDE9DE]">
          <div className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-8 lg:py-36">

            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
              ONE LAST QUESTION
            </span>

            <h2 className="mt-7 text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.8] tracking-[-0.08em]">
              WHAT SHOULD
              <br />
              YOUR AUDIENCE
              <br />
              <span className="text-[#F4B400]">REMEMBER?</span>
            </h2>

            <p className="mx-auto mt-9 max-w-2xl text-lg leading-7 text-black/55">
              You can keep asking “What should I post?”
              <br />
              Or start asking:
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.05em]">
              “How do I make
              <br />
              <span className="text-black/35">what I say matter?”</span>
            </p>

            <Link
              href="/register"
              className="mt-12 inline-flex items-center gap-5 bg-[#171717] px-8 py-5 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-1"
            >
              YES — I WANT MY CONTENT TO MAKE PEOPLE CARE
              <span className="text-xl">→</span>
            </Link>

            <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[9px] font-black uppercase tracking-[0.15em] text-black/40">
              <span>06 SEPTEMBER 2026</span>
              <span>11 AM IST</span>
              <span>2 HOURS • LIVE</span>
              <span>₹99</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================= */}
        <section className="bg-[#171717] text-white">
          <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 lg:py-28">

            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F4B400]">
                FAQ
              </span>

              <h2 className="mt-5 text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.85] tracking-[-0.07em]">
                Before you
                <br />
                <span className="text-white/35">join.</span>
              </h2>
            </div>

            <div className="divide-y divide-white/10">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group py-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-black sm:text-lg">
                    <span>
                      <span className="mr-4 text-[9px] text-[#F4B400]">
                        0{index + 1}
                      </span>
                      {faq.question}
                    </span>

                    <span className="text-2xl font-normal text-white/40 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="max-w-2xl pt-5 pl-8 text-sm leading-7 text-white/45">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-14 border-t border-white/10 pt-10 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-4 bg-[#F4B400] px-7 py-4 text-xs font-black uppercase tracking-wide text-black transition hover:-translate-y-1"
              >
                RESERVE MY SEAT — ₹99
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
