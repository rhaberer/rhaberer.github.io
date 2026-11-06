"use client";
import Link from "next/link";
import { useState } from "react";
import { Mark, Arrow } from "./icons";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Link className="identity" href="/" aria-label="Ronny Haberer home">
        <Mark />
        <span>
          Ronny Haberer
          <span className="identity-sub">Product / 3D / Interactive</span>
        </span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="main-nav"
        aria-label="Main navigation"
        className={open ? "nav is-open" : "nav"}
      >
        <Link href="/#work" onClick={() => setOpen(false)}>
          Work <sup>06</sup>
        </Link>
        <Link href="/#about" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link
          className="nav-contact"
          href="/#contact"
          onClick={() => setOpen(false)}
        >
          Contact <Arrow diagonal />
        </Link>
      </nav>
    </header>
  );
}
