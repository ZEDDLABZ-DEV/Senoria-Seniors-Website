import Container from "./Container";

const footerLinks = {
  product: [
    { label: "Services", href: "#services" },
    { label: "Features", href: "#benefits" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Impact", href: "#impact" },
  ],
  company: [
    { label: "About Us", href: "#vision" },
    { label: "Contact", href: "#cta" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 pt-16 pb-8">
      <Container>
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-teal-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-800">
                Senoria <span className="font-medium text-primary-600">Seniors</span>
              </span>
            </div>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Smarter care management for families, caregivers, and care organizations.
            </p>
            <div className="space-y-1.5">
              <a
                href="tel:+16046210194"
                className="block text-sm font-medium text-slate-600 hover:text-primary-600"
              >
                +1-604-621-0194
              </a>
              <a
                href="mailto:hello@senoria.care"
                className="block text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                hello@senoria.care
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold tracking-wide text-slate-800 uppercase">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-primary-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Senoria Seniors. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-slate-400 hover:text-primary-600">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-slate-400 hover:text-primary-600">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
