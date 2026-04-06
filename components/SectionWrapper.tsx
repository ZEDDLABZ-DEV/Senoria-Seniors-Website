"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: "white" | "light" | "gradient";
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  background = "white",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const bgStyles = {
    white: "bg-white",
    light: "bg-slate-50",
    gradient: "bg-gradient-to-br from-primary-50 via-white to-teal-50",
  };

  return (
    <section
      ref={ref}
      id={id}
      className={`py-20 md:py-28 ${bgStyles[background]} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
