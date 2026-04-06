"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";

const benefits = [
  {
    title: "Real-Time Care Visibility",
    description:
      "See care activities as they happen. Families and managers have a live view of visit status, completed tasks, and caregiver notes.",
    gradient: "from-primary-500 to-primary-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Intelligent Alerts",
    description:
      "Automated notifications flag missed medications, late visits, or unusual patterns — so nothing critical goes unnoticed.",
    gradient: "from-amber-500 to-amber-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Summaries",
    description:
      "Machine learning analyzes care patterns and generates easy-to-understand summaries, highlighting trends and potential concerns.",
    gradient: "from-violet-500 to-violet-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
        <circle cx="12" cy="15" r="1" />
      </svg>
    ),
  },
  {
    title: "Operational Management",
    description:
      "Care agencies gain a centralized view of service delivery across all clients, enabling data-driven decisions and quality improvements.",
    gradient: "from-teal-500 to-teal-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Secure Role-Based Access",
    description:
      "Granular permissions ensure each user — family member, caregiver, or manager — sees only what's relevant to their role.",
    gradient: "from-emerald-500 to-emerald-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function BenefitCard({ benefit, index }: { benefit: typeof benefits[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${benefit.gradient} text-white shadow-lg shadow-slate-900/5`}>
        {benefit.icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-800">{benefit.title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{benefit.description}</p>
    </motion.div>
  );
}

export default function KeyBenefitsSection() {
  return (
    <SectionWrapper id="benefits" background="light">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold tracking-wide text-primary-600 uppercase">
            Key Benefits
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Everything You Need for Better Care Management
          </h2>
          <p className="text-lg leading-relaxed text-slate-500">
            Senoria Seniors combines real-time visibility, intelligent automation, and
            secure access to transform how care is managed and communicated.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
