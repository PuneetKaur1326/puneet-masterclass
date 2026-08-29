'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PsychologyBehindWritingPage() {
  const webinarPoints = [
    {
      number: '01',
      title: 'ATTENTION',
      text: 'What makes someone stop scrolling instead of moving on to the next post?',
    },
    {
      number: '02',
      title: 'CURIOSITY',
      text: 'Why do some messages make us want to know more?',
    },
    {
      number: '03',
      title: 'RELEVANCE',
      text: 'Why does the same message grab one person and mean nothing to another?',
    },
    {
      number: '04',
      title: 'EMOTION',
      text: 'How do existing thoughts and feelings influence what people notice?',
    },
    {
      number: '05',
      title: 'MEMORY',
      text: 'Why do some messages stay with us while others disappear immediately?',
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
        'Not in the traditional sense. This webinar focuses on the psychology behind communication — especially what makes content get noticed, remembered and processed.',
    },
    {
      question: 'Do I need to be a professional writer?',
      answer:
        'No. If you create content for your personal brand, business, practice or services, you can benefit from the concepts covered.',
    },
    {
      question: 'Is this an Instagram growth webinar?',
      answer:
        'No. This is not about algorithm hacks, viral formulas or posting frequency. It is about understanding what makes people notice your communication.',
    },
    {
      question: 'I already use AI to create content. Is this relevant?',
      answer:
        'Yes. AI can generate captions, hooks, scripts and ideas. But you still need to understand what deserves attention and why.',
    },
    {
      question: 'Is the webinar live?',
      answer:
        'Yes. It is a 2-hour LIVE webinar on 06 September 2026 at 11 AM IST.',
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6EF] text-[#171717]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative border-b border-black/10">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#F4B400]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-16">

          <div className="mb-10 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4B400]" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em]">
              THE PSYCHOLOGY BEHIND WRITING
            </span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">

            {/* HERO COPY */}
            <div>
              <h1 className="text-[clamp(3.5rem,8vw,7.8rem)] font-black leading-[0.8] tracking-[-0.075em]">
                WHY ISN&apos;T
                <br />
                ANYONE
                <br />
                <span className="text-[#F4B400]">NOTICING</span>
                <br />
                YOUR CONTENT?
              </h1>

              <p className="mt-8 max-w-2xl text-[clamp(1.3rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.03em]">
                Learn what makes people stop, pay attention and actually
                process a message — instead of scrolling past it.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'ATTENTION',
                  'CURIOSITY',
                  'RELEVANCE',
                  'EMOTION',
                  'MEMORY',
                ].map((item) => (
                  <span
                    key={item}
                    className="border border-black/15 bg-white/60 px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-5 bg-[#171717] px-7 py-4 text-xs font-black uppercase tracking-wide text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  I WANT PEOPLE TO NOTICE MY CONTENT
                  <span className="text-xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <div className="text-[10px] font-black uppercase tracking-[0.13em] text-black/45">
                  ₹99 • LIVE • 2 HOURS
                </div>
              </div>

              <div className="mt-6 flex gap-6 text-[10px] font-black uppercase tracking-[0.13em] text-black/40">
                <span>06 SEPTEMBER 2026</span>
                <span>11 AM IST</span>
              </div>
            </div>

            {/* HERO VIDEO */}
            <div className="relative">

              <div className="absolute -left-4 top-6 z-10 rotate-[-5deg] bg-[#F4B400] px-4 py-3 text-[9px] font-black uppercase tracking-[0.13em] shadow-lg">
                WATCH THIS FIRST
              </div>

              <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#171717] shadow-2xl">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/NoE0_t_EnAs"
                  title="The Psychology Behind Writing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.14em] text-black/35">
                <span>WATCH BEFORE YOU REGISTER</span>
                <span>THE PSYCHOLOGY BEHIND WRITING</span>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          PAIN
      ========================================================= */}
      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F4B400]">
                THE PROBLEM
              </span>

              <h2 className="mt-5 text-[clamp(3.2rem,6vw,6rem)] font-black leading-[0.83] tracking-[-0.07em]">
                You&apos;re
                <br />
                creating.
                <br />
                <span className="text-white/30">But are they</span>
                <br />
                noticing?
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg leading-8 text-white/60">
                You have ideas. You know your subject. You know you should
                post consistently.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  ['YOU CREATE', 'Reels. Posts. Carousels. Captions.'],
                  ['YOU PUBLISH', 'And wait for people to notice.'],
                  ['THEY SCROLL', 'Your message gets lost in the feed.'],
                  ['YOU WONDER', '“What am I doing wrong?”'],
                ].map(([title, text], index) => (
                  <div
                    key={title}
                    className={`min-h-[150px] p-6 ${
                      index === 2
                        ? 'bg-[#F4B400] text-black'
                        : 'border border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] opacity-40">
                      0{index + 1}
                    </span>

                    <p className="mt-7 text-sm font-black uppercase tracking-[0.08em]">
                      {title}
                    </p>

                    <p className="mt-2 text-sm leading-6 opacity-55">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-l-4 border-[#F4B400] pl-5">
                <p className="text-xl font-black leading-tight sm:text-2xl">
                  Maybe you don&apos;t need more content.
                </p>

                <p className="mt-2 text-xl font-black leading-tight text-[#F4B400] sm:text-2xl">
                  Maybe you need people to actually notice it.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          A/B PSYCHOLOGY
      ========================================================= */}
      <section className="bg-[#F4B400]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/50">
              EXPERIENCE IT YOURSELF
            </span>

            <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.84] tracking-[-0.07em]">
              Which one
              <br />
              makes you
              <br />
              <span className="text-white">stop?</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">

            <div className="relative min-h-[290px] rounded-[1.5rem] border-2 border-black/15 bg-[#F8F6EF] p-7 sm:p-10">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                A
              </span>

              <p className="mt-12 max-w-md text-3xl font-black leading-[0.95] tracking-[-0.05em] sm:text-4xl">
                5 Content Writing Tips Every Business Owner Should Know
              </p>

              <span className="absolute bottom-7 right-7 text-[9px] font-black uppercase tracking-[0.15em] text-black/30">
                INFORMATION
              </span>
            </div>

            <div className="relative min-h-[290px] rounded-[1.5rem] bg-[#171717] p-7 text-white shadow-2xl sm:p-10">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F4B400] text-xs font-black text-black">
                B
              </span>

              <p className="mt-12 max-w-md text-3xl font-black leading-[0.95] tracking-[-0.05em] sm:text-4xl">
                Your content isn&apos;t boring.
                <br />
                <span className="text-[#F4B400]">
                  Your audience just has no reason to notice it.
                </span>
              </p>

              <span className="absolute bottom-7 right-7 text-[9px] font-black uppercase tracking-[0.15em] text-white/30">
                ATTENTION
              </span>
            </div>

          </div>

          <div className="mx-auto mt-14 max-w-2xl text-center">
            <p className="text-lg font-bold text-black/65">
              If you paused at B, ask yourself why.
            </p>

            <p className="mt-4 text-2xl font-black leading-tight tracking-[-0.03em]">
              The information didn&apos;t suddenly become more valuable.
            </p>

            <p className="mt-2 text-2xl font-black leading-tight tracking-[-0.03em]">
              The message simply gave you a stronger reason to pay attention.
            </p>

            <div className="mx-auto mt-8 h-1 w-16 bg-black" />

            <p className="mt-8 text-2xl font-black uppercase tracking-[-0.04em] sm:text-3xl">
              That&apos;s psychology.
            </p>
          </div>

        </div>
      </section>


      {/* =========================================================
          SCROLL TO STOP
      ========================================================= */}
      <section className="bg-[#EDE9DE]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
              THE FIRST JOB OF YOUR CONTENT
            </span>

            <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(3.2rem,7vw,7rem)] font-black leading-[0.82] tracking-[-0.075em]">
              BEFORE ENGAGEMENT,
              <br />
              BEFORE FOLLOWERS,
              <br />
              BEFORE SALES...
            </h2>

            <p className="mt-8 text-xl font-black sm:text-2xl">
              Your content has to get through one simple barrier.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-2 sm:grid-cols-4">
              {[
                ['01', 'SCROLL', 'They see hundreds of messages.'],
                ['02', 'STOP', 'Something earns their attention.'],
                ['03', 'NOTICE', 'They actually process your message.'],
                ['04', 'REMEMBER', 'Your brand has a chance to stay.'],
              ].map(([number, title, text], index) => (
                <div
                  key={number}
                  className={`relative min-h-[190px] p-6 ${
                    index === 1
                      ? 'bg-[#F4B400]'
                      : 'border border-black/10 bg-white'
                  }`}
                >
                  <span className="text-[9px] font-black opacity-40">
                    {number}
                  </span>

                  <p className="mt-10 text-xl font-black tracking-[-0.03em]">
                    {title}
                  </p>

                  <p className="mt-3 text-xs leading-5 opacity-50">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-none tracking-[-0.06em]">
                <span className="text-black/30">SCROLL</span>
                <span className="mx-3 text-[#F4B400]">→</span>
                <span>STOP</span>
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          WHAT THEY LEARN
      ========================================================= */}
      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F4B400]">
                INSIDE THE WEBINAR
              </span>

              <h2 className="mt-5 text-[clamp(3.2rem,6vw,6rem)] font-black leading-[0.83] tracking-[-0.07em]">
                Understand why
                <br />
                people notice
                <br />
                <span className="text-white/30">some messages.</span>
              </h2>
            </div>

            <div className="text-right text-[10px] font-black uppercase tracking-[0.15em] text-white/30">
              LIVE
              <br />
              2 HOURS
            </div>
          </div>

          <div className="mt-12 divide-y divide-white/10">
            {webinarPoints.map((item) => (
              <div
                key={item.number}
                className="grid gap-5 py-8 md:grid-cols-[70px_250px_1fr] md:items-center"
              >
                <span className="text-xs font-black text-[#F4B400]">
                  {item.number}
                </span>

                <h3 className="text-xl font-black tracking-[-0.03em]">
                  {item.title}
                </h3>

                <p className="max-w-xl text-sm leading-6 text-white/45">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================
          AI
      ========================================================= */}
      <section className="bg-[#F8F6EF]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
                WHY THIS MATTERS NOW
              </span>

              <h2 className="mt-5 text-[clamp(3.2rem,6vw,6.2rem)] font-black leading-[0.82] tracking-[-0.075em]">
                AI can create
                <br />
                your content.
                <br />
                <span className="text-[#F4B400]">But who makes</span>
                <br />
                people notice?
              </h2>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-3">
                {['CAPTIONS', 'HOOKS', 'SCRIPTS', 'IDEAS'].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[105px] items-end bg-white p-5"
                  >
                    <span className="text-lg font-black">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm leading-7 text-black/50">
                AI can generate these in seconds.
              </p>

              <div className="my-7 h-px bg-black/10" />

              <p className="text-[10px] font-black uppercase tracking-[0.15em]">
                But someone still has to decide:
              </p>

              <div className="mt-5 space-y-3">
                {[
                  'What deserves attention?',
                  'Why would someone care?',
                  'What makes this relevant?',
                  'What will they remember?',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-black/10 pb-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#F4B400]" />
                    <span className="text-lg font-black">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          ABOUT PUNEET
      ========================================================= */}
      <section className="bg-[#EDE9DE]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">

            {/* PUNEET IMAGE */}
            <div className="relative">

              <div className="relative aspect-[4/5] overflow-hidden bg-[#171717]">

                <Image
                  src="/IMG_0161.JPG.jpeg"
                  alt="Puneet Kaur Saluja"
                  fill
                  priority
                  className="object-cover object-[50%_35%]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

              </div>

              <div className="absolute -bottom-5 -right-3 bg-[#F4B400] px-5 py-4 shadow-xl">
                <span className="block text-[9px] font-black uppercase tracking-[0.15em]">
                  EXPERIENCE
                </span>

                <strong className="mt-1 block text-3xl font-black">
                  9 YEARS
                </strong>
              </div>

            </div>


            {/* COPY */}
            <div className="flex flex-col justify-center">

              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
                ABOUT PUNEET
              </span>

              <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-black leading-[0.83] tracking-[-0.07em]">
                I&apos;ve spent
                <br />
                9 years
                <br />
                asking one
                <br />
                <span className="text-[#F4B400]">question.</span>
              </h2>

              <p className="mt-8 text-[clamp(1.5rem,3vw,2.3rem)] font-black leading-[0.98] tracking-[-0.04em]">
                Why does one message get noticed...
                <br />
                while another disappears?
              </p>

              <p className="mt-8 max-w-xl text-sm leading-7 text-black/55">
                My journey started with a{' '}
                <strong>₹500 writing project</strong>. Since then, I&apos;ve
                worked across writing, freelancing, advertising, strategy,
                consumer insights and brand communication.
              </p>

              <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                <p className="text-lg font-black">
                  Writing isn&apos;t just about putting words together.
                </p>

                <p className="mt-2 text-lg font-black text-black/40">
                  It&apos;s about understanding the person reading them.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          AUDIENCE
      ========================================================= */}
      <section className="bg-[#F4B400]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">

            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
                WHO IS THIS FOR?
              </span>

              <h2 className="mt-5 text-[clamp(3.2rem,6vw,6rem)] font-black leading-[0.83] tracking-[-0.07em]">
                If you use
                <br />
                content to
                <br />
                <span className="text-white">build something.</span>
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-lg font-bold leading-7 text-black/60">
                This is for you if you know your subject but struggle to get
                your audience to stop and pay attention.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {audience.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[90px] items-end bg-[#F8F6EF] p-5"
                  >
                    <p className="text-sm font-black">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-2">
                {[
                  '“People aren’t even stopping to look.”',
                  '“My content feels invisible.”',
                  '“I don’t know why some posts work and mine don’t.”',
                ].map((item) => (
                  <p
                    key={item}
                    className="text-base font-black sm:text-lg"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          OFFER
      ========================================================= */}
      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

          <div className="overflow-hidden bg-[#F4B400] text-black">

            <div className="grid lg:grid-cols-[1fr_330px]">

              <div className="p-8 sm:p-12 lg:p-16">

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
                  YOUR NEXT 2 HOURS
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

                <p className="mt-8 max-w-xl text-lg font-bold leading-7 text-black/60">
                  Understand what makes people stop, pay attention and process
                  your message.
                </p>

              </div>

              <div className="flex flex-col justify-between bg-white p-8 sm:p-10">

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-black/40">
                    LIVE WEBINAR
                  </p>

                  <div className="mt-8 space-y-5">

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                        DATE
                      </p>
                      <p className="mt-1 text-base font-black">
                        06 SEPTEMBER 2026
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                        TIME
                      </p>
                      <p className="mt-1 text-base font-black">
                        11 AM IST
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                        DURATION
                      </p>
                      <p className="mt-1 text-base font-black">
                        2 HOURS
                      </p>
                    </div>

                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
                    ENTRY
                  </p>

                  <p className="mt-1 text-6xl font-black tracking-[-0.08em]">
                    ₹99
                  </p>

                  <Link
                    href="/register"
                    className="mt-6 flex w-full items-center justify-between bg-[#171717] px-5 py-4 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-black"
                  >
                    RESERVE MY SEAT
                    <span className="text-xl">→</span>
                  </Link>
                </div>

              </div>

            </div>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-white/35">
            One small investment. Two hours. A completely different way of
            looking at your content.
          </p>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#F8F6EF]">
        <div className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-8 lg:py-36">

          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
            ONE LAST QUESTION
          </span>

          <h2 className="mt-7 text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.8] tracking-[-0.08em]">
            BEFORE THEY
            <br />
            CAN ENGAGE,
            <br />
            <span className="text-[#F4B400]">THEY HAVE TO NOTICE.</span>
          </h2>

          <p className="mx-auto mt-9 max-w-2xl text-lg leading-7 text-black/50">
            Stop creating content just to fill your feed.
            <br />
            Start understanding what makes people stop.
          </p>

          <Link
            href="/register"
            className="mt-10 inline-flex items-center gap-5 bg-[#171717] px-8 py-5 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-1 hover:shadow-xl"
          >
            I WANT PEOPLE TO NOTICE MY CONTENT
            <span className="text-xl">→</span>
          </Link>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] font-black uppercase tracking-[0.15em] text-black/35">
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

            <h2 className="mt-5 text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.84] tracking-[-0.07em]">
              Before you
              <br />
              <span className="text-white/30">join.</span>
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

                  <span className="text-2xl font-normal text-white/35 transition-transform group-open:rotate-45">
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
  );
}
