export interface OfficeUnit {
  id: string;
  number: string;
  title: string;
  saleableArea: string;
  saleableAreaNum: number;
  reraArea: string;
  usableArea: string;
  image: string;
  features: string[];
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SpecificationCategory {
  category: string;
  iconName: string;
  items: string[];
}

export interface ConnectivityGroup {
  category: string;
  iconName: string;
  destinations: {
    name: string;
    time: string;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
  aspectRatio: string;
  caption: string;
}

export const PROJECT_DETAILS = {
  name: "The Opus 1",
  developer: "PROFILE",
  tagline: "JM Road's New Business Hub",
  headline: "A New Perspective on Business.",
  supportingCopy:
    "Discover The Opus 1 by Profile — a thoughtfully designed commercial destination in the heart of Shivajinagar.",
  eyebrow: "JM ROAD, SHIVAJINAGAR, PUNE",
  locationState: "Pune, Maharashtra",
  address: "The Opus, S.No. 1170/9, Behind Hotel Surbhi, JM Road, Pune – 411005",
  corporateOffice: "'Prestige Icon', 14th Lane corner, Prabhat road, Pune 411004",
  phone: "+91 93730 20701",
  phoneRaw: "+919373020701",
  email: "info@profile.net.in",
  googleMapsUrl: "https://maps.app.goo.gl/1ZGhMzNrHtJuNNZTA",
  whatsappUrl:
    "https://wa.me/919373020701?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20The%20Opus%201%20by%20Profile%20on%20JM%20Road%2C%20Pune.",
  developerTrackRecord: "3 Million Sq.Ft delivered, ongoing, and upcoming projects",
  heroImage: "/images/opus-hero.webp",
  exteriorImage: "/images/opus-exterior.webp",
  floorPlanMaster: "/images/opus-floor-plan.webp",
  locationMapImage: "/images/opus-location-map.webp",
  amenitiesImage: "/images/opus-amenities.webp",
  profileLogo: "/images/profile-logo.png",
  profileLogoDark: "/images/profile-logo-dark-text.png",
  profileLogoLight: "/images/profile-logo-light-text.png",
};

export const OFFICE_UNITS: OfficeUnit[] = [
  {
    id: "office-01",
    number: "01",
    title: "Office 01",
    saleableArea: "1,289 sq.ft.",
    saleableAreaNum: 1289,
    reraArea: "889 sq.ft.",
    usableArea: "889 sq.ft.",
    image: "/images/opus-office-01.webp",
    features: [
      "Front-facing orientation towards 12M access road",
      "Exclusive private washroom with lintel-height dado",
      "Direct lift access off the central executive lobby",
      "Expansive glazing delivering natural daylight",
    ],
  },
  {
    id: "office-02",
    number: "02",
    title: "Office 02",
    saleableArea: "1,193 sq.ft.",
    saleableAreaNum: 1193,
    reraArea: "823 sq.ft.",
    usableArea: "823 sq.ft.",
    image: "/images/opus-office-02.webp",
    features: [
      "Longitudinal floor plate optimized for versatile desk layouts",
      "Private attached washroom with premium CP fittings",
      "Dual lift and staircase core access",
      "Energy-efficient facade glazing with acoustic dampening",
    ],
  },
  {
    id: "office-03",
    number: "03",
    title: "Office 03",
    saleableArea: "806 sq.ft.",
    saleableAreaNum: 806,
    reraArea: "556 sq.ft.",
    usableArea: "556 sq.ft.",
    image: "/images/opus-office-03.webp",
    features: [
      "Boutique executive layout tailored for private practices or consultancy",
      "Exclusive ensuite washroom facility",
      "Adjacent to central circulation spine",
      "High functional efficiency with zero corridor wastage",
    ],
  },
  {
    id: "office-04",
    number: "04",
    title: "Office 04",
    saleableArea: "844 sq.ft.",
    saleableAreaNum: 844,
    reraArea: "582 sq.ft.",
    usableArea: "582 sq.ft.",
    image: "/images/opus-office-04.webp",
    features: [
      "Corner position adjoining open-to-sky light shaft",
      "Exclusive attached washroom",
      "Cross-ventilation and optimal daylight infiltration",
      "Well-proportioned rectangular space for executive cabins",
    ],
  },
];

export const AMENITIES: AmenityItem[] = [
  {
    id: "amenity-lifts",
    title: "High-Quality Lifts with Generator Backup",
    description: "High-speed modern passenger elevators with dedicated DG generator power backup.",
    iconName: "ArrowUpDown",
  },
  {
    id: "amenity-lobby",
    title: "Decorative Entrance Lobby",
    description: "Elegantly finished ground reception and arrival lobby creating a commanding first impression.",
    iconName: "Building2",
  },
  {
    id: "amenity-washroom",
    title: "Exclusive Washroom with Every Office",
    description: "Every individual office unit enjoys its own private ensuite washroom facility.",
    iconName: "Bath",
  },
  {
    id: "amenity-facade",
    title: "Glass Facade",
    description: "Contemporary architectural glass envelope providing panoramic natural light and striking curb appeal.",
    iconName: "Maximize2",
  },
  {
    id: "amenity-access",
    title: "Smart-Card Access Control System",
    description: "State-of-the-art electronic smart card access ensuring controlled and monitored entry.",
    iconName: "CreditCard",
  },
  {
    id: "amenity-security",
    title: "Digital Security with CCTV & Video Door Phone",
    description: "Comprehensive 24/7 surveillance coverage paired with video door phone verification.",
    iconName: "ShieldCheck",
  },
  {
    id: "amenity-green",
    title: "IGBC-Certified Green Building",
    description: "Designed in accordance with Indian Green Building Council sustainable commercial principles.",
    iconName: "Leaf",
  },
  {
    id: "amenity-accessibility",
    title: "Wheelchair-Friendly Campus",
    description: "Barrier-free accessible pathways, ramps, and elevator provisions across common arrival areas.",
    iconName: "Accessibility",
  },
];

export const SPECIFICATIONS: SpecificationCategory[] = [
  {
    category: "Flooring",
    iconName: "Grid",
    items: [
      "Vitrified flooring for common passages and circulation corridors",
      "High-grade vitrified flooring within all individual offices",
    ],
  },
  {
    category: "Wall Finish",
    iconName: "Layers",
    items: [
      "Smooth gypsum finish on all internal walls",
      "Ready-to-paint premium architectural interior surfaces",
    ],
  },
  {
    category: "Washrooms",
    iconName: "Bath",
    items: [
      "Exclusive private washroom attached to every individual office",
      "Designer ceramic dado tiles up to lintel level in all toilets",
      "Good quality CP (chrome plated) and sanitary fittings",
    ],
  },
  {
    category: "Doors & Hardware",
    iconName: "DoorClosed",
    items: [
      "Laminated entrance doors engineered for commercial durability",
      "Good quality architectural fixtures, locks, and hardware",
    ],
  },
  {
    category: "Balcony & Terraces",
    iconName: "Minimize",
    items: [
      "Stainless steel (S.S.) railing with safety toughened glass for terraces",
      "Engineered weather-resistant perimeter architectural finishes",
    ],
  },
  {
    category: "Electrification & Backup",
    iconName: "Zap",
    items: [
      "High-quality modular switches and fire-retardant concealed copper wiring",
      "Common electrical points supported with generator backup",
      "Dedicated DG backup for lifts, water pumps, and essential common areas",
    ],
  },
];

export const CONNECTIVITY_DATA: ConnectivityGroup[] = [
  {
    category: "Transport Hubs",
    iconName: "Train",
    destinations: [
      { name: "Shivajinagar Bus Depot", time: "5 Mins" },
      { name: "Shivajinagar Railway Station", time: "5 Mins" },
      { name: "Pune Railway Station", time: "15 Mins" },
      { name: "Pune International Airport", time: "25 Mins" },
    ],
  },
  {
    category: "Residential Neighborhoods",
    iconName: "Home",
    destinations: [
      { name: "Model Colony", time: "5 Mins" },
      { name: "Bhosale Nagar", time: "10 Mins" },
      { name: "Prabhat Road", time: "10 Mins" },
      { name: "Sadashiv Peth", time: "10 Mins" },
      { name: "Karve Nagar", time: "15 Mins" },
      { name: "Kothrud", time: "15 Mins" },
      { name: "Aundh", time: "20 Mins" },
    ],
  },
  {
    category: "Healthcare & Hospitals",
    iconName: "Activity",
    destinations: [
      { name: "Oyster & Pearl Hospital", time: "5 Mins" },
      { name: "Hardikar Hospital", time: "5 Mins" },
      { name: "Sancheti Hospital", time: "5 Mins" },
      { name: "Sahyadri Hospital", time: "10 Mins" },
    ],
  },
  {
    category: "Key Civic Landmarks",
    iconName: "Landmark",
    destinations: [
      { name: "Pune Civil Court", time: "5 Mins" },
      { name: "PMC (Pune Municipal Corporation)", time: "5 Mins" },
    ],
  },
  {
    category: "Shopping & Retail Malls",
    iconName: "ShoppingBag",
    destinations: [
      { name: "Pune Central", time: "5 Mins" },
      { name: "The Pavillion Mall", time: "10 Mins" },
      { name: "Westend Mall, Aundh", time: "20 Mins" },
    ],
  },
  {
    category: "Luxury Hotels & Hospitality",
    iconName: "Hotel",
    destinations: [
      { name: "Pride Hotel", time: "5 Mins" },
      { name: "Ramee Grand Hotel", time: "5 Mins" },
      { name: "JW Marriott Pune", time: "10 Mins" },
      { name: "Sheraton Grand Pune", time: "10 Mins" },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-hero",
    title: "The Opus 1 Exterior Elevation",
    category: "Architecture",
    src: "/images/opus-hero.webp",
    aspectRatio: "aspect-[16/9]",
    caption:
      "Full street elevation showing the contemporary commercial glass envelope, warm beige stone framing, vertical architectural louvers, and landscaped arrival courtyard.",
  },
  {
    id: "gallery-facade",
    title: "Facade Glazing & Vertical Fins",
    category: "Details",
    src: "/images/opus-exterior.webp",
    aspectRatio: "aspect-[9/16]",
    caption:
      "Architectural facade perspective highlighting floor-to-ceiling office fenestration, stainless steel glass balconies, and vertical solar screening.",
  },
  {
    id: "gallery-floor-plan",
    title: "Master Commercial Floor Plate",
    category: "Planning",
    src: "/images/opus-floor-plan.webp",
    aspectRatio: "aspect-[9/16]",
    caption:
      "Typical commercial floor plate presenting four modular office layouts, dual high-speed lift core, and private executive washrooms.",
  },
];
