"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PROJECT_DETAILS } from "@/data/project";
import Reveal from "./Reveal";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Building,
  User,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Shield,
  Download,
  FileText,
} from "lucide-react";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name (at least 2 characters)")
    .max(100, "Full name must be under 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
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
  message: z.string().max(1000).optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Please agree to receive communications regarding your enquiry",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface EnquiryFormProps {
  selectedOffice?: string;
  onOfficeChangeHandled?: () => void;
}

export default function EnquiryForm({
  selectedOffice,
  onOfficeChangeHandled,
}: EnquiryFormProps) {
  const [submissionState, setSubmissionState] = useState<{
    status: "idle" | "submitting" | "delivered" | "setup_required" | "error";
    message?: string;
    referenceId?: string;
  }>({ status: "idle" });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      office: "General Enquiry",
      enquiryType: "Request Information",
      message: "",
      consent: true,
    },
  });

  // Automatically update selected office when clicked from an office card
  useEffect(() => {
    if (selectedOffice) {
      const validOptions = [
        "Office 01",
        "Office 02",
        "Office 03",
        "Office 04",
        "General Enquiry",
      ] as const;
      type OfficeOption = (typeof validOptions)[number];
      const match = validOptions.find((opt) => opt === selectedOffice);
      if (match) {
        setValue("office", match as OfficeOption);
        if (onOfficeChangeHandled) {
          onOfficeChangeHandled();
        }
      }
    }
  }, [selectedOffice, setValue, onOfficeChangeHandled]);

  const onSubmit = async (data: FormValues) => {
    setSubmissionState({ status: "submitting" });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (result.status === "setup_required") {
          // Explicit setup required notice per prompt requirement
          setSubmissionState({
            status: "setup_required",
            message: result.message,
            referenceId: result.referenceId,
          });
        } else {
          setSubmissionState({
            status: "delivered",
            message: result.message || "Enquiry submitted successfully",
            referenceId: result.referenceId,
          });
          reset();
        }
      } else {
        setSubmissionState({
          status: "error",
          message:
            result.error ||
            "Unable to submit enquiry. Please check your information and try again.",
        });
      }
    } catch {
      setSubmissionState({
        status: "error",
        message:
          "Network connection error occurred. Please check your connection or contact the sales desk directly.",
      });
    }
  };

  return (
    <section
      id="enquire"
      className="py-20 sm:py-28 bg-charcoal-950 text-white relative border-t border-charcoal-800"
      aria-label="Enquiry & Consultation Form"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form Introduction - Left to Right Reveal */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="left" distance={40} delay={50}>
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold font-semibold">
                <span className="w-8 h-px bg-gold" />
                <span>Direct Sales Engagement</span>
              </div>
            </Reveal>

            <Reveal direction="left" distance={50} delay={150}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-ivory-50 tracking-tight leading-tight">
                Request Project Dossier <br />
                <span className="italic text-gold-300">&amp; Site Visit.</span>
              </h2>
            </Reveal>

            <Reveal direction="left" distance={40} delay={250}>
              <p className="text-sm sm:text-base text-ivory-300 font-light leading-relaxed">
                Connect directly with Profile&apos;s authorized commercial sales team.
                Receive sanctioned floor plans, technical specifications, and
                schedule an exclusive site walk-through on JM Road,
                Shivajinagar.
              </p>
            </Reveal>

            {/* Value Highlights */}
            <Reveal direction="left" distance={30} delay={350}>
              <div className="space-y-4 pt-4 border-t border-charcoal-800">
                <div className="flex items-start space-x-3.5">
                  <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div className="text-xs text-ivory-300">
                    <span className="font-semibold text-white block">
                      Zero Obligation Advisory
                    </span>
                    Direct engagement with the developer team without brokerage or
                    intermediaries.
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div className="text-xs text-ivory-300">
                    <span className="font-semibold text-white block">
                      Flexible Site Previews
                    </span>
                    Custom walk-through schedules organized Monday through Saturday.
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Direct Phone Assistance */}
            <Reveal direction="left" distance={30} delay={450}>
              <div className="p-5 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-2 hover:border-gold/50 transition-colors shadow-lg">
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-400 block">
                  Immediate Sales Desk Assistance
                </span>
                <a
                  href={`tel:${PROJECT_DETAILS.phoneRaw}`}
                  className="text-xl font-serif text-gold hover:text-gold-light flex items-center space-x-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{PROJECT_DETAILS.phone}</span>
                </a>
                <span className="text-xs text-charcoal-500 block">
                  Monday to Saturday, 9:30 AM – 6:30 PM IST
                </span>
              </div>
            </Reveal>

            {/* Official Project Brochure Download */}
            <Reveal direction="left" distance={30} delay={520}>
              <a
                href={PROJECT_DETAILS.brochureUrl}
                download="The-Opus-1-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-gradient-to-r from-gold/15 via-gold/10 to-charcoal-900 hover:from-gold hover:to-gold-light border border-gold/50 hover:border-gold rounded-sm transition-all shadow-lg card-hover-modern"
                aria-label="Download Official Project Brochure PDF"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-gold/25 group-hover:bg-charcoal-950 text-gold group-hover:text-gold rounded-xs transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white group-hover:text-charcoal-950 transition-colors">
                      Download Official Brochure
                    </span>
                    <span className="text-[11px] font-mono text-gold-300 group-hover:text-charcoal-900 transition-colors">
                      Floor Plans & Specifications • PDF
                    </span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gold group-hover:text-charcoal-950 group-hover:translate-y-0.5 transition-transform shrink-0 ml-2" />
              </a>
            </Reveal>
          </div>

          {/* Right Column: Interactive Form Box - Right to Left Reveal */}
          <div className="lg:col-span-7">
            <Reveal direction="right" distance={50} delay={200}>
              <div className="bg-charcoal-900 border border-charcoal-800 rounded-sm p-6 sm:p-10 shadow-2xl hover:border-gold/40 transition-colors">
                {/* Form State Banners */}
                {submissionState.status === "delivered" && (
                  <div className="mb-8 p-5 bg-emerald-950/80 border border-emerald-600 rounded-sm flex items-start space-x-3.5 text-xs text-emerald-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-emerald-100 text-sm">
                        Enquiry Delivered Successfully
                      </p>
                      <p>{submissionState.message}</p>
                      {submissionState.referenceId && (
                        <p className="font-mono text-[11px] text-emerald-300 pt-1">
                          Reference ID: {submissionState.referenceId}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {submissionState.status === "setup_required" && (
                  <div className="mb-8 p-5 bg-amber-950/80 border border-amber-600 rounded-sm flex items-start space-x-3.5 text-xs text-amber-200">
                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <p className="font-semibold text-amber-100 text-sm">
                        Server Validation Confirmed (Setup Required)
                      </p>
                      <p className="leading-relaxed">
                        {submissionState.message}
                      </p>
                      <div className="p-2.5 bg-black/40 rounded-xs font-mono text-[11px] text-amber-300">
                        To deliver live emails or CRM leads, set <code className="text-white">RESEND_API_KEY</code> or <code className="text-white">CRM_WEBHOOK_URL</code> in your deployment environment variables.
                      </div>
                      {submissionState.referenceId && (
                        <p className="font-mono text-[10px] text-amber-400">
                          Logged Reference: {submissionState.referenceId}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {submissionState.status === "error" && (
                  <div className="mb-8 p-5 bg-rose-950/80 border border-rose-600 rounded-sm flex items-start space-x-3.5 text-xs text-rose-200">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-rose-100">Submission Error</p>
                      <p>{submissionState.message}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium uppercase tracking-wider text-ivory-200"
                    >
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="fullName"
                        type="text"
                        {...register("fullName")}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full bg-charcoal-950 border border-charcoal-700 rounded-sm px-4 py-3 text-sm text-white placeholder-charcoal-500 focus:outline-none focus:border-gold transition-colors"
                      />
                      <User className="w-4 h-4 text-charcoal-500 absolute right-3.5 top-3.5" />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 font-light">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="block text-xs font-medium uppercase tracking-wider text-ivory-200"
                      >
                        Phone Number <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          placeholder="+91 98765 43210"
                          className="w-full bg-charcoal-950 border border-charcoal-700 rounded-sm px-4 py-3 text-sm text-white placeholder-charcoal-500 focus:outline-none focus:border-gold transition-colors font-mono"
                        />
                        <Phone className="w-4 h-4 text-charcoal-500 absolute right-3.5 top-3.5" />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-rose-400 font-light">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium uppercase tracking-wider text-ivory-200"
                      >
                        Business Email <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="rajesh@enterprise.com"
                          className="w-full bg-charcoal-950 border border-charcoal-700 rounded-sm px-4 py-3 text-sm text-white placeholder-charcoal-500 focus:outline-none focus:border-gold transition-colors"
                        />
                        <Mail className="w-4 h-4 text-charcoal-500 absolute right-3.5 top-3.5" />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 font-light">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Office & Enquiry Type Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Office of Interest */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="office"
                        className="block text-xs font-medium uppercase tracking-wider text-ivory-200"
                      >
                        Office Configuration
                      </label>
                      <div className="relative">
                        <select
                          id="office"
                          {...register("office")}
                          className="w-full bg-charcoal-950 border border-charcoal-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none"
                        >
                          <option value="General Enquiry">General Commercial Enquiry</option>
                          <option value="Office 01">Office 01 (1,289 sq.ft.)</option>
                          <option value="Office 02">Office 02 (1,193 sq.ft.)</option>
                          <option value="Office 03">Office 03 (806 sq.ft.)</option>
                          <option value="Office 04">Office 04 (844 sq.ft.)</option>
                        </select>
                        <Building className="w-4 h-4 text-charcoal-500 absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Enquiry Type */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="enquiryType"
                        className="block text-xs font-medium uppercase tracking-wider text-ivory-200"
                      >
                        Enquiry Type
                      </label>
                      <div className="relative">
                        <select
                          id="enquiryType"
                          {...register("enquiryType")}
                          className="w-full bg-charcoal-950 border border-charcoal-700 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none"
                        >
                          <option value="Request Information">Request Information</option>
                          <option value="Schedule a Site Visit">Schedule a Site Visit</option>
                        </select>
                        <Calendar className="w-4 h-4 text-charcoal-500 absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium uppercase tracking-wider text-ivory-200"
                    >
                      Specific Requirements or Questions{" "}
                      <span className="text-charcoal-500 text-[10px] lowercase">
                        (optional)
                      </span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={3}
                        {...register("message")}
                        placeholder="Enter details regarding planned team size, timeline, or preferred meeting schedule..."
                        className="w-full bg-charcoal-950 border border-charcoal-700 rounded-sm px-4 py-3 text-sm text-white placeholder-charcoal-500 focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                      <MessageSquare className="w-4 h-4 text-charcoal-500 absolute right-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="space-y-1 pt-1">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className="mt-1 h-4 w-4 rounded-xs border-charcoal-700 bg-charcoal-950 text-gold focus:ring-gold focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-xs text-charcoal-400 leading-normal font-light">
                        I authorize the Profile sales desk to contact me via phone,
                        email, or WhatsApp regarding The Opus 1 commercial project in
                        accordance with data privacy standards.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-[11px] text-rose-400 font-light">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button with Shimmer Sweep */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full py-4 px-6 bg-gold hover:bg-gold-light active:bg-gold-dark disabled:opacity-50 text-charcoal-950 text-xs font-bold tracking-widest uppercase rounded-sm transition-all shadow-lg hover:shadow-gold/30 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold overflow-hidden active:scale-98"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                          <span className="relative z-10">Validating &amp; Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Submit Commercial Enquiry</span>
                          <Send className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-charcoal-500 font-mono">
                    Encrypted Transmission • Direct to Profile Sales Desk • No Third-Party Reselling
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
