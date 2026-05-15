"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";

const servicesList = [
  "Personal Care",
  "Companionship",
  "Respite Care",
  "Dementia Care",
  "Light Housekeeping",
  "Meal Preparation",
  "Foot Care",
  "Transportation",
  "Post-Discharge Care",
  "Nursing Services",
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  services: string[];
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function RequestDemoPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    services: [],
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!servicesOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.services.length === 0) {
      setErrorMsg("Please select at least one service you are interested in.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-primary-50/40 to-teal-50/60">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-900">Thank You!</h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Your easy access request has been submitted successfully. We&apos;re
              currently working with early partners to shape the future of the
              platform and will be in touch with next steps soon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/40 to-teal-50/60 pt-24 pb-20 md:pt-32 md:pb-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Request Easy Access
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                Senoria Seniors is currently in development. Join our easy access
                program to be among the first to experience the platform. Fill in the
                form below and we&apos;ll keep you updated on our progress.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2 md:col-span-1">
                  <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, State / Country"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Services <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" ref={servicesRef}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((o) => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={servicesOpen}
                      className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-left text-sm text-slate-800 transition-colors hover:border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                    >
                      <span className={form.services.length === 0 ? "text-slate-400" : "text-slate-800"}>
                        {form.services.length === 0
                          ? "Select services you're interested in"
                          : `${form.services.length} service${form.services.length > 1 ? "s" : ""} selected`}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-slate-400 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {servicesOpen && (
                      <div
                        role="listbox"
                        aria-multiselectable="true"
                        className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                      >
                        {servicesList.map((service) => {
                          const checked = form.services.includes(service);
                          return (
                            <label
                              key={service}
                              className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleService(service)}
                                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                              />
                              {service}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {form.services.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {form.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => toggleService(service)}
                            aria-label={`Remove ${service}`}
                            className="text-primary-500 transition-colors hover:text-primary-700"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message <span className="text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your care management needs..."
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Request Easy Access
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
