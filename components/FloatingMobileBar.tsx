"use client";

import React, { useEffect, useState } from "react";
import { PROJECT_DETAILS } from "@/data/project";
import { Phone, MessageSquare, Send } from "lucide-react";

interface FloatingMobileBarProps {
  onEnquireClick?: () => void;
}

export default function FloatingMobileBar({
  onEnquireClick,
}: FloatingMobileBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar only after scrolling past initial hero (e.g. 300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnquire = () => {
    if (onEnquireClick) {
      onEnquireClick();
    } else {
      const el = document.getElementById("enquire");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 bg-charcoal-950/95 backdrop-blur-md border-t border-charcoal-800 shadow-2xl animate-fade-in"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-label="Mobile Quick Actions"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Action */}
        <a
          href={`tel:${PROJECT_DETAILS.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-100 rounded-sm border border-charcoal-700/80 transition-all active:scale-95"
          aria-label="Call Sales Representative"
        >
          <Phone className="w-4 h-4 text-gold mb-1" />
          <span className="text-[10px] font-mono tracking-wider uppercase font-medium">
            Call
          </span>
        </a>

        {/* WhatsApp Action */}
        <a
          href={PROJECT_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-100 rounded-sm border border-emerald-700/60 transition-all active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-[10px] font-mono tracking-wider uppercase font-medium">
            WhatsApp
          </span>
        </a>

        {/* Enquire Action */}
        <button
          type="button"
          onClick={handleEnquire}
          className="group relative flex flex-col items-center justify-center py-2 px-1 bg-gold hover:bg-gold-light active:bg-gold-dark text-charcoal-950 rounded-sm font-semibold transition-all active:scale-95 shadow-md overflow-hidden"
          aria-label="Open Enquiry Form"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <Send className="w-4 h-4 mb-1 relative z-10" />
          <span className="text-[10px] font-mono tracking-wider uppercase font-bold relative z-10">
            Enquire
          </span>
        </button>
      </div>
    </div>
  );
}
