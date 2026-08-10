import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Container } from "@/components/layout/Layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, MapPin, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const merchantTxnId = params.tx as string

  if (!merchantTxnId) {
    redirect("/")
  }

  const supabase = (await createClient()) as any;

  // Fetch Payment and Registration Data
  const { data: payment } = await supabase
    .from("payments")
    .select("*, registrations(*)")
    .eq("merchant_transaction_id", merchantTxnId)
    .single()

  if (!payment || payment.status !== "SUCCESS") {
    // If not found or not success, might be pending or failed
    redirect("/")
  }

  const registration = payment.registrations

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-12 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            You're In, {registration.full_name.split(' ')[0]}!
          </h1>
          <p className="text-xl text-[var(--color-muted-foreground)]">
            Your registration is confirmed. We've sent the details to {registration.email} and a confirmation on WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-white border-[var(--color-border)] shadow-premium">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6 border-b pb-4">Workshop Details</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                  </div>
                  <div>
                    <div className="font-semibold">Date</div>
                    <div className="text-[var(--color-muted-foreground)]">Sunday, Upcoming</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                  </div>
                  <div>
                    <div className="font-semibold">Time</div>
                    <div className="text-[var(--color-muted-foreground)]">11:00 AM IST (90 Minutes)</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-muted-foreground)]" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-[var(--color-muted-foreground)]">Live on Google Meet (Link in Email)</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-8">
            <Card className="bg-[var(--color-muted)]/30 border-none shadow-none">
              <CardContent className="p-8">
                <h3 className="font-bold mb-2">Payment Summary</h3>
                <div className="flex justify-between text-sm text-[var(--color-muted-foreground)] mb-2">
                  <span>Transaction ID</span>
                  <span className="font-mono">{payment.phonepe_transaction_id || payment.merchant_transaction_id}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--color-muted-foreground)] mb-4">
                  <span>Amount Paid</span>
                  <span>₹{payment.amount}</span>
                </div>
                <div className="flex justify-between font-bold pt-4 border-t">
                  <span>Status</span>
                  <span className="text-green-600">Successful</span>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-[24px] overflow-hidden shadow-sm">
              <Image 
                src="/images/payment/thankyou.png" 
                alt="Thank you illustration" 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover bg-white"
              />
            </div>
            
            <Button asChild variant="ghost">
              <a href="/">← Return to Homepage</a>
            </Button>
          </div>
        </div>
      </Container>

      {/* Small Legal Footer */}
      <footer className="mt-24 border-t border-[var(--color-border)] py-8 px-6 text-center">
        <p className="text-xs font-medium text-[var(--color-muted-foreground)] flex items-center justify-center flex-wrap gap-4">
          <span>© 2026 Puneet Kaur Saluja.</span>
          <Link href="/privacy" className="hover:text-[var(--color-foreground)] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[var(--color-foreground)] transition-colors">Terms & Conditions</Link>
          <Link href="/refund-policy" className="hover:text-[var(--color-foreground)] transition-colors">Refund Policy</Link>
        </p>
      </footer>
    </main>
  )
}
