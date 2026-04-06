"use client";

import Image from "next/image";
import Container from "./Container";
import SectionWrapper from "./SectionWrapper";
import InfoCard from "./InfoCard";

const problems = [
  {
    title: "Lack of Transparency",
    description:
      "Families often have no clear view into what care activities are happening day to day, leading to uncertainty and anxiety about their loved one's wellbeing.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
  },
  {
    title: "Uncertainty About Care Activities",
    description:
      "Without structured communication channels, families are left guessing whether medications were given, meals were prepared, or routines were followed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Inconsistent Documentation",
    description:
      "Care tasks are frequently undocumented or recorded inconsistently, making it difficult to track care quality and ensure accountability across shifts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    title: "Limited Operational Visibility",
    description:
      "Care agencies struggle to monitor service delivery across multiple clients and caregivers, creating blind spots in quality assurance and compliance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  return (
    <SectionWrapper id="problem" background="light">
      <Container>
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold tracking-wide text-primary-600 uppercase">
              The Challenge
            </span>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Modern Caregiving Faces Real Challenges
            </h2>
            <p className="text-lg leading-relaxed text-slate-500">
              Caring for seniors is demanding. Without the right tools, critical
              information falls through the cracks — affecting families, caregivers,
              and organizations alike.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/problem-elderly.jpg"
                alt="Nurse assisting elderly person during a home care visit"
                width={700}
                height={460}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <InfoCard
              key={problem.title}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
