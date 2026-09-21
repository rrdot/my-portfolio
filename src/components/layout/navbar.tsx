"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { personal } from "@/data/personal";
import { ThemeToggle } from "./theme-toggle";
const sections = [
  "About",
  "Experience",
  "Projects",
  "Skills",
  "Learning",
  "Contact",
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link
          href="/"
          className="brand"
          aria-label={`${personal.name} home`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-symbol">
            {personal.initials}
            <span>.</span>
          </span>
          <span>
            {personal.name}
            <span className="brand-dot">.</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {sections.map((section) => (
            <Link key={section} href={`/#${section.toLowerCase()}`}>
              {section}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="nav-resume"
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <ArrowUpRight size={15} />
          </a>
          <ThemeToggle />
          <button
            className="icon-button menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav container"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          {sections.map((section) => (
            <Link
              key={section}
              href={`/#${section.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {section}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
