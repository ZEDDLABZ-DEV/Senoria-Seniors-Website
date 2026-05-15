"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";

const services = [
  {
    title: "Personal Care",
    description:
      "Our planned personal care services will offer dignified assistance with daily living activities such as bathing, grooming, dressing, and mobility — tailored to each individual's needs and preferences.",
    image: "/images/service-personal-care.jpg",
    imageAlt: "Caregiver gently combing and grooming an elderly person's hair at home",
    gradient: "from-emerald-500 to-emerald-600",
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
    title: "Respite Care",
    description:
      "Our upcoming respite care services will provide temporary relief for primary caregivers, ensuring seniors continue to receive quality care while their families take a well-deserved break.",
    image: "/images/cta-hands.jpg",
    imageAlt: "Caregiver's supportive hands holding an elderly person's hand, offering relief and reassurance",
    gradient: "from-amber-500 to-amber-600",
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
    title: "Light Housekeeping",
    description:
      "Our upcoming light housekeeping support will help seniors maintain a clean, safe, and comfortable home — covering tidying, laundry, dishes, and everyday household tasks without disrupting their routine.",
    image: "/images/service-home-support.jpg",
    imageAlt: "Caregiver tidying a senior's home with light housekeeping tasks",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    title: "Meal Preparation",
    description:
      "We are designing meal preparation services that deliver nutritious, dietitian-friendly meals tailored to each senior's preferences and health needs, supporting healthier living one plate at a time.",
    image: "/images/service-long-term-care.jpg",
    imageAlt: "Caregiver preparing a healthy home-cooked meal for an elderly person",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    title: "Foot Care",
    description:
      "Our planned foot care services will provide gentle, hygienic, and routine foot care from trained professionals — helping seniors stay comfortable, mobile, and confident on their feet.",
    image: "/images/footcare.jpg",
    imageAlt: "Trained professional providing gentle foot care to an elderly person",
    gradient: "from-primary-500 to-primary-600",
  },
  {
    title: "Transportation",
    description:
      "We are building safe and reliable transportation support to help seniors get to medical appointments, errands, social visits, and community activities — preserving their independence and connection.",
    image: "/images/transportaion.jpg",
    imageAlt: "Caregiver helping a senior into a vehicle for a transportation service",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Post-Discharge Care",
    description:
      "Our upcoming post-discharge care will provide structured support after a hospital stay — including recovery monitoring, medication reminders, and daily assistance — to help seniors heal safely at home.",
    image: "/images/postDischarge.jpg",
    imageAlt: "Caregiver supporting a senior recovering at home after hospital discharge",
    gradient: "from-sky-500 to-sky-600",
  },
  {
    title: "Nursing Services",
    description:
      "We are developing professional nursing services delivered by qualified nurses — covering wound care, medication management, chronic condition support, and ongoing clinical oversight.",
    image: "/images/impact-families.jpg",
    imageAlt: "Qualified nurse providing professional clinical care to an elderly patient",
    gradient: "from-teal-500 to-teal-600",
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
