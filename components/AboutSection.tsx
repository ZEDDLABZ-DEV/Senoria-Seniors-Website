"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";

const highlights = [
  {
    value: "20+",
    label: "Skilled Professionals",
    desc: "Licensed HCAs & Registered Nurses with hands-on Canadian healthcare experience.",
  },
  {
    value: "5+",
    label: "Languages Spoken",
    desc: "Punjabi, Hindi, English, Filipino, and more for culturally sensitive care.",
  },
  {
    value: "AI",
    label: "Future-Ready",
    desc: "Integrating advanced technology for real-time health updates to families.",
  },
];

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="about" background="light">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-5xl font-black tracking-wide text-primary-600 uppercase md:text-6xl">
            About Us
          </span>
          <h2 className="mb-5 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Compassionate Care,{" "}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              Canadian Values
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-500 italic">
            &ldquo;Good health is not something we can buy, but it can be an
            extremely valuable savings account.&rdquo;
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/vision-family-senior.jpg"
                alt="Senoria Seniors care team with elderly residents"
                width={700}
                height={500}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-primary-200/40 to-teal-200/40" />

            <div className="absolute -top-4 -left-4 rounded-xl border border-white/60 bg-white/90 px-5 py-3 shadow-lg backdrop-blur-sm">
              <div className="text-xs font-semibold tracking-wide text-teal-600 uppercase">
                Proudly Canadian
              </div>
              <div className="mt-0.5 text-sm font-bold text-slate-800">
                Registered &amp; Trusted
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                Senoria Seniors is a proudly Canadian-registered company
                committed to enhancing the overall health and well-being of
                Canadians—especially seniors and individuals requiring
                specialized care. Our mission is rooted in compassion, dignity,
                and excellence in care delivery.
              </p>
              <p>
                We have a dedicated team of more than 20 highly skilled
                professionals, including licensed Health Care Assistants and
                Registered Nurses, all with strong hands-on experience within
                Canadian healthcare systems. Our staff members are multilingual,
                speaking Punjabi, Hindi, English, Filipino, and other languages,
                ensuring clear communication and culturally sensitive care for
                every client.
              </p>
              <p>
                At Senoria Seniors, we believe in combining personalized care
                with innovation. Our future vision is to integrate advanced
                technologies, including Artificial Intelligence (AI), to provide
                real-time health updates to families—keeping them informed,
                reassured, and connected at all times.
              </p>
              <p>
                We are also committed to making quality care accessible. Our
                services are designed to be cost-effective, reasonably priced,
                and easy to afford without compromising on standards.
              </p>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="mt-16 grid gap-6 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={
                statsInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="rounded-xl border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mb-2 text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
                {item.value}
              </div>
              <div className="mb-1 text-sm font-bold text-slate-800">
                {item.label}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-xl border border-teal-100 bg-gradient-to-r from-primary-50 to-teal-50 px-8 py-6 text-center">
          <p className="text-base leading-relaxed text-slate-700 italic">
            &ldquo;Take care of your body—it&apos;s the only place you have to
            live. At Senoria Seniors, your health is our priority.&rdquo;
          </p>
        </div>
      </Container>
    </SectionWrapper>
  );
}
