"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { processRegistration } from "@/actions/register"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const occupationOptions = [
  "Student",
  "Business Owner",
  "Founder",
  "Coach",
  "Consultant",
  "Freelancer",
  "Content Creator",
  "Marketing Professional",
  "Corporate Employee",
  "Agency Owner",
  "Teacher",
  "Other"
] as const;

const joiningReasons = [
  "I want people to remember my brand.",
  "I want to improve my communication skills.",
  "I want to create better content.",
  "I want to build my personal brand.",
  "I want to grow my business.",
  "I want to improve my marketing.",
  "I want to understand consumer psychology.",
  "I want to become a better writer.",
  "I want to increase conversions.",
  "I am curious to learn.",
  "Other"
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\+91\s?\d{10}$/, { message: "Please enter a valid Indian phone number starting with +91" }),
  occupation: z.enum(occupationOptions, { message: "Occupation is required." }),
  goal: z.enum(joiningReasons, { message: "Please select a reason for joining." }),
  challenge: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms & Conditions, Privacy Policy, and Refund Policy.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [errorMsg, setErrorMsg] = useState("")
  const [testSuccess, setTestSuccess] = useState<{orderId: string, paymentId: string} | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      occupation: undefined,
      goal: undefined,
      challenge: "",
      terms: false,
    }
  })

  const onSubmit = (data: FormValues) => {
    setErrorMsg("")
    startTransition(async () => {
      try {
        // 1. Submit to Google Sheets via Next.js API Route
        const sheetResponse = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            occupation: data.occupation,
            goal: data.goal,
            challenge: data.challenge,
          }),
        });

        const sheetResult = await sheetResponse.json();

        if (!sheetResponse.ok || !sheetResult.success) {
          setErrorMsg(sheetResult.message || "Failed to submit registration. Please try again.");
          return;
        }

        const registrationId = sheetResult.registrationId;

        // 2. Load Razorpay Script
        const isRazorpayLoaded = await loadRazorpayScript();
        if (!isRazorpayLoaded) {
          setErrorMsg("Razorpay SDK failed to load. Are you online?");
          return;
        }

        // 3. Create Order
        const orderResponse = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            registrationId,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone
          }),
        });
        const orderData = await orderResponse.json();

        if (!orderResponse.ok || !orderData.order_id) {
          setErrorMsg(orderData.error || "Failed to initiate payment. Please try again.");
          return;
        }

        // 4. Open Razorpay Checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Puneet Kaur Saluja",
          description: "Workshop Registration",
          order_id: orderData.order_id,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  phone: data.phone,
                  email: data.email,
                  name: data.fullName,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                setTestSuccess({
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id
                });
              } else {
                setErrorMsg(verifyData.error || "Payment verification failed. Please contact support.");
              }
            } catch (err) {
              setErrorMsg("Payment verification error.");
            }
          },
          prefill: {
            name: data.fullName,
            email: data.email,
            contact: data.phone,
          },
          modal: {
            ondismiss: function() {
              setErrorMsg("Payment cancelled by user.");
            }
          },
          theme: {
            color: "#d97706",
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.on('payment.failed', function (response: any) {
          setErrorMsg(response.error.description || "Payment failed");
        });
        paymentObject.open();

      } catch (error: any) {
        console.error("Submission Error:", error);
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    })
  }

  const inputClassName = "w-full min-h-[3.5rem] px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 focus:bg-white transition-all text-base";
  const labelClassName = "block text-sm font-semibold text-gray-900 mb-2";

  if (testSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-white border border-gray-100 rounded-2xl shadow-xl text-center space-y-6"
      >
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Test Payment Successful</h3>
        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 border border-gray-100">
          <p className="text-sm font-mono text-gray-600"><span className="font-semibold text-gray-900">Razorpay Order ID:</span> {testSuccess.orderId}</p>
          <p className="text-sm font-mono text-gray-600"><span className="font-semibold text-gray-900">Razorpay Payment ID:</span> {testSuccess.paymentId}</p>
        </div>
        <button 
          onClick={() => setTestSuccess(null)}
          className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Reset Test Form
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 overflow-hidden"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1">
        <label className={labelClassName}>Full Name <span className="text-amber-500">*</span></label>
        <input
          {...register("fullName")}
          placeholder="John Doe"
          className={inputClassName}
        />
        <AnimatePresence>
          {errors.fullName && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-sm text-red-500 mt-1">{errors.fullName.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>Email Address <span className="text-amber-500">*</span></label>
        <input
          {...register("email")}
          type="email"
          placeholder="john@example.com"
          className={inputClassName}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-sm text-red-500 mt-1">{errors.email.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>Phone Number <span className="text-amber-500">*</span></label>
        <input
          {...register("phone")}
          placeholder="+91 9876543210"
          className={inputClassName}
        />
        <AnimatePresence>
          {errors.phone && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-sm text-red-500 mt-1">{errors.phone.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>Occupation <span className="text-amber-500">*</span></label>
        <select
          {...register("occupation")}
          defaultValue=""
          className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:12px_auto]`}
        >
          <option value="" disabled hidden>Select your occupation...</option>
          {occupationOptions.map(occ => (
            <option key={occ} value={occ}>{occ}</option>
          ))}
        </select>
        <AnimatePresence>
          {errors.occupation && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-sm text-red-500 mt-1">{errors.occupation.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>Why are you joining this workshop? <span className="text-amber-500">*</span></label>
        <select
          {...register("goal")}
          defaultValue=""
          className={`${inputClassName} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:12px_auto]`}
        >
          <option value="" disabled hidden>Select your primary reason...</option>
          {joiningReasons.map(reason => (
            <option key={reason} value={reason}>{reason}</option>
          ))}
        </select>
        <AnimatePresence>
          {errors.goal && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-sm text-red-500 mt-1">{errors.goal.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1">
        <label className={labelClassName}>What is your biggest communication challenge? <span className="text-gray-400 font-normal">(Optional)</span></label>
        <textarea
          {...register("challenge")}
          placeholder="Tell us what you're struggling with..."
          className={`${inputClassName} py-4 min-h-[100px] resize-none`}
        />
      </div>

      <div className="pt-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            {...register("terms")}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500/30 transition-all cursor-pointer accent-amber-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-500 leading-relaxed cursor-pointer select-none">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-gray-900 font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-amber-500 transition-colors">Terms & Conditions</Link>,{' '}
            <Link href="/privacy" className="text-gray-900 font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-amber-500 transition-colors">Privacy Policy</Link>, and{' '}
            <Link href="/refund-policy" className="text-gray-900 font-semibold underline decoration-gray-300 underline-offset-4 hover:decoration-amber-500 transition-colors">Refund Policy</Link>.
          </label>
        </div>
        <AnimatePresence>
          {errors.terms && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-sm text-red-500 mt-2">{errors.terms.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-4 flex flex-col gap-4">
        <button
          type="submit"
          disabled={!isValid || isPending}
          className="relative w-full h-14 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group bg-gray-900 text-white hover:bg-gray-800 disabled:hover:bg-gray-900"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          <div className="relative flex items-center justify-center gap-2">
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="tracking-wide">Securely Processing...</span>
              </>
            ) : (
              <>
                <span className="tracking-wide">Register & Pay ₹1</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </>
            )}
          </div>
        </button>
        <p className="text-xs text-center text-gray-500 leading-relaxed">
          By continuing, you agree to our{' '}
          <Link href="/privacy" className="text-gray-900 hover:text-amber-600 font-semibold underline decoration-gray-300 underline-offset-2 transition-colors">Privacy Policy</Link>,{' '}
          <Link href="/terms" className="text-gray-900 hover:text-amber-600 font-semibold underline decoration-gray-300 underline-offset-2 transition-colors">Terms & Conditions</Link>,{' '}
          <Link href="/refund-policy" className="text-gray-900 hover:text-amber-600 font-semibold underline decoration-gray-300 underline-offset-2 transition-colors">Refund & Cancellation Policy</Link>.
        </p>
      </div>
    </motion.form>
  )
}
