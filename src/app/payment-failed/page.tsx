import { redirect } from "next/navigation"
import { Container } from "@/components/layout/Layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function PaymentFailedPage({
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

  // Fetch Payment
  const { data: payment } = await supabase
    .from("payments")
    .select("status")
    .eq("merchant_transaction_id", merchantTxnId)
    .single()

  // If somehow it was successful, send them to thank you
  if (payment?.status === "SUCCESS") {
    redirect(`/thank-you?tx=${merchantTxnId}`)
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center py-12">
      <Container>
        <div className="max-w-xl mx-auto">
          <Card className="bg-white border-red-100 shadow-premium overflow-hidden text-center">
            <div className="h-2 bg-red-500 w-full" />
            <CardContent className="p-8 md:p-12">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <XCircle className="w-10 h-10" />
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight mb-4">
                Payment Failed
              </h1>
              
              <p className="text-[var(--color-muted-foreground)] mb-8">
                We couldn't process your payment. No charges were made to your account. This is usually due to a bank timeout or network issue.
              </p>

              <div className="mb-8 rounded-2xl overflow-hidden border">
                 <Image 
                  src="/images/payment/failed.png" 
                  alt="Payment Failed" 
                  width={500} 
                  height={300} 
                  className="w-full h-auto"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Button asChild size="lg" className="w-full font-bold bg-[var(--color-foreground)] text-white hover:bg-[var(--color-foreground)]/90">
                  <Link href="https://rzp.io/rzp/J6xwaRTb">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Link>
                </Button>
                
                <Button asChild variant="ghost" className="w-full text-[var(--color-muted-foreground)]">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return to Homepage
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  )
}
