# The Opus 1 by Profile — Commercial Real Estate Website

A production-quality, responsive single-page commercial website for **The Opus 1 by Profile**, located in Revenue Colony, Shivajinagar, Pune, Maharashtra.

Built with **Next.js 14 App Router**, **React 18**, **TypeScript**, **Tailwind CSS**, **Lucide React**, and **React Hook Form + Zod**.

---

## 🏢 Project Overview

- **Project:** The Opus 1
- **Developer:** Profile (Over 3 Million Sq.Ft delivered, ongoing, and upcoming)
- **Location:** S.No. 1170/9, Behind Hotel Surbhi, Revenue Colony, Pune – 411005
- **Configurations:** 4 Commercial Offices per Floor (806 to 1,289 Sq.Ft. saleable area)
- **Key Features:** Architectural Glass Facade, Ensuite Private Washrooms for each office, Dual Lifts with DG Backup, IGBC-Certified Green Building Design.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript with strict typing
- **Styling:** Tailwind CSS with custom editorial brand tokens (`ivory`, `charcoal`, `gold`, `sand`)
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form, Zod schema validation
- **Image Optimization:** Next.js `Image` with WebP derivatives and responsive `sizes`
- **SEO & Accessibility:** Open Graph metadata, JSON-LD Schema (RealEstateListing), robots.ts, sitemap.ts, semantic HTML landmarks, and keyboard-friendly lightboxes.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm 9+ or pnpm / yarn

### 2. Installation
```bash
# Clone or navigate to the repository
cd d:/AiDigitals_Projects/Opus

# Install dependencies
npm install
```

### 3. Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Linting
```bash
# Type check and build
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

---

## 📁 Image Assets Mapping

All assets are located in `public/images/` and were extracted directly from the official developer brochure (`The Opus2240626.pdf`):

| File Path | Description | Brochure Source |
| :--- | :--- | :--- |
| `/images/opus-hero.webp` | Full exterior building render (16:9 daylight view) | Page 8 |
| `/images/opus-exterior.webp` | Vertical architectural elevation & facade louvers | Page 4 |
| `/images/opus-floor-plan.webp` | Master typical commercial floor plate | Page 5 |
| `/images/opus-office-01.webp` | Office 01 unit layout & area schedule (1,289 sq.ft.) | Page 6 |
| `/images/opus-office-02.webp` | Office 02 unit layout & area schedule (1,193 sq.ft.) | Page 6 |
| `/images/opus-office-03.webp` | Office 03 unit layout & area schedule (806 sq.ft.) | Page 9 |
| `/images/opus-office-04.webp` | Office 04 unit layout & area schedule (844 sq.ft.) | Page 9 |
| `/images/opus-location-map.webp` | Strategic Revenue Colony location roadmap | Page 3 |
| `/images/opus-amenities.webp` | Official 8-amenity iconographic plate | Page 7 |
| `/images/opus-gallery-art.webp` | Opulence lighting / "Living Works of Art" | Page 2 |
| `/images/profile-logo.png` | Profile developer brand mark | Page 1 & 8 |
| `/images/profile-logo-light-text.png` | Transparent logo with white typography | Page 8 |
| `/images/profile-logo-dark-text.png` | Transparent logo with charcoal typography | Page 8 |

---

## 📬 Enquiry Form & API Integration

The website implements an interactive enquiry form with dual client and server validation via `Zod`.

### Endpoint: `POST /api/enquiries`

#### Payload Format:
```json
{
  "fullName": "Rajesh Sharma",
  "phone": "+91 98765 43210",
  "email": "rajesh@company.com",
  "office": "Office 01",
  "enquiryType": "Schedule a Site Visit",
  "message": "Interested in 1,289 sq.ft layout for legal consultancy.",
  "consent": true
}
```

### Configuring External Notification Providers
The endpoint respects environment variables defined in `.env.local`:

1. **Option A: CRM / Webhook Delivery (Recommended for HubSpot, Zapier, Make, Slack)**
   ```env
   CRM_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/..."
   ```
2. **Option B: Resend Email API**
   ```env
   RESEND_API_KEY="re_123456789..."
   NOTIFICATION_EMAIL="info@profile.net.in"
   ```
3. **Demo / Unconfigured State:**
   If neither provider is configured, the endpoint returns an explicit status `setup_required` to avoid false delivery claims while verifying form submission integrity.

---

## 🌐 Deployment Guidelines

1. **Vercel / Netlify / Cloudflare Pages:**
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Output directory: `.next`
   - Environment variables: Set `NEXT_PUBLIC_SITE_URL` and `CRM_WEBHOOK_URL` / `RESEND_API_KEY`.

---

## 📄 License & Intellectual Property
Brochure content and trademarks belong to **Profile Developers**. Website implementation engineered for production commercial real-estate presentation.
