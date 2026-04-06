"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";

const audiences = [
  {
    title: "Families",
    description:
      "Peace of mind through transparent, real-time care updates. Always know how your loved one is doing — without having to ask.",
    image: "/images/impact-families.jpg",
    imageAlt: "Family member caring for elderly loved one at home",
    gradient: "from-rose-50 to-primary-50",
    accentColor: "text-rose-500",
    borderColor: "border-rose-100",
  },
  {
    title: "Care Agencies",
    description:
      "Better operational visibility and accountability across your entire care team. Make data-driven decisions to improve service quality.",
    image: "/images/impact-agency.jpg",
    imageAlt: "Care agency nurse assisting senior patient with daily activities",
    gradient: "from-primary-50 to-teal-50",
    accentColor: "text-primary-500",
    borderColor: "border-primary-100",
  },
  {
    title: "Caregivers",
    description:
      "Simple, intuitive tools to document and communicate care activities. Focus on providing great care while the system handles the rest.",
    image: "/images/impact-caregiver.jpg",
    imageAlt: "Caregiver documenting care activities for senior patient",
    gradient: "from-teal-50 to-emerald-50",
    accentColor: "text-teal-500",
    borderColor: "border-teal-100",
  },
];

const stats = [
  { label: "Real-Time Care Updates", sublabel: "Live visibility into every visit" },
  { label: "AI-Powered Summaries", sublabel: "Intelligent care pattern analysis" },
  { label: "Centralized Management", sublabel: "One platform for all stakeholders" },
];

function AudienceCard({ audience, index }: { audience: typeof audiences[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className={`overflow-hidden rounded-xl border ${audience.borderColor} bg-gradient-to-br ${audience.gradient} transition-shadow hover:shadow-lg`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={audience.image}
          alt={audience.imageAlt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
      </div>
      <div className="p-6 pt-4">
        <h3 className="mb-2 text-xl font-bold text-slate-800">{audience.title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{audience.description}</p>
      </div>
    </motion.div>
  );
}

export default function ImpactSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <SectionWrapper id="impact" background="white">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold tracking-wide text-primary-600 uppercase">
            Impact
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Better Outcomes for Everyone Involved
          </h2>
          <p className="text-lg leading-relaxed text-slate-500">
            Senoria Seniors is designed to benefit every stakeholder in the care
            ecosystem — from the families who worry to the caregivers who serve.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {audiences.map((audience, i) => (
            <AudienceCard key={audience.title} audience={audience} index={i} />
          ))}
        </div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-8 md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="mb-1 flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-400" />
                  <span className="text-lg font-bold text-white">{stat.label}</span>
                </div>
                <p className="text-sm text-slate-400">{stat.sublabel}</p>
                {i < stats.length - 1 && (
                  <div className="mx-auto mt-8 hidden h-px w-full bg-slate-700 md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
