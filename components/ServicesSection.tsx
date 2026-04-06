"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";

const services = [
  {
    title: "Assisted Living",
    description:
      "Comprehensive support for daily activities including personal care, medication management, and social engagement — enabling seniors to live with dignity and independence.",
    image: "/images/service-assisted-living.jpg",
    imageAlt: "Caregiver assisting elderly resident with daily activities in assisted living facility",
    gradient: "from-primary-500 to-primary-600",
  },
  {
    title: "Long Term Care",
    description:
      "Dedicated long-term care solutions for individuals requiring ongoing medical attention, rehabilitation, and round-the-clock supervision in a safe, supportive environment.",
    image: "/images/service-long-term-care.jpg",
    imageAlt: "Nurse providing attentive long-term care to senior patient",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    title: "Home Support Services",
    description:
      "Flexible in-home care that allows seniors to remain in the comfort of their own homes while receiving personalized assistance with daily routines, meals, and companionship.",
    image: "/images/service-home-support.jpg",
    imageAlt: "Home care worker supporting elderly person in their own home",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    title: "Dementia Care",
    description:
      "Specialized care programs designed for individuals living with dementia and Alzheimer's, focusing on safety, cognitive engagement, routine stability, and compassionate support.",
    image: "/images/service-dementia-care.jpg",
    imageAlt: "Caregiver providing compassionate support to elderly person with dementia",
    gradient: "from-violet-500 to-violet-600",
  },
];

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent`} />
      </div>

      <div className="p-6">
        <div className={`mb-3 h-1 w-12 rounded-full bg-gradient-to-r ${service.gradient}`} />
        <h3 className="mb-2 text-xl font-bold text-slate-800">{service.title}</h3>
        <p className="text-sm leading-relaxed text-slate-500">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" background="white">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold tracking-wide text-primary-600 uppercase">
            Our Services
          </span>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Comprehensive Care, Tailored to Every Need
          </h2>
          <p className="text-lg leading-relaxed text-slate-500">
            We provide a full spectrum of senior care services — from independent
            living support to specialized dementia care — ensuring every individual
            receives the attention they deserve.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
