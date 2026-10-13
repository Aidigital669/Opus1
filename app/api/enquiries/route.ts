import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/,
      "Please provide a valid contact phone number"
    ),
  email: z.string().email("Please enter a valid business email address"),
  office: z.enum([
    "Office 01",
    "Office 02",
    "Office 03",
    "Office 04",
    "General Enquiry",
  ]),
  enquiryType: z.enum(["Request Information", "Schedule a Site Visit"]),
  message: z.string().max(1000).optional().default(""),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must consent to being contacted regarding your enquiry",
    }),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = enquirySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = parseResult.data;
    const timestamp = new Date().toISOString();
    const referenceId = `OPUS-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Check configured external providers
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL || "info@profile.net.in";

    let dispatched = false;
    let providerName = "none";

    // 1. Dispatch to Webhook / CRM if configured
    if (crmWebhookUrl) {
      try {
        const webhookResponse = await fetch(crmWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceId,
            timestamp,
            project: "The Opus 1 by Profile",
            ...validData,
          }),
        });
        if (webhookResponse.ok) {
          dispatched = true;
          providerName = "CRM_WEBHOOK";
        }
      } catch (err) {
        console.error("Webhook dispatch error:", err);
      }
    }

    // 2. Dispatch via Resend if configured
    if (!dispatched && resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "The Opus 1 <enquiries@profile.net.in>",
            to: [notificationEmail],
            subject: `[The Opus 1] New Commercial Enquiry: ${validData.fullName} (${validData.office})`,
            html: `
              <h2>New Commercial Enquiry — The Opus 1</h2>
              <p><strong>Reference:</strong> ${referenceId}</p>
              <p><strong>Name:</strong> ${validData.fullName}</p>
              <p><strong>Phone:</strong> ${validData.phone}</p>
              <p><strong>Email:</strong> ${validData.email}</p>
              <p><strong>Office Selected:</strong> ${validData.office}</p>
              <p><strong>Enquiry Type:</strong> ${validData.enquiryType}</p>
              <p><strong>Message:</strong> ${validData.message || "None provided"}</p>
              <p><strong>Received At:</strong> ${timestamp}</p>
            `,
          }),
        });
        if (emailResponse.ok) {
          dispatched = true;
          providerName = "RESEND_EMAIL";
        }
      } catch (err) {
        console.error("Resend dispatch error:", err);
      }
    }

    // If an external provider was active and delivered the enquiry
    if (dispatched) {
      return NextResponse.json({
        success: true,
        status: "delivered",
        provider: providerName,
        referenceId,
        message:
          "Your enquiry has been successfully delivered to the sales desk. Our representative will contact you shortly.",
      });
    }

    // Explicit Setup Required Response (Per prompt specification)
    // Do not falsely claim email was delivered if no provider is configured!
    return NextResponse.json({
      success: true,
      status: "setup_required",
      referenceId,
      receivedAt: timestamp,
      summary: {
        fullName: validData.fullName,
        office: validData.office,
        enquiryType: validData.enquiryType,
      },
      message:
        "Enquiry verified and accepted by server. (Demo Mode: External delivery provider such as RESEND_API_KEY or CRM_WEBHOOK_URL is not yet configured in .env.local).",
    });
  } catch (error) {
    console.error("Enquiry processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error occurred while processing your enquiry",
      },
      { status: 500 }
    );
  }
}
