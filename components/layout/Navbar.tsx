"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/registro", label: "Registro" },
  { href: "/galeria", label: "Galería" },
  { href: "/historia", label: "Historia" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-black text-brand-white border-b-4 border-brand-yellow shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
          {/* Logo image — swap /logo.png with real file when available */}
          <div className="bg-brand-purple rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-brand-yellow font-black text-sm leading-none">CA</span>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-wider group-hover:text-brand-yellow transition-colors">
            Conadecafro
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-sm font-bold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`pb-1 transition-all border-b-2 ${
                    pathname === link.href
                      ? "text-brand-yellow border-brand-yellow"
                      : "border-transparent hover:text-brand-yellow hover:border-brand-yellow"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden text-brand-white hover:text-brand-yellow transition-colors p-1"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-black border-t border-brand-purple px-6 pb-4">
          <ul className="flex flex-col gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-base font-bold border-b border-gray-800 transition-colors ${
                    pathname === link.href
                      ? "text-brand-yellow"
                      : "hover:text-brand-yellow"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
