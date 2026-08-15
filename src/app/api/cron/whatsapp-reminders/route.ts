import { NextResponse } from 'next/server';
import { MetaWhatsAppService } from '@/services/whatsapp/meta';
import { getAttendees, submitRegistration } from '@/lib/googleSheets';

export async function GET(req: Request) {
  // Optional authorization for cron
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requestId = Math.random().toString(36).substring(7);
  console.log(`[Cron - ${requestId}] Starting WhatsApp Reminders cron job...`);

  try {
    // 1. Calculate Timings
    const dateStr = process.env.WORKSHOP_DATE || '23 August 2026';
    const timeStr = process.env.WORKSHOP_TIME || '11:00 AM IST';
    const joinUrl = process.env.WORKSHOP_JOIN_URL || 'https://meet.google.com/default';
    
    // Parse Date "23 August 2026 11:00 AM IST"
    // Clean IST and create a valid date string
    const cleanTimeStr = timeStr.replace('IST', '').trim();
    // Assuming dateStr is '23 August 2026', cleanTimeStr is '11:00 AM'
    // Constructing date in IST timezone (Asia/Kolkata is +05:30)
    // To parse this properly in Node:
    const workshopDateTimeString = `${dateStr} ${cleanTimeStr} GMT+0530`; 
    const workshopTime = new Date(workshopDateTimeString).getTime();
    const currentTime = Date.now();

    if (isNaN(workshopTime)) {
      throw new Error(`Failed to parse workshop date: ${workshopDateTimeString}`);
    }

    const hoursUntilWorkshop = (workshopTime - currentTime) / (1000 * 60 * 60);
    console.log(`[Cron - ${requestId}] Hours until workshop: ${hoursUntilWorkshop.toFixed(2)}`);

    const shouldSendReminder = hoursUntilWorkshop <= 48;
    const shouldSendWebinarLink = hoursUntilWorkshop <= 1;

    if (!shouldSendReminder && !shouldSendWebinarLink) {
      return NextResponse.json({ message: 'No reminders due yet.' });
    }

    // 2. Fetch Attendees
    const attendeesResponse = await getAttendees(requestId);
    if (!attendeesResponse.success || !attendeesResponse.data) {
      throw new Error('Failed to fetch attendees: ' + attendeesResponse.message);
    }

    // The Google Apps Script might return data directly as an array or inside a 'data' property
    const rows = Array.isArray(attendeesResponse.data) 
      ? attendeesResponse.data 
      : (Array.isArray(attendeesResponse.data.data) ? attendeesResponse.data.data : []);

    let remindersSent = 0;
    let linksSent = 0;

    for (const attendee of rows) {
      // Typically apps script returns keys matching the header columns (e.g. Phone, Name, PaymentStatus, ReminderStatus, WebinarLinkStatus)
      // or we handle camelCase. We will check both.
      const phone = attendee.phone || attendee.Phone || attendee.PHONE;
      const name = attendee.fullName || attendee.name || attendee.Name || attendee.FULLNAME || 'Attendee';
      const paymentStatus = attendee.paymentStatus || attendee.PaymentStatus || attendee.PAYMENTSTATUS || '';
      
      const reminderStatus = attendee.reminderStatus || attendee.ReminderStatus || attendee.REMINDERSTATUS || '';
      const webinarLinkStatus = attendee.webinarLinkStatus || attendee.WebinarLinkStatus || attendee.WEBINARLINKSTATUS || '';

      if (!phone || typeof phone !== 'string' || (paymentStatus !== 'Paid' && paymentStatus !== 'SUCCESS')) {
        continue;
      }

      // 48h Reminder
      if (shouldSendReminder && reminderStatus !== 'Sent') {
        const result = await MetaWhatsAppService.sendReminder(phone, name);
        if (result?.success) {
          await submitRegistration({
            action: 'whatsapp_update',
            phone, // phone is required as a key for update
            reminderStatus: 'Sent'
          }, `rem-${requestId}`);
          remindersSent++;
        }
      }

      // 1h Webinar Link
      if (shouldSendWebinarLink && webinarLinkStatus !== 'Sent') {
        const result = await MetaWhatsAppService.sendWebinarLink(phone, name, timeStr, joinUrl);
        if (result?.success) {
          await submitRegistration({
            action: 'whatsapp_update',
            phone, 
            webinarLinkStatus: 'Sent'
          }, `link-${requestId}`);
          linksSent++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      remindersSent,
      linksSent,
      hoursUntilWorkshop
    });

  } catch (error: any) {
    console.error(`[Cron - ${requestId}] Error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
