export interface GoogleSheetPayload {
  action?: "insert" | "update";
  fullName?: string;
  email?: string;
  phone: string; // Required for both insert and update as a key
  occupation?: string;
  goal?: string;
  challenge?: string;
  paymentStatus?: string;
  transactionId?: string;
  whatsappStatus?: string;
}

export async function submitRegistration(payload: GoogleSheetPayload, requestId: string = "internal") {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  
  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEET_WEBHOOK environment variable is not set.");
  }

  // Set default action to insert if not provided
  if (!payload.action) {
    payload.action = "insert";
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    console.log(`[GoogleSheets API - ${requestId}] Sending ${payload.action} request for phone ${payload.phone}...`);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Access Denied (403): Ensure the Apps Script is set to 'Anyone' can access.");
      }
      if (response.status === 404) {
        throw new Error("Not Found (404): The Apps Script URL might be incorrect or unpublished.");
      }
      throw new Error(`Google Apps Script responded with HTTP ${response.status}`);
    }

    const responseText = await response.text();
    
    // Check if the response is HTML instead of JSON
    if (responseText.trim().startsWith('<')) {
      console.error(`[GoogleSheets API - ${requestId}] Received HTML instead of JSON. The script might require Google authentication. Response snippet: ${responseText.substring(0, 100)}`);
      throw new Error("Received HTML response. The Apps Script likely requires authentication. Ensure 'Who has access' is set to 'Anyone'.");
    }

    try {
      const data = JSON.parse(responseText);
      return { success: true, data };
    } catch (parseError) {
      console.error(`[GoogleSheets API - ${requestId}] Failed to parse JSON response:`, responseText);
      throw new Error("Received invalid JSON from Google Apps Script.");
    }
  } catch (error: any) {
    console.error(`[GoogleSheets API - ${requestId}] Submission Error:`, error);
    
    let errorMessage = "Failed to submit to Google Sheets.";
    if (error.name === 'AbortError') {
      errorMessage = "Request to Google Sheets timed out after 10 seconds. Check script performance.";
    } else if (error.message === 'fetch failed' || error.cause?.code === 'ENOTFOUND') {
      errorMessage = "Network failure while reaching Google Apps Script.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
  }
}
