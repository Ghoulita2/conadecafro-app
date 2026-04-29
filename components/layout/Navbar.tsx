"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/noticias", label: "Noticias" },
  { href: "/registro", label: "Censo" },
  { href: "/galeria", label: "Galería" },
  { href: "/historia", label: "Historia" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo-principal.png"
            alt="Conadecafro"
            width={240}
            height={70}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-1 text-sm font-bold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-full transition-all ${
                    pathname === link.href
                      ? "bg-brand-purple text-white"
                      : "hover:bg-brand-purple/10 hover:text-brand-purple text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700 hover:text-brand-purple transition-colors p-1"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4 shadow-lg">
          <ul className="flex flex-col gap-0 pt-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-base font-bold border-b border-gray-100 transition-colors ${
                    pathname === link.href ? "text-brand-purple" : "text-gray-700 hover:text-brand-purple"
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
