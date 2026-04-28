import React from "react";
import Link from "next/link";
import { BookOpen, MapPin, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-brand-black text-white py-20 px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-yellow">
          Visibilizando nuestra Raíz
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-10 text-gray-300">
          Conadecafro es el portal web orientado al desarrollo, centralización y fortalecimiento de las comunidades afrodescendientes en Venezuela.
        </p>
        <Link 
          href="/registro"
          className="bg-brand-purple hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full transition-colors border-2 border-transparent hover:border-brand-yellow"
        >
          Explorar el Mapa de Recursos
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-brand-yellow flex flex-col items-center text-center">
          <div className="bg-brand-purple/10 p-4 rounded-full mb-4">
            <Target className="text-brand-purple" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Nuestra Misión</h2>
          <p className="text-gray-600">
            Empoderar a las comunidades afrovenezolanas centralizando recursos educativos, de salud, cultura y tecnología en una sola plataforma interactiva.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-brand-purple flex flex-col items-center text-center">
          <div className="bg-brand-yellow/20 p-4 rounded-full mb-4">
            <MapPin className="text-brand-yellow" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Censo y Cartografía</h2>
          <p className="text-gray-600">
            Un WebGIS dinámico diseñado para localizar y cuantificar los aportes y las necesidades de cada estado del país.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-brand-black flex flex-col items-center text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <BookOpen className="text-brand-black" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Historia y Cultura</h2>
          <p className="text-gray-600">
            Un espacio dedicado al aprendizaje y preservación de la memoria histórica afrovenezolana a través de galerías y cronologías.
          </p>
        </div>
      </section>
    </div>
  );
}
