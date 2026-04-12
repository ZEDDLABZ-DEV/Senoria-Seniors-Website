"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Container from "./Container";

export default function FutureSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="future" className="relative overflow-hidden py-20 md:py-28">
      <Image
        src="/images/future-connected.jpg"
        alt="Senior couple walking together outdoors representing the future of connected care"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/75" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-5xl font-black tracking-wide text-teal-600 uppercase md:text-6xl">
              The Future of Care
            </span>
            <h2 className="mb-8 text-4xl font-extrabold text-slate-900 md:text-5xl lg:text-6xl">
              Building the Future of{" "}
              <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
                Connected Care
              </span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-800">
              The care industry is on the cusp of a transformation. As populations age
              and care needs grow more complex, the demand for intelligent, connected
              care management systems will only increase.
            </p>
            <p className="text-lg leading-relaxed text-slate-800">
              We are building Senoria Seniors for this future — a platform that will evolve
              with the needs of caregivers, families, and organizations, leveraging planned
              AI capabilities and real-time data to ensure that care is not just delivered,
              but truly understood.
            </p>

            <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-primary-200 bg-white/90 px-6 py-3 shadow-sm backdrop-blur-sm">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-500"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm font-semibold text-primary-700">
                We are building toward a future where care is connected, transparent, and intelligent.
              </span>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
