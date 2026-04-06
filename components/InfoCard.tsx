"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function InfoCard({
  icon,
  title,
  description,
  className = "",
}: InfoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.08)" }}
      transition={{ duration: 0.25 }}
      className={`rounded-xl border border-slate-100 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-100 to-teal-100 text-primary-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </motion.div>
  );
}
