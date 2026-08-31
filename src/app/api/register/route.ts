import { NextResponse } from "next/server";

function generateRegistrationId() {
  const date = new Date();

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  return `REG-${yyyy}${mm}${dd}-${randomSuffix}`;
}

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);

  try {
    console.log(`[REGISTER API - ${requestId}] Request received`);

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(
        `[REGISTER API - ${requestId}] Supabase environment variables missing`
      );

      return NextResponse.json(
        {
          success: false,
          message: "Server misconfiguration. Supabase credentials are missing.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      occupation,
      goal,
      challenge,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !occupation || !goal) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const registrationId = generateRegistrationId();

    console.log(
      `[REGISTER API - ${requestId}] Creating registration ${registrationId}`
    );

    const supabaseResponse = await fetch(
      `${supabaseUrl}/rest/v1/registrations`,
      {
        method: "POST",
        headers: {
          apikey: supabaseServiceRoleKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          registration_id: registrationId,
          full_name: fullName,
          email,
          phone,
          occupation,
          goal,
          challenge: challenge || "",
          payment_status: "Pending",
          whatsapp_status: "Pending",
          reminder_status: "Pending",
          webinar_link_status: "Pending",
        }),
      }
    );

    const responseText = await supabaseResponse.text();

    let responseData: any;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    if (!supabaseResponse.ok) {
      console.error(
        `[REGISTER API - ${requestId}] Supabase insert failed:`,
        responseData
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to create registration",
          error: responseData,
        },
        { status: 500 }
      );
    }

    console.log(
      `[REGISTER API - ${requestId}] Registration created successfully`
    );

    return NextResponse.json(
      {
        success: true,
        registrationId,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error(
      `[REGISTER API - ${requestId}] Registration error:`,
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
