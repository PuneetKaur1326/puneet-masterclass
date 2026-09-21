"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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


const quizQuestions = [
  {
    id: "attention",
    eyebrow: "01 • ATTENTION",
    question: "You have to promote a new skincare product. Which opening would you use?",
    options: [
      "5 Benefits of Using a Vitamin C Serum",
      "Your Skin Doesn't Need Another Serum.",
      "Here's Why Vitamin C Is Good For Your Skin",
      "New Vitamin C Serum — Now Available",
    ],
  },
  {
    id: "curiosity",
    eyebrow: "02 • CURIOSITY",
    question: "You're writing a post about a common mistake founders make with their ads. Which opening creates more reason to continue?",
    options: [
      "3 Common Mistakes Founders Make With Their Ads",
      "Your Ad Might Be Losing Money For A Reason You Haven't Checked.",
      "Are Your Ads Working?",
      "Here's How To Create Better Ads.",
    ],
  },
  {
    id: "relevance",
    eyebrow: "03 • RELEVANCE",
    question: "You're selling a productivity product. Which message feels more personally relevant?",
    options: [
      "Work Smarter With Our Productivity System.",
      "A Better Way To Organise Your Workday.",
      "You Open Your Laptop. Check WhatsApp. Check Email. It's 11:30 AM — And You Haven't Started Your Actual Work.",
      "Increase Your Productivity Every Day.",
    ],
  },
  {
    id: "emotion",
    eyebrow: "04 • EMOTION",
    question: "A brand wants people to buy an affordable ethnic-wear collection. Which message is more likely to create an emotional response?",
    options: [
      "Festive Collection Starting At ₹999.",
      "Beautiful Festive Wear At Affordable Prices.",
      "Why wear the same outfit to every Diwali party?",
      "Shop Our New Festive Collection.",
    ],
  },
  {
    id: "memory",
    eyebrow: "05 • MEMORY",
    question: "You have two ways to end a brand post. Which one are you more likely to remember later?",
    options: [
      "Shop Now & Experience The Collection.",
      "One outfit. One occasion. One more reason to dress up.",
      "Discover Our Latest Collection Today.",
      "Shop The Collection Before It's Gone.",
    ],
  },
];

const resultProfiles = {
  attention: {
    title: "ATTENTION",
    diagnosis: "Your content may be useful — but it isn't always giving people a reason to stop.",
    need: "Learn how to make people pay attention before you give them information.",
  },
  curiosity: {
    title: "CURIOSITY",
    diagnosis: "Your content tells people what they need to know — but doesn't always make them want to know more.",
    need: "Learn how to create curiosity without relying on clickbait.",
  },
  relevance: {
    title: "RELEVANCE",
    diagnosis: "Your content may make sense, but your audience needs to feel that it is meant for them.",
    need: "Learn how to make your message feel personally relevant.",
  },
  emotion: {
    title: "EMOTION",
    diagnosis: "Your content communicates information — but information alone doesn't always create action.",
    need: "Learn how emotion influences the way people respond to a message.",
  },
  memory: {
    title: "MEMORY",
    diagnosis: "People may consume your content and still forget it five minutes later.",
    need: "Learn what makes a message stick.",
  },
};

export default function PsychologyBehindWritingPage() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    phone: "",
    email: "",
    occupation: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentQuestion = quizQuestions[quizStep];
  const selectedAnswer = quizAnswers[currentQuestion.id];

  const resultKey = useMemo(() => {
    if (!quizComplete) return "attention" as keyof typeof resultProfiles;

    // The first question most directly identifies the respondent's strongest
    // attention preference; the remaining answers provide supporting signals.
    const scores: Record<keyof typeof resultProfiles, number> = {
      attention: 0,
      curiosity: 0,
      relevance: 0,
      emotion: 0,
      memory: 0,
    };

    quizQuestions.forEach((question, questionIndex) => {
      const answer = quizAnswers[question.id];
      if (answer === undefined) return;
      scores[question.id as keyof typeof resultProfiles] += 4 - answer;
      if (questionIndex !== answer) {
        scores[question.id as keyof typeof resultProfiles] += 0;
      }
    });

    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof resultProfiles;
  }, [quizAnswers, quizComplete]);

  const handleQuizAnswer = (answerIndex: number) => {
    setQuizAnswers((current) => ({
      ...current,
      [currentQuestion.id]: answerIndex,
    }));

    if (quizStep < quizQuestions.length - 1) {
      window.setTimeout(() => setQuizStep((current) => current + 1), 180);
    } else {
      window.setTimeout(() => setQuizComplete(true), 180);
    }
  };

  const handleLeadSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6F0] text-[#171717]">

      {/* =========================================================
          NAV / TOP BAR
      ========================================================= */}
      <header className="border-b border-black/10 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#F4B400]" />
            <span className="text-xs font-black uppercase tracking-[0.18em] sm:text-sm">
              Puneet Kaur Saluja
            </span>
          </div>

          <div className="text-xs font-black uppercase tracking-[0.12em] text-black/40">
            The Psychology Behind Writing
          </div>
        </div>
      </header>
      {/* =========================================================
          QUIZ-FIRST JOURNEY
      ========================================================= */}
      <section className="px-5 pb-20 pt-14 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-4xl">
          {!quizComplete ? (
            <>
              <div className="text-center">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                  The Content Psychology Test
                </div>
                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  HOW STRONG IS YOUR
                  <br />
                  <span className="text-[#F4B400]">CONTENT UNDERSTANDING?</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-tight text-black/60 sm:text-xl">
                  Take this 60-second test before your next post goes live.
                </p>
              </div>

              <div className="mt-12 border border-black/10 bg-white p-6 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#F4B400]">
                    {currentQuestion.eyebrow}
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-black/35">
                    {quizStep + 1} / {quizQuestions.length}
                  </span>
                </div>

                <div className="mt-4 h-1 bg-black/5">
                  <div
                    className="h-full bg-[#F4B400] transition-all duration-300"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <h2 className="mt-10 max-w-3xl text-2xl font-black leading-tight tracking-[-0.03em] sm:text-3xl">
                  {currentQuestion.question}
                </h2>

                <div className="mt-8 grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleQuizAnswer(index)}
                      className={`flex items-start gap-4 border p-5 text-left transition-all duration-200 ${
                        selectedAnswer === index
                          ? "border-[#F4B400] bg-[#F4B400]"
                          : "border-black/10 bg-[#F8F6F0] hover:-translate-y-0.5 hover:border-black/30 hover:bg-white"
                      }`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-black/15 text-xs font-black">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-base font-bold leading-snug sm:text-lg">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.12em] text-black/30">
                  Go with your first instinct.
                </p>
              </div>
            </>
          ) : !leadSubmitted ? (
            <>
              <div className="text-center">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                  Test Complete
                </div>
                <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  YOUR RESULT
                  <br />
                  <span className="text-[#F4B400]">IS READY.</span>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg font-bold leading-tight text-black/60 sm:text-xl">
                  Enter your details to see your content psychology result.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="mx-auto mt-10 max-w-2xl border border-black/10 bg-white p-6 sm:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-black/45">Name</span>
                    <input required value={lead.name} onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} className="mt-2 w-full border border-black/15 bg-[#F8F6F0] px-4 py-4 text-base outline-none focus:border-[#F4B400]" placeholder="Your name" />
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-black/45">Phone</span>
                    <input required type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" value={lead.phone} onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value.replace(/\\D/g, "").slice(0, 10) }))} className="mt-2 w-full border border-black/15 bg-[#F8F6F0] px-4 py-4 text-base outline-none focus:border-[#F4B400]" placeholder="10-digit mobile" />
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-black/45">Email</span>
                    <input required type="email" value={lead.email} onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} className="mt-2 w-full border border-black/15 bg-[#F8F6F0] px-4 py-4 text-base outline-none focus:border-[#F4B400]" placeholder="you@example.com" />
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-black/45">Occupation</span>
                    <select required value={lead.occupation} onChange={(event) => setLead((current) => ({ ...current, occupation: event.target.value }))} className="mt-2 w-full border border-black/15 bg-[#F8F6F0] px-4 py-4 text-base outline-none focus:border-[#F4B400]">
                      <option value="">Select one</option>
                      <option>Founder / Business Owner</option>
                      <option>Content Creator</option>
                      <option>Marketer</option>
                      <option>Social Media Manager</option>
                      <option>Freelancer / Writer</option>
                      <option>Student</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>

                <button type="submit" className="mt-7 inline-flex w-full items-center justify-center bg-[#171717] px-8 py-5 text-sm font-black uppercase tracking-[0.05em] text-white transition hover:bg-[#F4B400] hover:text-black">
                  SHOW MY RESULT →
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-black/35">
                  Your details are used to show your result and provide webinar information.
                </p>
              </form>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                  Your Content Psychology Result
                </div>
                <h1 className="mx-auto mt-5 text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-6xl">
                  YOUR BLIND SPOT:
                  <br />
                  <span className="text-[#F4B400]">{resultProfiles[resultKey].title}</span>
                </h1>
              </div>

              <div className="mx-auto mt-10 max-w-2xl border border-black/10 bg-white p-7 sm:p-10">
                <p className="text-xl font-black leading-tight sm:text-2xl">
                  {resultProfiles[resultKey].diagnosis}
                </p>

                <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                  <div className="text-xs font-black uppercase tracking-[0.15em] text-black/40">What you need</div>
                  <p className="mt-2 text-lg font-bold leading-relaxed">{resultProfiles[resultKey].need}</p>
                </div>

                <div className="mt-9 border-t border-black/10 pt-8 text-center">
                  <div className="text-xs font-black uppercase tracking-[0.15em] text-[#F4B400]">
                    This is what we&apos;ll work on.
                  </div>
                  <h2 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-4xl">
                    The Psychology Behind Writing
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-black/55">
                    Learn how Attention, Curiosity, Relevance, Emotion &amp; Memory shape the way people respond to your content.
                  </p>
                  <div className="mt-5 text-xs font-black uppercase tracking-[0.12em] text-black/40">
                    27 September 2026 • 11 AM IST
                  </div>
                  <Link href="/register" className="mt-7 inline-flex w-full items-center justify-center bg-[#F4B400] px-8 py-5 text-sm font-black uppercase tracking-[0.05em] text-black transition hover:bg-black hover:text-white">
                    JOIN THE WEBINAR — ₹99 →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

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

              <h2 className="mt-5 text-lg font-black uppercase leading-[0.87] tracking-[-0.05em] sm:text-lg">
                Same subject.
                <br />
                <span className="text-[#F4B400]">Different response.</span>
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-lg">
                The difference wasn&apos;t the information.
              </p>

              <p className="mt-2 text-lg font-black sm:text-lg">
                It was the psychology behind the message.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <div className="text-lg font-black text-[#F4B400]">01</div>

              <p className="mt-8 text-lg font-black leading-tight">
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

              <h2 className="mt-4 text-lg font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-lg">
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
          ABOUT PUNEET + PROFILE VISUAL
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

              <h2 className="mt-5 text-lg font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-lg">
                I&apos;ve spent years trying to understand why people care.
              </h2>

              <p className="mt-7 text-lg leading-relaxed text-black/60 sm:text-lg">
                I&apos;m Puneet Kaur Saluja — a writer, strategist and brand
                communication specialist.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="bg-[#171717] p-5 text-white">
                  <div className="text-lg font-black">9+</div>
                  <div className="mt-2 text-xs font-black uppercase tracking-[0.1em] text-white/45">
                    Years
                  </div>
                </div>

                <div className="bg-[#F4B400] p-5">
                  <div className="text-lg font-black">₹500</div>
                  <div className="mt-2 text-xs font-black uppercase tracking-[0.1em] text-black/45">
                    Where I Started
                  </div>
                </div>
              </div>

              <div className="mt-8 border-l-4 border-[#F4B400] pl-5">
                <p className="text-lg font-black leading-tight sm:text-lg">
                  Good writing isn&apos;t really about words.
                </p>

                <p className="mt-2 text-lg font-black leading-tight text-[#F4B400] sm:text-lg">
                  It&apos;s about understanding the person reading them.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SELECTED WORK — VISUAL
      ========================================================= */}
      <section className="bg-[#171717] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
              Selected Work
            </div>

            <h2 className="mt-5 text-lg font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-lg">
              This isn&apos;t just something I teach.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-white/55 sm:text-lg">
              I&apos;ve had to figure it out while working with real brands,
              real audiences and real communication problems.
            </p>
          </div>

          {/* 2 × 2 PORTFOLIO GRID */}
          <div className="mt-14 grid gap-4 md:grid-cols-2">

            {/* A FRAGRANCE STORY — BRAND COMMUNICATION */}
            <div className="group overflow-hidden bg-white">
              <div className="bg-white">
                <Image
                  src="/landing-assets/a-fragrance-story-brand.jpeg"
                  alt="A Fragrance Story brand communication work"
                  width={1024}
                  height={1024}
                  className="block h-auto w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                />
              </div>

              <div className="border-t border-black/5 p-6 text-black">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
                  A Fragrance Story
                </div>

                <h3 className="mt-2 text-lg font-black">
                  Brand Communication
                </h3>
              </div>
            </div>

            {/* POP FUSION — BRAND COMMUNICATION */}
            <div className="group overflow-hidden bg-white">
              <div className="bg-white">
                <Image
                  src="/landing-assets/pop-fusion.jpeg"
                  alt="Pop Fusion brand communication work"
                  width={1024}
                  height={1024}
                  className="block h-auto w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                />
              </div>

              <div className="border-t border-black/5 p-6 text-black">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
                  Pop Fusion
                </div>

                <h3 className="mt-2 text-lg font-black">
                  Brand Communication
                </h3>
              </div>
            </div>

            {/* A FRAGRANCE STORY — PRODUCT LAUNCH */}
            <div className="group overflow-hidden bg-white">
              <div className="bg-white">
                <Image
                  src="/landing-assets/a-fragrance-story-product-launch.jpeg"
                  alt="A Fragrance Story product launch work"
                  width={1024}
                  height={1024}
                  className="block h-auto w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                />
              </div>

              <div className="border-t border-black/5 p-6 text-black">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
                  A Fragrance Story
                </div>

                <h3 className="mt-2 text-lg font-black">
                  Product Launch
                </h3>
              </div>
            </div>

            {/* FOODFOX — SOCIAL MEDIA COPY */}
            <div className="group overflow-hidden bg-white">
              <div className="bg-white">
                <Image
                  src="/landing-assets/foodfox.jpeg"
                  alt="FoodFox social media copy work"
                  width={1024}
                  height={1024}
                  className="block h-auto w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                />
              </div>

              <div className="border-t border-black/5 p-6 text-black">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
                  FoodFox
                </div>

                <h3 className="mt-2 text-lg font-black">
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

            <div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B400]">
                Case Study
              </div>

              <h2 className="mt-5 text-lg font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-lg">
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

              <div className="mt-4 grid grid-cols-3 gap-3">

                <div className="bg-[#171717] p-5 text-white">
                  <div className="text-lg font-black sm:text-lg">
                    90K+
                  </div>

                  <div className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-white/40">
                    Engagement
                  </div>
                </div>

                <div className="bg-[#171717] p-5 text-white">
                  <div className="text-lg font-black sm:text-lg">
                    1.29K+
                  </div>

                  <div className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-white/40">
                    Accounts Reached
                  </div>
                </div>

                <div className="bg-[#F4B400] p-5">
                  <div className="text-lg font-black sm:text-lg">
                    3K+
                  </div>

                  <div className="mt-2 text-[10px] font-black uppercase tracking-[0.1em] text-black/45">
                    Influencer Reach
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="mt-14 bg-[#F4B400] p-8 sm:p-12">
            <div className="text-xs font-black uppercase tracking-[0.15em] text-black/50">
              The Psychology
            </div>

            <p className="mt-5 max-w-4xl text-lg font-black leading-tight tracking-[-0.03em] sm:text-lg">
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

              <h2 className="mt-5 text-lg font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-lg">
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

                <h3 className="mt-12 text-lg font-black">
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

              <h2 className="mt-5 text-lg font-black uppercase leading-[0.87] tracking-[-0.05em] sm:text-lg">
                AI can write
                <br />
                your words.
              </h2>

              <p className="mt-6 text-lg font-black leading-tight sm:text-lg">
                But can it make people care?
              </p>
            </div>

            <div className="border border-black/15 bg-black/5 p-8">
              <p className="text-lg font-black leading-tight">
                AI helps you create faster.
              </p>

              <p className="mt-5 text-lg font-black leading-tight">
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

            <h2 className="mt-5 text-lg font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-lg">
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
                className="border border-white/10 bg-white/5 p-6 text-lg font-black"
              >
                <span className="mr-3 text-[#F4B400]">→</span>
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

            <h2 className="mt-5 text-lg font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-lg">
              From creating content
              <br />
              to creating communication.
            </h2>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2">

            {[
              ["What should I post?", "What will make someone stop?"],
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

                <p className="mt-5 text-lg font-black text-black/35 line-through">
                  {from}
                </p>

                <div className="my-5 h-px bg-black/10" />

                <div className="text-xs font-black uppercase tracking-[0.12em] text-[#F4B400]">
                  Start asking
                </div>

                <p className="mt-3 text-lg font-black leading-tight">
                  {to}
                </p>
              </div>
            ))}

            <div className="flex items-center bg-[#F4B400] p-7 sm:p-9">
              <p className="text-lg font-black uppercase leading-[0.9] sm:text-lg">
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

          <h2 className="mt-5 max-w-3xl text-lg font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-lg">
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
                  <div className="text-lg font-black opacity-20">“</div>

                  <p className="mt-5 text-lg font-black italic leading-tight">
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

          <h2 className="mt-5 text-lg font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-lg">
            2-HOUR LIVE
            <br />
            WEBINAR
          </h2>

          <div className="mt-8 text-lg font-black tracking-[-0.07em]">
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

          <h2 className="mt-5 text-lg font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-lg">
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
                    <span className="text-lg font-black sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border border-black/20 text-lg transition ${
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

          <h2 className="mt-6 text-lg font-black uppercase leading-[0.86] tracking-[-0.05em] sm:text-lg">
            Your audience doesn&apos;t owe your content their attention.
          </h2>

          <p className="mt-8 text-lg font-black text-white/45 sm:text-lg">
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
          <span>The Psychology Behind Writing</span>

          <span>
            Puneet Kaur Saluja • 27 September 2026 • 11 AM IST
          </span>
        </div>
      </footer>

    </main>
  );
}
