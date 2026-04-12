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
      "Our platform will support assisted living facilities with tools for managing daily activities including personal care, medication management, and social engagement — designed to help seniors live with dignity and independence.",
    image: "/images/service-assisted-living.jpg",
    imageAlt: "Caregiver assisting elderly resident with daily activities in assisted living facility",
    gradient: "from-primary-500 to-primary-600",
  },
  {
    title: "Long Term Care",
    description:
      "We are developing dedicated long-term care solutions for individuals requiring ongoing medical attention, rehabilitation, and round-the-clock supervision in a safe, supportive environment.",
    image: "/images/service-long-term-care.jpg",
    imageAlt: "Nurse providing attentive long-term care to senior patient",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    title: "Home Support Services",
    description:
      "Our upcoming home support module will enable flexible in-home care, allowing seniors to remain in the comfort of their own homes while receiving personalized assistance with daily routines, meals, and companionship.",
    image: "/images/service-home-support.jpg",
    imageAlt: "Home care worker supporting elderly person in their own home",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    title: "Dementia Care",
    description:
      "We are planning specialized care programs for individuals living with dementia and Alzheimer's, focusing on safety, cognitive engagement, routine stability, and compassionate support.",
    image: "/images/service-dementia-care.jpg",
    imageAlt: "Caregiver providing compassionate support to elderly person with dementia",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    title: "Respite Care",
    description:
      "Our upcoming respite care services will provide temporary relief for primary caregivers, ensuring seniors continue to receive quality care while their families take a well-deserved break.",
    image: "/images/hero-senior-care.jpg",
    imageAlt: "Senior receiving attentive temporary care from a professional caregiver",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    title: "Companionship",
    description:
      "We are building companionship programs designed to reduce isolation and loneliness among seniors through meaningful social interaction, engaging activities, and genuine human connection.",
    image: "/images/service-companionship.jpg",
    imageAlt: "Caregiver sharing a warm moment of companionship with an elderly person",
    gradient: "from-sky-500 to-sky-600",
  },
  {
    title: "Personal Care",
    description:
      "Our planned personal care services will offer dignified assistance with daily living activities such as bathing, grooming, dressing, and mobility — tailored to each individual's needs and preferences.",
    image: "/images/service-personal-care.jpg",
    imageAlt: "Caregiver gently combing and grooming an elderly person's hair at home",
    gradient: "from-emerald-500 to-emerald-600",
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
          <span className="mb-4 inline-block text-5xl font-black tracking-wide text-primary-600 uppercase md:text-6xl">
            Our Services
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Comprehensive Care, Tailored to Every Need
          </h2>
          <p className="text-lg leading-relaxed text-slate-500">
            We are building a full spectrum of senior care solutions — from independent
            living support to specialized dementia care — designed to ensure every
            individual receives the attention they deserve.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
