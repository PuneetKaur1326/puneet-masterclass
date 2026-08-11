import { NextResponse } from "next/server";
import { submitRegistration, GoogleSheetPayload } from "@/lib/googleSheets";

function generateRegistrationId() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
  return `REG-${yyyy}${mm}${dd}-${randomSuffix}`;
}

export async function POST(req: Request) {
  const requestId = Math.random().toString(36).substring(7);
  try {
    console.log(`[REGISTER API - ${requestId}] Request received`);

    // Validate Environment Variable Before Processing
    if (!process.env.GOOGLE_SHEET_WEBHOOK) {
      console.error(`[REGISTER API - ${requestId}] CRITICAL ERROR: GOOGLE_SHEET_WEBHOOK environment variable is not configured.`);
      return NextResponse.json(
        { success: false, message: "Server misconfiguration. GOOGLE_SHEET_WEBHOOK is missing." },
        { status: 500 }
      );
    }
    console.log(`[REGISTER API - ${requestId}] Environment validated successfully`);

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
      console.warn(`[REGISTER API - ${requestId}] Validation failed: Missing required fields`);
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const registrationId = generateRegistrationId();

    const payload: GoogleSheetPayload = {
      action: "register",
      registrationId,
      fullName,
      email,
      phone,
      occupation,
      goal,
      challenge: challenge || "",
    };

    console.log(`[REGISTER API - ${requestId}] Submitting to Google Apps Script for phone: ${phone}, ID: ${registrationId}`);
    const result = await submitRegistration(payload, requestId);

    if (result.success) {
      console.log(`[REGISTER API - ${requestId}] Google Apps Script response: success`);
      // Return registrationId back to frontend so it can be passed to create-order
      return NextResponse.json({ success: true, registrationId });
    } else {
      console.error(`[REGISTER API - ${requestId}] Google Apps Script response: failed - ${result.message}`);
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error(`[REGISTER API - ${requestId}] Uncaught API Route Error:`, error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
