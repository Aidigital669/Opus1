import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PROJECT_DETAILS } from "@/data/project";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://theopus1.profile.net.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Opus 1 by Profile | Commercial Offices in Shivajinagar, Pune",
  description:
    "Discover The Opus 1 by Profile — boutique commercial office spaces from 806 to 1,289 sq.ft. on JM Road, Shivajinagar, Pune. Featuring an architectural glass facade, exclusive washrooms with every office, and IGBC-certified design.",
  keywords: [
    "The Opus 1",
    "Profile",
    "Commercial offices Shivajinagar",
    "Offices on JM Road Pune",
    "Commercial real estate Pune",
    "Boutique office spaces Pune",
    "Profile real estate",
  ],
  authors: [{ name: "Profile" }],
  creator: "Profile",
  publisher: "Profile",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "The Opus 1 by Profile | Commercial Offices in Shivajinagar, Pune",
    description:
      "A New Perspective on Business. Thoughtfully designed commercial destinations on JM Road, Shivajinagar, Pune.",
    url: siteUrl,
    siteName: "The Opus 1 by Profile",
    images: [
      {
        url: `${siteUrl}/images/opus-hero.webp`,
        width: 1920,
        height: 1080,
        alt: "The Opus 1 Commercial Elevation by Profile",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Opus 1 by Profile | Commercial Offices in Shivajinagar, Pune",
    description:
      "Boutique commercial offices on JM Road, Shivajinagar, Pune.",
    images: [`${siteUrl}/images/opus-hero.webp`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/profile-icon-mark.png", sizes: "32x32", type: "image/png" },
      { url: "/images/profile-icon-mark.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/profile-icon-mark.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: PROJECT_DETAILS.name,
    description: PROJECT_DETAILS.supportingCopy,
    url: siteUrl,
    image: `${siteUrl}/images/opus-hero.webp`,
    telephone: PROJECT_DETAILS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "S.No. 1170/9, Behind Hotel Surbhi, Revenue Colony",
      addressLocality: "Shivajinagar, Pune",
      postalCode: "411005",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.5308",
      longitude: "73.8475",
    },
    brand: {
      "@type": "Brand",
      name: PROJECT_DETAILS.developer,
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${jakarta.variable} font-sans bg-ivory text-charcoal antialiased selection:bg-gold selection:text-charcoal-950`}
      >
        {children}
      </body>
    </html>
  );
}
