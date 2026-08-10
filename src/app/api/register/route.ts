import { NextResponse } from "next/server";
import { submitRegistration, GoogleSheetPayload } from "@/lib/googleSheets";

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

    const payload: GoogleSheetPayload = {
      action: "insert",
      fullName,
      email,
      phone,
      occupation,
      goal,
      challenge: challenge || "",
      paymentStatus: "Pending",
      transactionId: "",
      whatsappStatus: "Pending",
    };

    console.log(`[REGISTER API - ${requestId}] Submitting to Google Apps Script for phone: ${phone}`);
    const result = await submitRegistration(payload, requestId);

    if (result.success) {
      console.log(`[REGISTER API - ${requestId}] Google Apps Script response: success`);
      return NextResponse.json({ success: true });
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
