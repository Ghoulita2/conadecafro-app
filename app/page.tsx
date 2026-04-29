import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

const noticias = [
  {
    id: 1,
    date: "26 de abril, 2026",
    title: "El Cumbe Nacional Afrovenezolano y Conadecafro impulsan el Plan de Formación Cumbe Juvenil",
    excerpt: "Exhaltando la historia insurgente, el Cumbe Nacional fortalece la identidad afrovenezolana en las nuevas generaciones a través de un plan integral de formación política y cultural.",
    tag: "Noticias",
    color: "border-brand-purple",
  },
  {
    id: 2,
    date: "23 de abril, 2026",
    title: "Reivindicar la estética afro es un acto de resistencia y memoria viva",
    excerpt: "El turbante, los trenzados y la piel oscura son símbolos de un pueblo que lleva siglos luchando por su visibilidad. La estética afro es política, es identidad, es historia.",
    tag: "Artículo de Opinión",
    color: "border-brand-yellow",
  },
  {
    id: 3,
    date: "14 de abril, 2026",
    title: "273 municipios tienen alto nivel de auto identificación afrodescendiente en el país",
    excerpt: "Un estudio del Censo Nacional revela que más de 270 municipios venezolanos concentran la mayor densidad de comunidades afrodescendientes, abriendo nuevas oportunidades de política pública.",
    tag: "Noticias",
    color: "border-brand-purple",
  },
  {
    id: 4,
    date: "30 de marzo, 2026",
    title: "El teatro y cine promueven la Afrovenezolanidad",
    excerpt: "Directores y actores afrovenezolanos apuestan por la pantalla y el escenario para visibilizar sus historias, culturas y luchas en un movimiento artístico que crece a pasos agigantados.",
    tag: "Cultura",
    color: "border-green-500",
  },
  {
    id: 5,
    date: "23 de marzo, 2026",
    title: "Conadecafro celebra 14 años de cimarronaje con ciclo de conversatorios",
    excerpt: "Con encuentros en todo el país, la institución conmemoró 14 años de trabajo ininterrumpido en pro de los derechos de las comunidades afrodescendientes venezolanas.",
    tag: "Noticias",
    color: "border-brand-purple",
  },
];

const efemerides = [
  { dia: "10", mes: "MAY", texto: "Día Nacional de la Afrovenezolanidad" },
  { dia: "25", mes: "MAY", texto: "Día de África" },
  { dia: "02", mes: "AGO", texto: "Día Nacional contra la Discriminación" },
];



const tagColor: Record<string, string> = {
  "Noticias": "bg-brand-purple text-white",
  "Artículo de Opinión": "bg-brand-yellow text-gray-900",
  "Cultura": "bg-green-500 text-white",
};

export default function Home() {
  return (
    <div className="flex-grow flex flex-col bg-gray-50">
      {/* === HERO === */}
      <section className="relative bg-brand-purple text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col items-start relative z-10">
          <span className="text-brand-yellow text-xs font-black tracking-widest uppercase mb-4 bg-white/10 px-3 py-1 rounded-full">
            Consejo Nacional para el Desarrollo de las Comunidades Afrodescendientes
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight max-w-3xl mb-6">
            Visibilizando la <span className="text-brand-yellow">Afrovenezolanidad</span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
            Plataforma digital del pueblo afrovenezolano para la difusión de noticias, cultura, historia y el censo de nuestras comunidades en todo el territorio nacional.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/registro" className="bg-brand-yellow text-gray-900 font-black px-6 py-3 rounded-full hover:bg-yellow-400 transition-all flex items-center gap-2 text-sm">
              Mapa del Censo <ArrowRight size={16} />
            </Link>
            <Link href="/noticias" className="bg-white/15 border border-white/30 text-white font-bold px-6 py-3 rounded-full hover:bg-white/25 transition-all text-sm">
              Ver Noticias
            </Link>
          </div>
        </div>
      </section>

      {/* === CONTENIDO PRINCIPAL: Noticias + Sidebar === */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* ---- Noticias ---- */}
        <main className="flex-grow min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-black text-gray-800">Noticias Recientes</h2>
            <div className="flex-grow h-px bg-gray-200" />
            <Link href="/noticias" className="text-brand-purple text-sm font-bold hover:underline flex items-center gap-1">
              Ver todo <ArrowRight size={13} />
            </Link>
          </div>

          {/* Featured article */}
          <article className={`border-l-4 ${noticias[0].color} bg-white rounded-r-2xl p-5 sm:p-7 mb-4 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-black px-3 py-1 rounded-full ${tagColor[noticias[0].tag] || "bg-gray-200 text-gray-700"}`}>
                {noticias[0].tag}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={11} /> {noticias[0].date}
              </span>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2 leading-snug hover:text-brand-purple transition-colors cursor-pointer">
              {noticias[0].title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{noticias[0].excerpt}</p>
          </article>

          {/* Other articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {noticias.slice(1).map((n) => (
              <article key={n.id} className={`border-l-4 ${n.color} bg-white rounded-r-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${tagColor[n.tag] || "bg-gray-200 text-gray-700"}`}>
                    {n.tag}
                  </span>
                </div>
                <h3 className="font-black text-gray-800 text-sm leading-snug mb-2 hover:text-brand-purple transition-colors line-clamp-3">
                  {n.title}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={10} /> {n.date}
                </p>
              </article>
            ))}
          </div>
        </main>

        {/* ---- Sidebar ---- */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
          {/* Efemérides */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-black text-gray-800 mb-4 border-b border-gray-100 pb-2 text-sm uppercase tracking-wider flex items-center gap-2">
              <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 text-brand-purple">
                <g opacity="0.6" transform="translate(-6, 8) scale(0.7) rotate(-15 12 12)">
                  <path d="M8.5 13.5v-7A1.5 1.5 0 0 1 10 5a1.5 1.5 0 0 1 1.5 1.5v6M11.5 12V4A1.5 1.5 0 0 1 13 2.5 1.5 1.5 0 0 1 14.5 4v8M14.5 12V5.5A1.5 1.5 0 0 1 16 4a1.5 1.5 0 0 1 1.5 1.5v7M17.5 12v-1.5A1.5 1.5 0 0 1 19 9a1.5 1.5 0 0 1 1.5 1.5V15c0 4-2 7-6 7H9c-4 0-6-3-6-7v-3A1.5 1.5 0 0 1 4.5 10.5 1.5 1.5 0 0 1 6 12v2.5M6 14.5v-6A1.5 1.5 0 0 1 7.5 7 1.5 1.5 0 0 1 9 8.5v5"/>
                </g>
                <g opacity="0.6" transform="translate(15, 8) scale(0.7) rotate(15 12 12)">
                  <path d="M8.5 13.5v-7A1.5 1.5 0 0 1 10 5a1.5 1.5 0 0 1 1.5 1.5v6M11.5 12V4A1.5 1.5 0 0 1 13 2.5 1.5 1.5 0 0 1 14.5 4v8M14.5 12V5.5A1.5 1.5 0 0 1 16 4a1.5 1.5 0 0 1 1.5 1.5v7M17.5 12v-1.5A1.5 1.5 0 0 1 19 9a1.5 1.5 0 0 1 1.5 1.5V15c0 4-2 7-6 7H9c-4 0-6-3-6-7v-3A1.5 1.5 0 0 1 4.5 10.5 1.5 1.5 0 0 1 6 12v2.5M6 14.5v-6A1.5 1.5 0 0 1 7.5 7 1.5 1.5 0 0 1 9 8.5v5"/>
                </g>
                <g transform="translate(4, 2) scale(0.9)">
                  <path d="M8.5 13.5v-7A1.5 1.5 0 0 1 10 5a1.5 1.5 0 0 1 1.5 1.5v6M11.5 12V4A1.5 1.5 0 0 1 13 2.5 1.5 1.5 0 0 1 14.5 4v8M14.5 12V5.5A1.5 1.5 0 0 1 16 4a1.5 1.5 0 0 1 1.5 1.5v7M17.5 12v-1.5A1.5 1.5 0 0 1 19 9a1.5 1.5 0 0 1 1.5 1.5V15c0 4-2 7-6 7H9c-4 0-6-3-6-7v-3A1.5 1.5 0 0 1 4.5 10.5 1.5 1.5 0 0 1 6 12v2.5M6 14.5v-6A1.5 1.5 0 0 1 7.5 7 1.5 1.5 0 0 1 9 8.5v5"/>
                </g>
              </svg>
              Efemérides Afro
            </h3>
            <ul className="space-y-3">
              {efemerides.map((e) => (
                <li key={e.texto} className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-brand-purple text-white rounded-lg text-center w-12 h-12 flex flex-col items-center justify-center leading-tight">
                    <span className="text-lg font-black">{e.dia}</span>
                    <span className="text-xs opacity-80">{e.mes}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-snug font-semibold">{e.texto}</p>
                </li>
              ))}
            </ul>
          </div>



          {/* CTA Censo */}
          <div className="bg-brand-yellow rounded-2xl p-5">
            <h3 className="font-black text-gray-900 text-sm mb-2">🗺️ Mapa de Recursos</h3>
            <p className="text-xs text-gray-700 mb-4 leading-relaxed">
              Registra tu comunidad u organización afrovenezolana en nuestro censo nacional interactivo.
            </p>
            <Link
              href="/registro"
              className="block text-center bg-brand-purple text-white font-black text-xs py-2.5 px-4 rounded-xl hover:bg-purple-800 transition-colors"
            >
              Registrarse ahora
            </Link>
          </div>
        </aside>
      </section>

      {/* === STATS === */}
      <section className="bg-brand-purple text-white py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "14+", label: "Años de trabajo" },
            { value: "24", label: "Estados cubiertos" },
            { value: "~3M", label: "Afrovenezolanos" },
            { value: "273", label: "Municipios identificados" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-black text-brand-yellow">{s.value}</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
