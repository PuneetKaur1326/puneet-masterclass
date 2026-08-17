import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  const expectedUsername = process.env.WHATSAPP_INBOX_USER;
  const expectedPassword = process.env.WHATSAPP_INBOX_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return new NextResponse("WhatsApp Inbox authentication is not configured.", {
      status: 503,
    });
  }

  if (!authorization?.startsWith("Basic ")) {
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="WhatsApp Inbox"',
      },
    });
  }

  const encodedCredentials = authorization.split(" ")[1];

  let credentials = "";

  try {
    credentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");
  } catch {
    return new NextResponse("Invalid authentication.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="WhatsApp Inbox"',
      },
    });
  }

  const separatorIndex = credentials.indexOf(":");

  if (separatorIndex === -1) {
    return new NextResponse("Invalid authentication.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="WhatsApp Inbox"',
      },
    });
  }

  const username = credentials.substring(0, separatorIndex);
  const password = credentials.substring(separatorIndex + 1);

  if (
    username !== expectedUsername ||
    password !== expectedPassword
  ) {
    return new NextResponse("Invalid username or password.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="WhatsApp Inbox"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/whatsapp-inbox/:path*",
    "/api/whatsapp/inbox/:path*",
    "/api/whatsapp/send/:path*",
  ],
};
