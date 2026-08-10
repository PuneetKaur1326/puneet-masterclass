import { NextResponse } from 'next/server';

const VERIFY_TOKEN = "puneet-workshop-verify-2026";

// 1. Verification Request (GET)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        return new NextResponse(challenge, { status: 200 });
    } 
    
    return new NextResponse('Forbidden', { status: 403 });
}

// 2. Event Notification (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (body.object === 'whatsapp_business_account') {
            // Extract and process the message data here
            console.log(JSON.stringify(body, null, 2)); 
            return new NextResponse('EVENT_RECEIVED', { status: 200 });
        }
        
        return new NextResponse('Not Found', { status: 404 });
    } catch (error) {
        console.error('Error parsing webhook payload:', error);
        return new NextResponse('Bad Request', { status: 400 });
    }
}
