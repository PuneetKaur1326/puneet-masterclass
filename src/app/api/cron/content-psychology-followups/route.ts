import { NextResponse } from "next/server";
import { MetaWhatsAppService } from "@/services/whatsapp/meta";

const ONE_HOUR_MS = 60 * 60 * 1000;

function normalizePhone(phone: string) {
  const cleaned = String(phone || "").replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }

  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return `91${cleaned.substring(1)}`;
  }

  return cleaned;
}

function isOlderThanOneHour(createdAt: string) {
  const timestamp = new Date(createdAt).getTime();

  if (Number.isNaN(timestamp)) {
    return false;
  }

  return Date.now() - timestamp >= ONE_HOUR_MS;
}

async function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return {
    supabaseUrl,
    supabaseServiceRoleKey,
  };
}

async function supabaseFetch(
  url: string,
  serviceRoleKey: string,
  options: RequestInit = {}
) {
  return fetch(url, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
}

async function getEvents(
  supabaseUrl: string,
  serviceRoleKey: string,
  eventType: string
) {
  const url =
    `${supabaseUrl}/rest/v1/events` +
    `?event_type=eq.${encodeURIComponent(eventType)}` +
    `&status=eq.captured` +
    `&order=created_at.asc` +
    `&limit=100`;

  const response = await supabaseFetch(
    url,
    serviceRoleKey
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Unable to fetch ${eventType} events: ${errorText}`
    );
  }

  return response.json();
}

async function markEventProcessed(
  supabaseUrl: string,
  serviceRoleKey: string,
  eventId: string,
  status: string
) {
  const response = await supabaseFetch(
    `${supabaseUrl}/rest/v1/events?id=eq.${encodeURIComponent(
      eventId
    )}`,
    serviceRoleKey,
    {
      method: "PATCH",
      headers: {
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Unable to update event ${eventId}: ${errorText}`
    );
  }
}

async function hasCompletedQuiz(
  supabaseUrl: string,
  serviceRoleKey: string,
  email: string,
  phone: string
) {
  const normalizedPhone = normalizePhone(phone);

  const emailUrl =
    `${supabaseUrl}/rest/v1/events` +
    `?event_type=eq.content_psychology_quiz_lead` +
    `&status=in.(captured,quiz_followup_sent)` +
    `&payload->>email=eq.${encodeURIComponent(
      email.toLowerCase()
    )}` +
    `&select=id` +
    `&limit=1`;

  const emailResponse = await supabaseFetch(
    emailUrl,
    serviceRoleKey
  );

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();

    throw new Error(
      `Unable to check quiz completion: ${errorText}`
    );
  }

  const emailMatches = await emailResponse.json();

  if (Array.isArray(emailMatches) && emailMatches.length > 0) {
    return true;
  }

  const phoneUrl =
    `${supabaseUrl}/rest/v1/events` +
    `?event_type=eq.content_psychology_quiz_lead` +
    `&status=in.(captured,quiz_followup_sent)` +
    `&payload->>phone=eq.${encodeURIComponent(
      phone
    )}` +
    `&select=id` +
    `&limit=1`;

  const phoneResponse = await supabaseFetch(
    phoneUrl,
    serviceRoleKey
  );

  if (!phoneResponse.ok) {
    const errorText = await phoneResponse.text();

    throw new Error(
      `Unable to check quiz completion: ${errorText}`
    );
  }

  const phoneMatches = await phoneResponse.json();

  if (Array.isArray(phoneMatches) && phoneMatches.length > 0) {
    return true;
  }

  /*
   * Also check the normalized WhatsApp version of the
   * phone number in case the quiz data was stored that way.
   */
  if (normalizedPhone !== phone) {
    const normalizedPhoneUrl =
      `${supabaseUrl}/rest/v1/events` +
      `?event_type=eq.content_psychology_quiz_lead` +
      `&status=in.(captured,quiz_followup_sent)` +
      `&payload->>phone=eq.${encodeURIComponent(
        normalizedPhone
      )}` +
      `&select=id` +
      `&limit=1`;

    const normalizedPhoneResponse =
      await supabaseFetch(
        normalizedPhoneUrl,
        serviceRoleKey
      );

    if (!normalizedPhoneResponse.ok) {
      const errorText =
        await normalizedPhoneResponse.text();

      throw new Error(
        `Unable to check normalized quiz completion: ${errorText}`
      );
    }

    const normalizedPhoneMatches =
      await normalizedPhoneResponse.json();

    if (
      Array.isArray(normalizedPhoneMatches) &&
      normalizedPhoneMatches.length > 0
    ) {
      return true;
    }
  }

  return false;
}

async function hasPaidRegistration(
  supabaseUrl: string,
  serviceRoleKey: string,
  email: string,
  phone: string
) {
  const emailUrl =
    `${supabaseUrl}/rest/v1/registrations` +
    `?email=eq.${encodeURIComponent(
      email.toLowerCase()
    )}` +
    `&payment_status=in.(Paid,SUCCESS)` +
    `&select=registration_id` +
    `&limit=1`;

  const emailResponse = await supabaseFetch(
    emailUrl,
    serviceRoleKey
  );

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();

    throw new Error(
      `Unable to check paid registration: ${errorText}`
    );
  }

  const emailMatches = await emailResponse.json();

  if (Array.isArray(emailMatches) && emailMatches.length > 0) {
    return true;
  }

  const normalizedPhone = normalizePhone(phone);

  const phoneCandidates = [
    phone,
    normalizedPhone,
  ].filter(
    (value, index, array) =>
      value && array.indexOf(value) === index
  );

  for (const phoneCandidate of phoneCandidates) {
    const phoneUrl =
      `${supabaseUrl}/rest/v1/registrations` +
      `?phone=eq.${encodeURIComponent(
        phoneCandidate
      )}` +
      `&payment_status=in.(Paid,SUCCESS)` +
      `&select=registration_id` +
      `&limit=1`;

    const phoneResponse = await supabaseFetch(
      phoneUrl,
      serviceRoleKey
    );

    if (!phoneResponse.ok) {
      const errorText = await phoneResponse.text();

      throw new Error(
        `Unable to check paid registration by phone: ${errorText}`
      );
    }

    const phoneMatches = await phoneResponse.json();

    if (
      Array.isArray(phoneMatches) &&
      phoneMatches.length > 0
    ) {
      return true;
    }
  }

  return false;
}

function hasWhatsAppConsent(payload: any) {
  return (
    payload?.whatsapp_consent === true ||
    payload?.whatsappConsent === true ||
    payload?.whatsapp_opt_in === true ||
    payload?.whatsappOptIn === true
  );
}

export async function GET(req: Request) {
  const requestId =
    Math.random().toString(36).substring(2, 10);

  try {
    /*
     * Protect the cron endpoint with CRON_SECRET when
     * Vercel provides it.
     */
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret) {
      const authorization =
        req.headers.get("authorization");

      if (
        authorization !== `Bearer ${cronSecret}`
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 }
        );
      }
    }

    const {
      supabaseUrl,
      supabaseServiceRoleKey,
    } = await getSupabaseConfig();

    const results = {
      quizFollowupsSent: 0,
      webinarFollowupsSent: 0,
      skippedNoConsent: 0,
      skippedAlreadyCompleted: 0,
      skippedAlreadyPaid: 0,
      errors: 0,
    };

    /*
     * ---------------------------------------------------
     * 1. LEAD SUBMITTED BUT QUIZ NOT COMPLETED
     * ---------------------------------------------------
     */
    const leadEvents = await getEvents(
      supabaseUrl,
      supabaseServiceRoleKey,
      "content_psychology_lead"
    );

    for (const event of leadEvents) {
      try {
        if (!event?.id || !event?.payload) {
          continue;
        }

        if (!isOlderThanOneHour(event.created_at)) {
          continue;
        }

        const payload = event.payload;

        if (!hasWhatsAppConsent(payload)) {
          results.skippedNoConsent++;
          continue;
        }

        const name = String(payload.name || "").trim();
        const phone = String(payload.phone || "").trim();
        const email = String(payload.email || "")
          .trim()
          .toLowerCase();

        if (!name || !phone || !email) {
          results.errors++;
          continue;
        }

        const quizCompleted = await hasCompletedQuiz(
          supabaseUrl,
          supabaseServiceRoleKey,
          email,
          phone
        );

        if (quizCompleted) {
          results.skippedAlreadyCompleted++;

          await markEventProcessed(
            supabaseUrl,
            supabaseServiceRoleKey,
            event.id,
            "quiz_completed"
          );

          continue;
        }

        const sendResult =
          await MetaWhatsAppService.sendContentPsychologyQuizFollowup(
            phone,
            name
          );

        if (sendResult.success) {
          results.quizFollowupsSent++;

          await markEventProcessed(
            supabaseUrl,
            supabaseServiceRoleKey,
            event.id,
            "quiz_followup_sent"
          );
        } else {
          console.error(
            `[CONTENT PSYCHOLOGY ${requestId}] Quiz follow-up failed for ${email}:`,
            sendResult.error
          );

          results.errors++;
        }
      } catch (error) {
        console.error(
          `[CONTENT PSYCHOLOGY ${requestId}] Lead follow-up error:`,
          error
        );

        results.errors++;
      }
    }

    /*
     * ---------------------------------------------------
     * 2. QUIZ COMPLETED BUT WEBINAR NOT PURCHASED
     * ---------------------------------------------------
     */
    const quizEvents = await getEvents(
      supabaseUrl,
      supabaseServiceRoleKey,
      "content_psychology_quiz_lead"
    );

    for (const event of quizEvents) {
      try {
        if (!event?.id || !event?.payload) {
          continue;
        }

        if (!isOlderThanOneHour(event.created_at)) {
          continue;
        }

        const payload = event.payload;

        if (!hasWhatsAppConsent(payload)) {
          results.skippedNoConsent++;
          continue;
        }

        const name = String(payload.name || "").trim();
        const phone = String(payload.phone || "").trim();
        const email = String(payload.email || "")
          .trim()
          .toLowerCase();

        const resultTitle = String(
          payload.result_title ||
            payload.result_key ||
            "your content blind spot"
        ).trim();

        if (!name || !phone || !email) {
          results.errors++;
          continue;
        }

        const paid = await hasPaidRegistration(
          supabaseUrl,
          supabaseServiceRoleKey,
          email,
          phone
        );

        if (paid) {
          results.skippedAlreadyPaid++;

          await markEventProcessed(
            supabaseUrl,
            supabaseServiceRoleKey,
            event.id,
            "webinar_paid"
          );

          continue;
        }

        const sendResult =
          await MetaWhatsAppService.sendContentPsychologyWebinarFollowup(
            phone,
            name,
            resultTitle
          );

        if (sendResult.success) {
          results.webinarFollowupsSent++;

          await markEventProcessed(
            supabaseUrl,
            supabaseServiceRoleKey,
            event.id,
            "webinar_followup_sent"
          );
        } else {
          console.error(
            `[CONTENT PSYCHOLOGY ${requestId}] Webinar follow-up failed for ${email}:`,
            sendResult.error
          );

          results.errors++;
        }
      } catch (error) {
        console.error(
          `[CONTENT PSYCHOLOGY ${requestId}] Quiz follow-up error:`,
          error
        );

        results.errors++;
      }
    }

    console.log(
      `[CONTENT PSYCHOLOGY ${requestId}] Follow-up run completed:`,
      results
    );

    return NextResponse.json(
      {
        success: true,
        requestId,
        results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      `[CONTENT PSYCHOLOGY ${requestId}] Cron failed:`,
      error
    );

    return NextResponse.json(
      {
        success: false,
        requestId,
        message:
          error?.message ||
          "Content Psychology follow-up cron failed.",
      },
      { status: 500 }
    );
  }
}
