import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import pg from "pg";

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

// Global PG pool for serverless reuse
let cachedPgPool: pg.Pool | null = null;
function getPgPool(connectionString: string): pg.Pool {
  if (!cachedPgPool) {
    cachedPgPool = new pg.Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    });
  }
  return cachedPgPool;
}

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
      "Commercial Office Space";
    const leadBudget = validData.budget || "On Request";
    const leadLocation =
      validData.location || "JM Road, Shivajinagar, Pune";
    const leadMessage =
      validData.message ||
      (validData.enquiryType ? `Enquiry Type: ${validData.enquiryType}` : "");
    const leadSource = validData.source || "opus1profile.com";
    const utmSource = validData.utm_source || "";
    const utmCampaign = validData.utm_campaign || "";

    const timestamp = new Date().toISOString();
    const referenceId = `OPUS-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    let crmDispatched = false;
    let crmLeadData: Record<string, unknown> | null = null;

    const formattedNotes = [
      `[Inbound from ${leadSource} | Ref: ${referenceId}]`,
      `Enquiry Type: ${validData.enquiryType || "General Information"}`,
      leadMessage ? `Message: ${leadMessage}` : null,
      utmSource ? `UTM Source: ${utmSource}` : null,
      utmCampaign ? `UTM Campaign: ${utmCampaign}` : null,
    ].filter(Boolean).join("\n");

    // --------------------------------------------------------------------------
    // METHOD 1: Direct Cloud Database Pipeline (Highest Reliability)
    // --------------------------------------------------------------------------
    const dbUrl = process.env.ANV_CRM_DATABASE_URL || "postgres://607ac197cce9ba6b210934c86eda288ba598d21cb67553bddcaf055916589000:sk_rQw4D9HRl3uuZGOyEoSDh@pooled.db.prisma.io:5432/postgres?sslmode=verify-full";
    if (dbUrl) {
      try {
        const pool = getPgPool(dbUrl);

        // Check if lead already exists
        const existing = await pool.query(
          "SELECT id, code, notes FROM crm_leads WHERE phone = $1 LIMIT 1",
          [leadPhone]
        );

        if (existing.rows && existing.rows.length > 0) {
          const oldLead = existing.rows[0];
          const newNotes = oldLead.notes
            ? `${oldLead.notes}\n\n---\n${formattedNotes}`
            : formattedNotes;

          const updated = await pool.query(
            `UPDATE crm_leads 
             SET notes = $1, temperature = 'hot', updated_at = NOW() 
             WHERE id = $2 
             RETURNING id, code, name, phone, email, stage, temperature`,
            [newNotes, oldLead.id]
          );

          crmDispatched = true;
          crmLeadData = updated.rows[0];
        } else {
          const code = `LD-${Math.floor(1000 + Math.random() * 9000)}`;
          const leadDna = JSON.stringify({
            configuration: leadBhk,
            targetBudget: leadBudget,
            preferredLocations: leadLocation,
            purchasePurpose: "Commercial / Office",
            sourceWebsite: leadSource,
          });

          const inserted = await pool.query(
            `INSERT INTO crm_leads (
              code, name, phone, email, designation, company, residence, is_nri, nri_tag,
              location, property_interest, bhk, carpet_sqft, budget, budget_raw,
              source, source_type, status, stage, temperature, assigned_to, notes, dna,
              created_at, updated_at
            )
            VALUES (
              $1, $2, $3, $4, 'Commercial Buyer', 'Enterprise', $5, false, null,
              $5, $6, $7, 'Flexible', $8, 20000000,
              $9, 'website', 'New Lead', 'new', 'hot', 'Unassigned', $10, $11,
              NOW(), NOW()
            )
            RETURNING id, code, name, phone, email, stage, temperature`,
            [
              code,
              leadName,
              leadPhone,
              leadEmail,
              leadLocation,
              leadProject,
              leadBhk,
              leadBudget,
              leadSource,
              formattedNotes,
              leadDna,
            ]
          );

          crmDispatched = true;
          crmLeadData = inserted.rows[0];
        }

        // Also record in WebsiteEnquiry
        try {
          await pool.query(
            `INSERT INTO "WebsiteEnquiry" (name, email, phone, subject, message, source, status, "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, 'New', NOW(), NOW())`,
            [
              leadName,
              leadEmail,
              leadPhone,
              `Enquiry for ${leadProject}: ${leadBhk}`,
              formattedNotes,
              leadSource,
            ]
          );
        } catch (enqErr) {
          console.warn(
            "WebsiteEnquiry insert notice:",
            (enqErr as Error)?.message || enqErr
          );
        }
      } catch (dbErr) {
        console.error("Direct Anv CRM DB sync error:", dbErr);
      }
    }

    // --------------------------------------------------------------------------
    // METHOD 2: HTTP Webhook Pipeline (Fallback if DB sync not active)
    // --------------------------------------------------------------------------
    if (!crmDispatched && process.env.ANV_CRM_WEBHOOK_URL) {
      try {
        const crmWebhookUrl = process.env.ANV_CRM_WEBHOOK_URL || "https://anvreeality.in/api/crm/leads/webhook";
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
        console.error("Failed to push lead to AnvReality CRM webhook:", crmErr);
      }
    }

    // --------------------------------------------------------------------------
    // METHOD 3: Dispatch via Resend Email (if configured)
    // --------------------------------------------------------------------------
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
