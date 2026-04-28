import React from "react";
import Link from "next/link";
import { BookOpen, MapPin, Target, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-brand-black text-white py-20 sm:py-28 px-6 flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block mb-4 text-brand-yellow text-xs sm:text-sm font-bold tracking-widest uppercase border border-brand-yellow/40 px-4 py-1 rounded-full">
            Portal WebGIS Afrovenezolano
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Visibilizando nuestra{" "}
            <span className="text-brand-yellow">Raíz</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300 leading-relaxed">
            Conadecafro es el portal web orientado al desarrollo, centralización y fortalecimiento de las comunidades afrodescendientes en Venezuela.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/registro"
              className="bg-brand-yellow text-brand-black font-black py-3 px-8 rounded-full transition-all hover:bg-yellow-400 hover:scale-105 flex items-center justify-center gap-2"
            >
              Explorar el Mapa <ArrowRight size={18} />
            </Link>
            <Link
              href="/historia"
              className="bg-transparent border-2 border-white/40 text-white font-bold py-3 px-8 rounded-full hover:border-brand-purple transition-all hover:scale-105"
            >
              Nuestra Historia
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-purple/90 text-white py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-3 text-center">
          {[
            { value: "24", label: "Estados" },
            { value: "1854", label: "Abolición de esclavitud" },
            { value: "~3M", label: "Afrovenezolanos" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl sm:text-3xl font-black text-brand-yellow">{stat.value}</p>
              <p className="text-xs sm:text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border-t-4 border-brand-yellow flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-brand-purple/10 p-4 rounded-full mb-4">
            <Target className="text-brand-purple" size={30} />
          </div>
          <h2 className="text-xl font-bold mb-3">Nuestra Misión</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Empoderar a las comunidades afrovenezolanas centralizando recursos educativos, de salud, cultura y tecnología en una plataforma interactiva.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border-t-4 border-brand-purple flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-brand-yellow/20 p-4 rounded-full mb-4">
            <MapPin className="text-brand-yellow" size={30} />
          </div>
          <h2 className="text-xl font-bold mb-3">Censo y Cartografía</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Un WebGIS dinámico para localizar y cuantificar los aportes y las necesidades de cada estado del país, visualmente y en tiempo real.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border-t-4 border-brand-black flex flex-col items-center text-center hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <BookOpen className="text-brand-black" size={30} />
          </div>
          <h2 className="text-xl font-bold mb-3">Historia y Cultura</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Un espacio dedicado al aprendizaje y preservación de la memoria histórica afrovenezolana a través de galerías y cronologías.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-black text-white py-14 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-4">
          ¿Eres parte de la comunidad?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-6 text-sm sm:text-base">
          Registra tu organización, colectivo o iniciativa en nuestro mapa nacional y hazla visible.
        </p>
        <Link
          href="/registro"
          className="inline-block bg-brand-purple hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full border-2 border-transparent hover:border-brand-yellow transition-all"
        >
          Registrar ahora
        </Link>
      </section>
    </div>
  );
}
