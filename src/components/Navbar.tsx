"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#2B41B0]/95 backdrop-blur-lg border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-white tracking-wide"
          >
            David<span className="text-[#48E5E0]">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="relative flex items-center gap-1 rounded-full bg-white/10 px-2 py-1.5">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="/cv/David_Tembhare_CV.pdf"
              download
              className="rounded-full bg-[#FF7C5C] px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.03] hover:shadow-lg"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            "md:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="mt-3 rounded-2xl bg-white/10 p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                active={pathname === link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </div>

          <a
            href="/cv/David_Tembhare_CV.pdf"
            download
            className="mt-4 block rounded-full bg-[#FF7C5C] px-5 py-2 text-center text-sm font-semibold text-white"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/* ----------------------------- */

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/links", label: "Links" },
];

/* ----------------------------- */

const NavLink = ({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "relative px-4 py-2 text-sm font-medium rounded-full transition",
        active
          ? "text-white"
          : "text-white/80 hover:text-white"
      )}
    >
      {active && (
        <span className="absolute inset-0 -z-10 rounded-full bg-white/15" />
      )}
      {children}
    </Link>
  );
};

/* ----------------------------- */

const MobileNavLink = ({
  href,
  children,
  onClick,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "block rounded-xl px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-white/20 text-white"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
};
