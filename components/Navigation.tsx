"use client";

import { useState } from "react";
import { Arrow } from "./Arrow";

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="wordmark" href="#top" onClick={closeMenu}>nishan<span>•</span></a>
      <button
        className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span>Menu</span><i aria-hidden="true" />
      </button>
      <div className={`nav-links ${menuOpen ? "is-open" : ""}`} id="main-menu">
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <Arrow /></a>
      </div>
    </nav>
  );
}
