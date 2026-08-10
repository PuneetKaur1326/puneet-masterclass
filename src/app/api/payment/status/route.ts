import { NextResponse } from 'next/server';
import { PhonePeService } from '@/services/phonepe/phonepe';
import { createAdminClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const merchantTransactionId = searchParams.get('id');
    const isMock = searchParams.get('mock') === 'true';

    if (!merchantTransactionId) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const supabase = createAdminClient() as any;

    // If local dev/mock mode
    if (isMock) {
      const { data: payRecord } = await supabase
        .from('payments')
        .update({ status: 'SUCCESS' })
        .eq('merchant_transaction_id', merchantTransactionId)
        .select('registration_id')
        .single();
      
      if (payRecord) {
        await supabase
          .from('registrations')
          .update({ payment_status: 'SUCCESS' })
          .eq('id', payRecord.registration_id);
      }
      return NextResponse.redirect(new URL(`/thank-you?tx=${merchantTransactionId}`, req.url));
    }

    // 1. Fetch current status from PhonePe
    const phonePeStatus = await PhonePeService.checkStatus(merchantTransactionId);
    
    // Log event
    await supabase.from('events').insert({
      event_type: 'PHONEPE_STATUS_CHECK',
      payload: phonePeStatus,
      status: phonePeStatus.code
    });

    const isSuccess = phonePeStatus.code === 'PAYMENT_SUCCESS';
    const status = isSuccess ? 'SUCCESS' : 'FAILED';

    // 2. Update DB (in case webhook was delayed)
    const { data: payment } = await supabase
      .from('payments')
      .update({
        status,
        phonepe_transaction_id: phonePeStatus.data?.transactionId || null,
        raw_response: phonePeStatus,
      })
      .eq('merchant_transaction_id', merchantTransactionId)
      .select('registration_id')
      .single();

    if (payment) {
      await supabase
        .from('registrations')
        .update({ payment_status: status })
        .eq('id', payment.registration_id);
    }

    // 3. Redirect to appropriate page
    if (isSuccess) {
      return NextResponse.redirect(new URL(`/thank-you?tx=${merchantTransactionId}`, req.url));
    } else {
      return NextResponse.redirect(new URL(`/payment-failed?tx=${merchantTransactionId}`, req.url));
    }

  } catch (error) {
    console.error('Status Route Error:', error);
    // In case of error, redirect to home with a generic failure
    return NextResponse.redirect(new URL('/', req.url));
  }
}
