"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Container from "./Container";

const navLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Vision", href: "/#vision" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Impact", href: "/#impact" },
  { label: "Careers", href: "/careers" },
];

const CONTACT_PHONE_DISPLAY = "+1-604-621-0194";
const CONTACT_PHONE_HREF = "tel:+16046210194";
const CONTACT_EMAIL = "info@senoriaseniors.com";
const CONTACT_EMAIL_HREF = "mailto:info@senoriaseniors.com";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`hidden border-b transition-colors duration-300 md:block ${
          scrolled ? "border-slate-100" : "border-transparent"
        }`}
      >
        <Container>
          <div className="flex h-9 items-center justify-end gap-6 text-xs">
            <a
              href={CONTACT_PHONE_HREF}
              className="inline-flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-primary-600"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a
              href={CONTACT_EMAIL_HREF}
              className="inline-flex items-center gap-1.5 font-medium text-slate-600 transition-colors hover:text-primary-600"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {CONTACT_EMAIL}
            </a>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-20 items-center justify-between md:h-24">
          <a href="#" className="flex items-center" aria-label="Senoria Seniors">
            <Image
              src="/images/logo.png"
              alt="Senoria Seniors"
              width={488}
              height={196}
              priority
              className="h-20 w-auto md:h-24"
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-600"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/request-demo"
              className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
            >
              Join Easy Access
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 md:hidden"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/request-demo"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Join Easy Access
                </a>

                <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
                  <a
                    href={CONTACT_PHONE_HREF}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-2 px-3 text-sm font-medium text-slate-600 hover:text-primary-600"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                  <a
                    href={CONTACT_EMAIL_HREF}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-2 px-3 text-sm font-medium text-slate-600 hover:text-primary-600"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
