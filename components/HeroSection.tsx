"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "./Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/40 to-teal-50/60 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span className="text-xs font-semibold tracking-wide text-primary-700 uppercase">
                Currently in Development
              </span>
            </div>

            <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Smarter Care for the{" "}
              <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
                People Who Matter Most
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
              We are building a platform to help families, caregivers, and care
              organizations stay connected through real-time care updates, intelligent
              alerts, and planned AI-powered insights — bringing transparency to every
              moment of care.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/25"
              >
                Join Early Access
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#problem"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:shadow-sm"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/10">
              <Image
                src="/images/hero-senior-care.jpg"
                alt="Caregiver assisting a senior woman at home"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

              <div className="absolute right-4 bottom-4 left-4 flex gap-3">
                {[
                  { label: "Track Visits", value: "Live" },
                  { label: "Care Tasks", value: "Auto" },
                  { label: "Smart Alerts", value: "AI" },
                ].map((stat) => (
                  <div key={stat.label} className="flex-1 rounded-lg bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                    <div className="text-lg font-bold text-primary-600">{stat.value}</div>
                    <div className="text-[10px] font-medium text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-primary-200/40 to-teal-200/40" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
