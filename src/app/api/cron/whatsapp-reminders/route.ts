import { NextResponse } from "next/server";
import { MetaWhatsAppService } from "@/services/whatsapp/meta";

const WEBINAR_DATE = "2026-09-06";
const WEBINAR_TIME = "11:00";
const TIME_ZONE = "Asia/Kolkata";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const WEBINAR_LINK =
  process.env.WORKSHOP_JOIN_URL || "";

const AMOUNT =
  process.env.WORKSHOP_AMOUNT || "₹99";

function getIndiaTime() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value || "";

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    second: Number(get("second")),
    date: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

function getMinutesUntilWebinar() {
  const webinarTime = new Date(
    `${WEBINAR_DATE}T${WEBINAR_TIME}:00+05:30`
  ).getTime();

  const now = Date.now();

  return Math.floor(
    (webinarTime - now) / (1000 * 60)
  );
}

async function getPaidRegistrations() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/registrations?payment_status=in.(Paid,SUCCESS)&select=*`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Supabase fetch failed: ${response.status} ${error}`
    );
  }

  return response.json();
}

async function markMessageSent(
  registrationId: string,
  column: string
) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase environment variables"
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/registrations?id=eq.${encodeURIComponent(
      registrationId
    )}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        [column]: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Supabase update failed: ${response.status} ${error}`
    );
  }
}

async function sendForRegistration(
  registration: any,
  messageType: string
) {
  const phone = registration.phone;
  const name = registration.full_name || "Attendee";

  if (!phone) {
    return {
      success: false,
      error: "Registration has no phone number",
    };
  }

  switch (messageType) {
    case "6_days":
      return MetaWhatsAppService.sendReminder6Days(
        phone,
        name
      );

    case "5_days":
      return MetaWhatsAppService.sendReminder5Days(
        phone,
        name
      );

    case "4_days":
      return MetaWhatsAppService.sendReminder4Days(
        phone,
        name
      );

    case "3_days":
      return MetaWhatsAppService.sendReminder3Days(
        phone,
        name
      );

    case "2_days":
      return MetaWhatsAppService.sendReminder2Days(
        phone,
        name
      );

    case "tomorrow":
      return MetaWhatsAppService.sendWebinarTomorrow(
        phone,
        name
      );

    case "today":
      return MetaWhatsAppService.sendWebinarToday(
        phone,
        name
      );

    case "one_hour":
      return MetaWhatsAppService.sendOneHourReminder(
        phone,
        name
      );

    case "thirty_minutes":
      return MetaWhatsAppService.sendThirtyMinuteReminder(
        phone,
        name
      );

    case "live_now":
      return MetaWhatsAppService.sendLiveNow(
        phone,
        name
      );

    case "feedback":
      return MetaWhatsAppService.sendFeedback(
        phone,
        name
      );

    default:
      return {
        success: false,
        error: `Unknown message type: ${messageType}`,
      };
  }
}

function getMessageForNow(
  registration: any,
  india: ReturnType<typeof getIndiaTime>,
  minutesUntilWebinar: number
) {
  /*
   * IMPORTANT:
   * These are calendar-day triggers.
   *
   * The actual cron frequency will be configured separately.
   */

  // ---------------------------------------------
  // 31 AUGUST — 6 DAYS
  // ---------------------------------------------

  if (
    india.date === "2026-08-31" &&
    !registration.reminder_6_days_sent_at
  ) {
    return {
      type: "6_days",
      column: "reminder_6_days_sent_at",
    };
  }

  // ---------------------------------------------
  // 1 SEPTEMBER — 5 DAYS
  // ---------------------------------------------

  if (
    india.date === "2026-09-01" &&
    !registration.reminder_5_days_sent_at
  ) {
    return {
      type: "5_days",
      column: "reminder_5_days_sent_at",
    };
  }

  // ---------------------------------------------
  // 2 SEPTEMBER — 4 DAYS
  // ---------------------------------------------

  if (
    india.date === "2026-09-02" &&
    !registration.reminder_4_days_sent_at
  ) {
    return {
      type: "4_days",
      column: "reminder_4_days_sent_at",
    };
  }

  // ---------------------------------------------
  // 3 SEPTEMBER — 3 DAYS
  // ---------------------------------------------

  if (
    india.date === "2026-09-03" &&
    !registration.reminder_3_days_sent_at
  ) {
    return {
      type: "3_days",
      column: "reminder_3_days_sent_at",
    };
  }

  // ---------------------------------------------
  // 4 SEPTEMBER — 2 DAYS
  // ---------------------------------------------

  if (
    india.date === "2026-09-04" &&
    !registration.reminder_2_days_sent_at
  ) {
    return {
      type: "2_days",
      column: "reminder_2_days_sent_at",
    };
  }

  // ---------------------------------------------
  // 5 SEPTEMBER — TOMORROW + LINK
  // ---------------------------------------------

  if (
    india.date === "2026-09-05" &&
    !registration.webinar_tomorrow_sent_at
  ) {
    return {
      type: "tomorrow",
      column: "webinar_tomorrow_sent_at",
    };
  }

  // ---------------------------------------------
  // 6 SEPTEMBER — MORNING
  // ---------------------------------------------

  if (
    india.date === WEBINAR_DATE &&
    india.hour >= 8 &&
    india.hour < 10 &&
    !registration.webinar_today_sent_at
  ) {
    return {
      type: "today",
      column: "webinar_today_sent_at",
    };
  }

  // ---------------------------------------------
  // 1 HOUR BEFORE
  // 10:00 AM
  // ---------------------------------------------

  if (
    india.date === WEBINAR_DATE &&
    minutesUntilWebinar <= 60 &&
    minutesUntilWebinar > 45 &&
    !registration.one_hour_reminder_sent_at
  ) {
    return {
      type: "one_hour",
      column: "one_hour_reminder_sent_at",
    };
  }

  // ---------------------------------------------
  // 30 MINUTES BEFORE
  // 10:30 AM
  // ---------------------------------------------

  if (
    india.date === WEBINAR_DATE &&
    minutesUntilWebinar <= 30 &&
    minutesUntilWebinar > 15 &&
    !registration.thirty_minute_reminder_sent_at
  ) {
    return {
      type: "thirty_minutes",
      column: "thirty_minute_reminder_sent_at",
    };
  }

  // ---------------------------------------------
  // LIVE NOW
  // 11:00 AM
  // ---------------------------------------------

  if (
    india.date === WEBINAR_DATE &&
    minutesUntilWebinar <= 0 &&
    minutesUntilWebinar >= -15 &&
    !registration.live_now_sent_at
  ) {
    return {
      type: "live_now",
      column: "live_now_sent_at",
    };
  }

  // ---------------------------------------------
  // FEEDBACK
  // 1:00 PM
  // ---------------------------------------------

  if (
    india.date === WEBINAR_DATE &&
    india.hour === 13 &&
    !registration.feedback_sent_at
  ) {
    return {
      type: "feedback",
      column: "feedback_sent_at",
    };
  }

  return null;
}

export async function GET(req: Request) {
  const requestId =
    Math.random().toString(36).substring(2, 10);

  console.log(
    `[WhatsApp Cron ${requestId}] Starting`
  );

  try {
    // ---------------------------------------------
    // CRON AUTHENTICATION
    // ---------------------------------------------

    const authHeader =
      req.headers.get("authorization");

    const cronSecret = process.env.CRON_SECRET;

    if (
      cronSecret &&
      authHeader !== `Bearer ${cronSecret}`
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------------------------------------
    // CHECK REQUIRED CONFIGURATION
    // ---------------------------------------------

    if (!WEBINAR_LINK) {
      throw new Error(
        "WORKSHOP_JOIN_URL is not configured"
      );
    }

    // ---------------------------------------------
    // CURRENT INDIA TIME
    // ---------------------------------------------

    const india = getIndiaTime();
    const minutesUntilWebinar =
      getMinutesUntilWebinar();

    console.log(
      `[WhatsApp Cron ${requestId}] India time:`,
      india
    );

    console.log(
      `[WhatsApp Cron ${requestId}] Minutes until webinar: ${minutesUntilWebinar}`
    );

    // ---------------------------------------------
    // GET PAID REGISTRATIONS
    // ---------------------------------------------

    const registrations =
      await getPaidRegistrations();

    console.log(
      `[WhatsApp Cron ${requestId}] Paid registrations: ${registrations.length}`
    );

    let sent = 0;
    let skipped = 0;
    let failed = 0;

    // ---------------------------------------------
    // PROCESS REGISTRATIONS
    // ---------------------------------------------

    for (const registration of registrations) {
      const message =
        getMessageForNow(
          registration,
          india,
          minutesUntilWebinar
        );

      if (!message) {
        skipped++;
        continue;
      }

      console.log(
        `[WhatsApp Cron ${requestId}] Sending ${message.type} to ${registration.phone}`
      );

      try {
        const result =
          await sendForRegistration(
            registration,
            message.type
          );

        if (result?.success) {
          await markMessageSent(
            registration.id,
            message.column
          );

          sent++;

          console.log(
            `[WhatsApp Cron ${requestId}] ${message.type} sent to ${registration.phone}`
          );
        } else {
          failed++;

          console.error(
            `[WhatsApp Cron ${requestId}] ${message.type} failed:`,
            result?.error
          );
        }
      } catch (error: any) {
        failed++;

        console.error(
          `[WhatsApp Cron ${requestId}] Error sending ${message.type}:`,
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      webinarDate: WEBINAR_DATE,
      webinarTime: WEBINAR_TIME,
      currentIndiaDate: india.date,
      currentIndiaHour: india.hour,
      currentIndiaMinute: india.minute,
      minutesUntilWebinar,
      registrations: registrations.length,
      sent,
      skipped,
      failed,
    });
  } catch (error: any) {
    console.error(
      `[WhatsApp Cron ${requestId}] Fatal error:`,
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
