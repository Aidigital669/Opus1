"use client";

import React from "react";
import { PROJECT_DETAILS } from "@/data/project";

export default function StickyWhatsApp() {
  return (
    <aside
      className="hidden lg:block fixed left-6 bottom-8 z-40 select-none animate-fade-in"
      aria-label="Direct WhatsApp Communication"
    >
      <a
        href={PROJECT_DETAILS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center bg-gradient-to-tr from-[#1EBE5D] to-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#25D366]/40 border border-white/25 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
        aria-label="Chat with sales team on WhatsApp"
      >
        {/* Active Online Pulse Indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-charcoal-950" />
        </span>

        {/* Official WhatsApp Vector Logo */}
        <svg
          className="w-6 h-6 fill-current text-white shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.476-.15-.677.15-.201.3-.778.978-.953 1.178-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.785-1.675-2.086-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.63-.928-2.232-.244-.587-.492-.507-.677-.517-.175-.009-.376-.011-.577-.011s-.527.075-.802.376c-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.079 2.909 1.229 3.11.151.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.38.197 1.9-.119.58-.352 1.78-1.246 2.031-2.449.251-1.203.251-2.232.176-2.449-.075-.217-.276-.328-.577-.478zM12.042 21.844c-1.77 0-3.5-.477-5.016-1.378l-.36-.214-3.731.978.995-3.639-.234-.372c-.991-1.579-1.514-3.411-1.514-5.289 0-5.502 4.476-9.978 9.979-9.978 2.665 0 5.171 1.038 7.054 2.921 1.882 1.883 2.92 4.389 2.919 7.056 0 5.503-4.477 9.978-9.98 9.978zM12.042 0C5.399 0 0 5.399 0 12.042c0 2.122.553 4.195 1.603 6.014L0 24l6.115-1.603c1.761.96 3.753 1.467 5.927 1.467 6.643 0 12.042-5.399 12.042-12.042C24.084 5.399 18.685 0 12.042 0z" />
        </svg>

        {/* Expanding Text Label on Hover */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-semibold tracking-wide text-white group-hover:pl-2.5 group-hover:pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
