"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Container from "./Container";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="cta" className="relative overflow-hidden py-20 md:py-28">
      <Image
        src="/images/cta-hands.jpg"
        alt="Caring hands holding elderly person's hand showing compassion and support"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary-700/90 to-teal-700/90" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Be Part of the Future of Care Management
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-primary-100">
              Senoria Seniors is currently in development. Join our easy access
              program to be among the first to experience a smarter way to manage
              care — and help shape the platform from the ground up.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:shadow-xl"
              >
                Request Easy Access
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
              </a>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
