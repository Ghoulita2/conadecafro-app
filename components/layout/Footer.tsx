"use client";

import React from "react";
import Link from "next/link";
import { Send } from "lucide-react"; // Send can be used for Telegram

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.582 6.186a2.66 2.66 0 0 0-1.87-1.884C17.914 3.86 12 3.86 12 3.86s-5.914 0-7.712.442a2.66 2.66 0 0 0-1.87 1.884C2 8.01 2 12 2 12s0 3.99.448 5.814a2.66 2.66 0 0 0 1.87 1.884C6.086 20.14 12 20.14 12 20.14s5.914 0 7.712-.442a2.66 2.66 0 0 0 1.87-1.884C22 15.99 22 12 22 12s0-3.99-.418-5.814zM9.9 15.42V8.58L15.9 12l-6 3.42z"/>
  </svg>
);

// Custom Icons for TikTok and Threads since they might not be in standard lucide-react or are complex
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.3A9.7 9.7 0 0 0 2.3 12a9.7 9.7 0 0 0 9.7 9.7 9.7 9.7 0 0 0 9.7-9.7h-2.1a7.6 7.6 0 1 1-2.2-5.4 7.5 7.5 0 0 1 2.2 5.4v.5a2.6 2.6 0 0 1-5.2 0V9.4A3.9 3.9 0 0 0 8.1 12a3.9 3.9 0 0 0 3.9 3.9 3.9 3.9 0 0 0 3.9-3.9v-.5a4.7 4.7 0 0 0-9.4 0 4.7 4.7 0 0 0 4.7 4.7h.2a1 1 0 0 1 0-2.1h-.2a2.6 2.6 0 1 1 0-5.2A2.6 2.6 0 0 1 12 6.8v2.1h0zM12 10.1a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"/>
  </svg>
);

const socialLinks = [
  { icon: Send, href: "https://t.me/condecafrove", label: "Telegram" },
  { icon: FacebookIcon, href: "https://www.facebook.com/conadecafro", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/conadecafrove?igsh=b2hoajh3bjlsOXQx", label: "Instagram" },
  { icon: YoutubeIcon, href: "https://youtube.com/@conadecafrove?si=R3UPGqbV3ePU2wTq", label: "YouTube" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@conadecafro?_r=1&_t=ZS-95vi13NrKGy", label: "TikTok" },
  { icon: ThreadsIcon, href: "https://www.threads.com/@conadecafrove", label: "Threads" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-500 font-medium text-center md:text-left">
          &copy; {new Date().getFullYear()} Consejo Nacional para el Desarrollo de las Comunidades Afrodescendientes de Venezuela.
        </div>
        
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-brand-purple hover:text-white transition-all shadow-sm"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
