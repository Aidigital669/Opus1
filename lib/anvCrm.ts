/**
 * AnvReality CRM Lead Dispatch Helper (Option B: Client-Side Direct Submission)
 *
 * Use this helper if submitting directly from a client component, modal,
 * or floating bar without routing through the Next.js API.
 */

export interface AnvCrmLeadPayload {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  bhk?: string;
  configuration?: string;
  budget?: string;
  location?: string;
  source?: string;
  project?: string;
  utm_source?: string;
  utm_campaign?: string;
}

export interface AnvCrmResponse {
  success: boolean;
  message: string;
  lead?: {
    id: number;
    code: string;
    name: string;
    phone: string;
    email?: string;
    propertyInterest?: string;
    source: string;
    stage: string;
    temperature: string;
    leadScore: number;
    scoreTier: string;
    assignedTo?: string;
  };
}

export async function submitLeadToAnvCrm(
  formData: AnvCrmLeadPayload,
  customEndpoint?: string
): Promise<AnvCrmResponse> {
  const endpoint =
    customEndpoint ||
    process.env.NEXT_PUBLIC_ANV_CRM_WEBHOOK_URL ||
    "/api/enquiries";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      source: formData.source || "opus1profile.com",
      project: formData.project || "Opus 1 Profile",
      location: formData.location || "JM Road, Shivajinagar, Pune",
      budget: formData.budget || "On Request",
      bhk: formData.bhk || formData.configuration || "Commercial Office",
    }),
  });

  return await response.json();
}
