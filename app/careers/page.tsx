"use client";

import { useState, FormEvent, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/Container";

const positions = [
  "Caregiver",
  "Senior Caregiver",
  "Live-In Caregiver",
  "Personal Support Worker (PSW)",
  "Certified Nursing Assistant (CNA)",
  "Companion / Sitter",
  "Other",
];

const experienceOptions = [
  "Less than 1 year",
  "1 – 2 years",
  "3 – 5 years",
  "6 – 10 years",
  "10+ years",
];

const availabilityOptions = [
  "Full-time",
  "Part-time",
  "Weekends Only",
  "Evenings / Nights",
  "Live-In",
  "Flexible",
];

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  availability: string;
  certifications: string;
  coverLetter: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  position: "",
  experience: "",
  availability: "",
  certifications: "",
  coverLetter: "",
};

export default function CareersPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setErrorMsg("");

    if (!file) {
      setResume(null);
      return;
    }

    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setErrorMsg("Resume must be a PDF or Word document (.pdf, .doc, .docx).");
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      setErrorMsg("Resume must be 5 MB or smaller.");
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setResume(file);
  };

  const clearResume = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!resume) {
      setErrorMsg("Please upload your resume.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.append("resume", resume);

      const res = await fetch("/api/careers", {
        method: "POST",
        body: payload,
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
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0d9488"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-900">
              Application Received!
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Thank you for applying to join the Senoria Seniors caregiving
              team. We&apos;ve received your application and resume, and our team
              will review it carefully. We&apos;ll be in touch with next steps
              soon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-700"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold tracking-wide text-primary-700 uppercase">
                Careers
              </span>
              <h1 className="mt-4 mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Join Our Caregiving Team
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                We&apos;re building a kinder, smarter future for senior care —
                and we&apos;d love your help. If you have a heart for service
                and experience supporting older adults, fill in the form below
                and attach your resume. Our team will be in touch.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="location"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Location (City, State/Province){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Vancouver, BC"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="position"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Position Applied For{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={form.position}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a position
                    </option>
                    {positions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 md:col-span-1">
                  <label
                    htmlFor="experience"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Years of Experience{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    required
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select experience level
                    </option>
                    {experienceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="availability"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Availability <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    required
                    value={form.availability}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select your availability
                    </option>
                    {availabilityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="certifications"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Certifications & Qualifications{" "}
                    <span className="text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="certifications"
                    name="certifications"
                    rows={3}
                    value={form.certifications}
                    onChange={handleChange}
                    placeholder="e.g. CPR/First Aid, PSW Certificate, Dementia Care training..."
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="coverLetter"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Why do you want to join Senoria Seniors?{" "}
                    <span className="text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={4}
                    value={form.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself and your passion for caregiving..."
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Resume <span className="text-red-500">*</span>
                  </label>

                  {!resume ? (
                    <label
                      htmlFor="resume"
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/50 px-4 py-8 text-center transition-colors hover:border-primary-400 hover:bg-primary-50/40"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="text-sm font-medium text-slate-700">
                        Click to upload your resume
                      </span>
                      <span className="text-xs text-slate-500">
                        PDF, DOC, or DOCX · up to 5 MB
                      </span>
                      <input
                        id="resume"
                        name="resume"
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between gap-3 rounded-lg border border-primary-200 bg-primary-50/60 px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-primary-600 shadow-sm">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            {resume.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(resume.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearResume}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-red-600"
                        aria-label="Remove resume"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {status === "error" && errorMsg && (
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
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
