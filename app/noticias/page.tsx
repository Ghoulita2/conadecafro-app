import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";

const noticias = [
  { id: 1, date: "26 abr 2026", tag: "Noticias", color: "border-brand-purple", tagColor: "bg-brand-purple text-white",
    title: "El Cumbe Nacional Afrovenezolano y Conadecafro impulsan el Plan de Formación Cumbe Juvenil exhaltando la historia insurgente",
    excerpt: "El Cumbe Nacional Afrovenezolano, junto a Conadecafro, pusieron en marcha un plan de formación dirigido a la juventud afrovenezolana, exaltando la memoria de los grandes cimarrones y cimarronas de Venezuela. El encuentro celebrado en Caracas reunió a decenas de jóvenes de distintos estados del país.", },
  { id: 2, date: "23 abr 2026", tag: "Artículo de Opinión", color: "border-brand-yellow", tagColor: "bg-brand-yellow text-gray-900",
    title: "Reivindicar la estética afro es un acto de resistencia y memoria viva",
    excerpt: "El turbante, los trenzados y los patrones africanos que adornan nuestra ropa no son solo accesorios: son manifiestos políticos. Cuando una mujer afrovenezolana sale a la calle con su cabello natural, desafía siglos de exclusión y marginalización. Reivindicar la estética afro es decirle al mundo que nuestra existencia es válida, bella y digna.", },
  { id: 3, date: "14 abr 2026", tag: "Noticias", color: "border-brand-purple", tagColor: "bg-brand-purple text-white",
    title: "273 municipios tienen alto nivel de auto identificación afrodescendiente en el país",
    excerpt: "Un estudio basado en los datos del Censo Nacional 2021 revela que 273 municipios venezolanos tienen alta concentración de ciudadanos que se auto identifican como afrodescendientes. La región de Barlovento, Sotillo en Anzoátegui y Sur del Lago de Maracaibo lideran las estadísticas.", },
  { id: 4, date: "30 mar 2026", tag: "Cultura", color: "border-green-500", tagColor: "bg-green-500 text-white",
    title: "El teatro y cine promueven la Afrovenezolanidad",
    excerpt: "Nuevas producciones teatrales y cinematográficas con temática afrovenezolana están tomando los escenarios del país. Directores y actores comprometidos con la visibilización de la cultura negra en Venezuela están creando obras que reflejan las realidades, tradiciones e historias de sus comunidades.", },
  { id: 5, date: "23 mar 2026", tag: "Noticias", color: "border-brand-purple", tagColor: "bg-brand-purple text-white",
    title: "Conadecafro celebra 14 años de cimarronaje con ciclo de conversatorios",
    excerpt: "En su décimo cuarto aniversario, Conadecafro organizó un ciclo nacional de conversatorios en alianza con universidades, colectivos culturales y organizaciones de base para conmemorar sus años de trabajo en pro de los derechos afrovenezolanos. El lema de este año fue: '14 años construyendo pueblo'.", },
  { id: 6, date: "10 feb 2026", tag: "Efemérides", color: "border-orange-400", tagColor: "bg-orange-400 text-white",
    title: "Homenaje a los precursores de la independencia afrodescendiente en Venezuela",
    excerpt: "A propósito del mes de la historia negra que se celebra internacionalmente cada febrero, Conadecafro rindió un especial homenaje a figuras como José Leonardo Chirino, Francisco de Miranda y otros líderes afrovenezolanos que contribuyeron a la independencia y la abolición de la esclavitud.", },
];

export default function NoticiasPage() {
  return (
    <div className="flex-grow bg-gray-50">
      {/* Header */}
      <div className="bg-brand-purple text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-yellow-300 text-sm flex items-center gap-1 mb-4 hover:underline">
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black">Noticias y Artículos</h1>
          <p className="text-gray-200 mt-2 text-sm sm:text-base">Novedades del pueblo afrovenezolano</p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-5">
        {noticias.map((n) => (
          <article
            key={n.id}
            className={`bg-white rounded-2xl border-l-4 ${n.color} p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 sm:gap-6`}
          >
            {/* Date column */}
            <div className="flex-shrink-0 sm:w-20 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0">
              <div className="bg-brand-purple/10 text-brand-purple rounded-xl px-3 py-1 text-xs font-black text-center">
                {n.date.split(" ").slice(0,2).join(" ")}
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-black px-3 py-0.5 rounded-full ${n.tagColor}`}>{n.tag}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={10} /> {n.date}
                </span>
              </div>
              <h2 className="font-black text-gray-900 text-base sm:text-lg leading-snug mb-2 hover:text-brand-purple transition-colors cursor-pointer">
                {n.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{n.excerpt}</p>
              <button className="mt-3 text-brand-purple text-xs font-black flex items-center gap-1 hover:underline">
                Leer más <ArrowRight size={12} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
