import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    const expectedToken = process.env.META_VERIFY_TOKEN;

    if (!expectedToken) {
      console.error('[WhatsApp Webhook] META_VERIFY_TOKEN is not configured.');
      return new NextResponse('Server configuration error', { status: 500 });
    }

    if (mode === 'subscribe' && token === expectedToken) {
      console.log('[WhatsApp Webhook] Webhook verified successfully.');
      return new NextResponse(challenge, { status: 200 });
    }

    console.warn('[WhatsApp Webhook] Webhook verification failed. Invalid token.');
    return new NextResponse('Forbidden', { status: 403 });
  } catch (error) {
    console.error('[WhatsApp Webhook] Error during verification:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if it's a WhatsApp webhook event
    if (body.object === 'whatsapp_business_account') {
      
      // Iterate through entries and changes (though usually there is only one of each)
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          const value = change.value;
          
          if (value) {
            if (value.messages) {
              // Incoming Message
              const message = value.messages[0];
              console.log(`[WhatsApp Webhook] Incoming message from ${message.from}: ${message.type}`);
              // We do not auto-reply per user requirements
            } else if (value.statuses) {
              // Message Status Update (sent, delivered, read, failed)
              const status = value.statuses[0];
              console.log(`[WhatsApp Webhook] Message status update - ID: ${status.id}, Status: ${status.status}, Recipient: ${status.recipient_id}`);
              
              if (status.status === 'failed') {
                console.error(`[WhatsApp Webhook] Message failed delivery. Details:`, JSON.stringify(status.errors));
              }
            } else {
              // Other unhandled events
              console.log('[WhatsApp Webhook] Received unhandled event type:', Object.keys(value));
            }
          }
        }
      }
      
      // Return 200 OK immediately as required by Meta
      return new NextResponse('EVENT_RECEIVED', { status: 200 });
    }

    // Not a WhatsApp event
    return new NextResponse('Not Found', { status: 404 });
  } catch (error) {
    console.error('[WhatsApp Webhook] Error processing POST webhook:', error);
    // Even on error, we should probably return 200 to Meta eventually if we log it, 
    // but 500 is safer to let them know our endpoint crashed.
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
