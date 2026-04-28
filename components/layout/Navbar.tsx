import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="bg-brand-black text-brand-white border-b-4 border-brand-yellow px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="bg-brand-purple p-2 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
            <Globe size={24} className="text-brand-yellow" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider group-hover:text-brand-yellow transition-colors">
            Conadecafro
          </h1>
        </Link>
        
        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-sm font-bold">
            <li>
              <Link href="/" className="hover:text-brand-yellow hover:border-b-2 hover:border-brand-yellow pb-1 transition-all">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/registro" className="hover:text-brand-yellow hover:border-b-2 hover:border-brand-yellow pb-1 transition-all">
                Registro
              </Link>
            </li>
            <li>
              <Link href="/galeria" className="hover:text-brand-yellow hover:border-b-2 hover:border-brand-yellow pb-1 transition-all">
                Galería
              </Link>
            </li>
            <li>
              <Link href="/historia" className="hover:text-brand-yellow hover:border-b-2 hover:border-brand-yellow pb-1 transition-all">
                Historia
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
