"use client";

import Image from "next/image";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";

export default function VisionSection() {
  return (
    <SectionWrapper id="vision" background="white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/vision-family-senior.jpg"
                alt="Family member spending time with elderly loved one"
                width={700}
                height={500}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-teal-200/40 to-primary-200/40" />
          </div>

          <div>
            <span className="mb-3 inline-block text-sm font-semibold tracking-wide text-teal-600 uppercase">
              Our Vision
            </span>
            <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
              Transparency, Accountability, and{" "}
              <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
                Trust in Every Moment of Care
              </span>
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                We believe that every family deserves to know their loved one is cared
                for with dignity and attention. Every caregiver deserves tools that make
                their work visible and valued. Every care organization deserves the
                clarity to deliver excellent service, consistently.
              </p>
              <p>
                We are building Senoria Seniors to bridge the communication gap between
                caregivers, families, and care organizations — creating a connected
                ecosystem where care will be documented, transparent, and continuously
                improving.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  value: "Transparency",
                  desc: "Our platform will document every care activity, making it accessible to those who need to know.",
                },
                {
                  value: "Accountability",
                  desc: "Our upcoming tools will provide clear records that build trust between all parties.",
                },
                {
                  value: "Connection",
                  desc: "Designed to bridge the gap between caregivers, families, and organizations.",
                },
              ].map((pillar) => (
                <div key={pillar.value} className="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                  <div className="mb-2 text-lg font-bold text-primary-600">{pillar.value}</div>
                  <p className="text-xs leading-relaxed text-slate-500">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
