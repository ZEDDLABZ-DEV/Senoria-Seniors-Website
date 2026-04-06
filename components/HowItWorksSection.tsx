"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";

const steps = [
  {
    number: "01",
    title: "Caregiver Logs Visit",
    description:
      "Caregivers check in and document care tasks, notes, and observations through an intuitive mobile-friendly interface.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Tasks Securely Recorded",
    description:
      "All care activities, medications administered, and visit details are securely recorded with timestamps and verification.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Families Receive Updates",
    description:
      "Family members access a personalized dashboard showing real-time care updates, visit summaries, and activity logs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Intelligent Alerts",
    description:
      "Automated alerts notify families and managers if critical care tasks are missed or if something important requires attention.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "AI-Powered Insights",
    description:
      "AI summaries provide clear, digestible insights into care patterns, trends, and areas that may need attention over time.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-teal-500 text-white shadow-lg shadow-primary-500/20 transition-transform group-hover:scale-105">
            {step.icon}
          </div>
          <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">
            {step.number}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold text-slate-800">{step.title}</h3>
        <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" background="gradient">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold tracking-wide text-primary-600 uppercase">
            How It Works
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            A Connected Care Workflow
          </h2>
          <p className="text-lg leading-relaxed text-slate-500">
            From care delivery to family updates — every step is connected, documented,
            and transparent.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-8 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent lg:block" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
