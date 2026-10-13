"use client";

import React from "react";

export default function MarqueeBanner() {
  const items = [
    "THE OPUS 1 BY PROFILE",
    "JM ROAD, SHIVAJINAGAR",
    "BOUTIQUE COMMERCIAL FLOORS",
    "4 OFFICE SPACES PER FLOOR",
    "806 – 1,289 SQ.FT.",
    "EXCLUSIVE PRIVATE WASHROOMS",
    "IGBC CERTIFIED DESIGN",
    "DUAL HIGH-SPEED LIFTS",
    "DIRECT 12M ROAD FRONTAGE",
    "3 MILLION SQ.FT DEVELOPER TRACK RECORD",
  ];

  return (
    <div className="relative w-full bg-charcoal-950 text-white py-3.5 border-y border-charcoal-800 overflow-hidden select-none">
      {/* Subtle edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-charcoal-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-charcoal-950 to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit whitespace-nowrap animate-marquee">
        {/* Double list for seamless infinite loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-5 sm:mx-8">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-ivory-200">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold ml-5 sm:ml-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
