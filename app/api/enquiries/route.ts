import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const enquirySchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name is too long")
      .optional(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long")
      .optional(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(20, "Phone number is too long"),
    email: z.string().email("Please enter a valid business email address"),
    office: z.string().optional().default("General Enquiry"),
    bhk: z.string().optional(),
    configuration: z.string().optional(),
    budget: z.string().optional(),
    location: z.string().optional(),
    project: z.string().optional(),
    enquiryType: z.string().optional().default("Request Information"),
    message: z.string().max(1000).optional().default(""),
    consent: z.boolean().optional().default(true),
    source: z.string().optional(),
    utm_source: z.string().optional(),
    utm_campaign: z.string().optional(),
  })
  .refine((data) => Boolean(data.fullName || data.name), {
    message: "Name is required (fullName or name)",
    path: ["fullName"],
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key, Authorization",
    },
  });
}

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
    const leadName = (validData.name || validData.fullName || "").trim();
    const leadPhone = validData.phone.trim();
    const leadEmail = validData.email.trim();
    const leadProject = validData.project || "Opus 1 Profile";
    const leadBhk =
      validData.bhk ||
      validData.configuration ||
      validData.office ||
      "Commercial Office";
    const leadBudget = validData.budget || "On Request";
    const leadLocation =
      validData.location || "JM Road, Shivajinagar, Pune";
    const leadMessage =
      validData.message ||
      (validData.enquiryType ? `Type: ${validData.enquiryType}` : "");
    const leadSource = validData.source || "opus1profile.com";
    const utmSource = validData.utm_source || "";
    const utmCampaign = validData.utm_campaign || "";

    const timestamp = new Date().toISOString();
    const referenceId = `OPUS-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    let crmDispatched = false;
    let crmLeadData: unknown = null;

    // 1. Dispatch lead to AnvReality CRM pipeline
    try {
      const crmWebhookUrl =
        process.env.ANV_CRM_WEBHOOK_URL ||
        process.env.CRM_WEBHOOK_URL ||
        "https://anvreeality.in/api/crm/leads/webhook";

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (process.env.ANV_CRM_API_KEY) {
        headers["x-api-key"] = process.env.ANV_CRM_API_KEY;
      }

      const crmPayload = {
        name: leadName,
        phone: leadPhone,
        email: leadEmail,
        project: leadProject,
        bhk: leadBhk,
        budget: leadBudget,
        location: leadLocation,
        message: leadMessage,
        source: leadSource,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        referenceId,
        timestamp,
      };

      const crmResponse = await fetch(crmWebhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(crmPayload),
      });

      if (crmResponse.ok) {
        crmDispatched = true;
        const resJson = await crmResponse.json().catch(() => null);
        crmLeadData = resJson?.lead || null;
      } else {
        const errorText = await crmResponse.text().catch(() => "");
        console.warn(
          `AnvReality CRM webhook responded with status ${crmResponse.status}: ${errorText}`
        );
      }
    } catch (crmErr) {
      console.error("Failed to push lead to AnvReality CRM:", crmErr);
      // Silent catch so visitor form submission does not fail
    }

    // 2. Dispatch via Resend email if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL || "info@profile.net.in";
    let emailDispatched = false;

    if (resendApiKey) {
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
            subject: `[The Opus 1] New Commercial Enquiry: ${leadName} (${leadBhk})`,
            html: `
              <h2>New Commercial Enquiry — The Opus 1</h2>
              <p><strong>Reference:</strong> ${referenceId}</p>
              <p><strong>Name:</strong> ${leadName}</p>
              <p><strong>Phone:</strong> ${leadPhone}</p>
              <p><strong>Email:</strong> ${leadEmail}</p>
              <p><strong>Office / Configuration:</strong> ${leadBhk}</p>
              <p><strong>Location:</strong> ${leadLocation}</p>
              <p><strong>Budget:</strong> ${leadBudget}</p>
              <p><strong>Enquiry Type:</strong> ${validData.enquiryType || "Request Information"}</p>
              <p><strong>Message:</strong> ${leadMessage || "None provided"}</p>
              <p><strong>Source:</strong> ${leadSource}</p>
              <p><strong>Received At:</strong> ${timestamp}</p>
            `,
          }),
        });
        if (emailResponse.ok) {
          emailDispatched = true;
        }
      } catch (err) {
        console.error("Resend dispatch error:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        status: "delivered",
        referenceId,
        provider: crmDispatched
          ? "ANV_REALITY_CRM"
          : emailDispatched
          ? "RESEND_EMAIL"
          : "LOCAL_CAPTURE",
        message:
          "Enquiry submitted successfully. Our sales team will get in touch shortly.",
        lead: crmLeadData || undefined,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
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
