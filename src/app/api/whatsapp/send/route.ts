import { NextResponse } from 'next/server';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';

export async function POST(req: Request) {
  try {
    // 1. Security Check
    // Require WHATSAPP_TEST_SECRET header, OR require NODE_ENV === 'development'
    const testSecret = req.headers.get('x-test-secret');
    const expectedSecret = process.env.WHATSAPP_TEST_SECRET;
    
    if (process.env.NODE_ENV !== 'development' && (!expectedSecret || testSecret !== expectedSecret)) {
      console.warn('[WhatsApp Send API] Unauthorized attempt to use test endpoint.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 2. Body Validation
    const body = await req.json();
    const { phoneNumber, name } = body;

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Missing phoneNumber in request body' }, { status: 400 });
    }

    const testName = name || 'Test User';

    // 3. Send Message
    console.log(`[WhatsApp Send API] Triggering test send to ${phoneNumber}`);
    const result = await MetaWhatsAppService.sendConfirmation(phoneNumber, testName, "₹99");

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to send WhatsApp message. Check server logs for details.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error: any) {
    console.error('[WhatsApp Send API] Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
