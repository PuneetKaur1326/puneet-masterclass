import { NextResponse } from "next/server";

function isValidIndianPhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(2, 10);

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(
        `[QUIZ LEAD ${requestId}] Supabase environment variables missing`
      );

      return NextResponse.json(
        {
          success: false,
          message: "Server misconfiguration. Please try again later.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const {
      name,
      phone,
      email,
      occupation,
      quizAnswers,
      resultKey,
      resultTitle,
    } = body;

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      typeof email !== "string" ||
      !isValidEmail(email.trim()) ||
      typeof phone !== "string" ||
      !isValidIndianPhone(phone.trim()) ||
      typeof occupation !== "string" ||
      !occupation.trim() ||
      !quizAnswers ||
      typeof quizAnswers !== "object" ||
      typeof resultKey !== "string" ||
      typeof resultTitle !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter valid details and complete the quiz.",
        },
        { status: 400 }
      );
    }

    const payload = {
      source: "content_psychology_quiz",
      page: "/psychology-behind-writing",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      occupation: occupation.trim(),
      quiz_answers: quizAnswers,
      result_key: resultKey,
      result_title: resultTitle,
      submitted_at: new Date().toISOString(),
    };

    const supabaseResponse = await fetch(
      `${supabaseUrl}/rest/v1/events`,
      {
        method: "POST",
        headers: {
          apikey: supabaseServiceRoleKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          event_type: "content_psychology_quiz_lead",
          payload,
          status: "captured",
        }),
      }
    );

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();

      console.error(
        `[QUIZ LEAD ${requestId}] Supabase insert failed:`,
        errorText
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to save your responses. Please try again.",
        },
        { status: 500 }
      );
    }

    console.log(
      `[QUIZ LEAD ${requestId}] Quiz response captured successfully`
    );

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[QUIZ LEAD ${requestId}] Fatal error:`, error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save your responses. Please try again.",
      },
      { status: 500 }
    );
  }
}
