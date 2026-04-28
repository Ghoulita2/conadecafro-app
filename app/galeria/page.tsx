import React from "react";

export default function GaleriaPage() {
  const photos = [
    { id: 0, height: "h-52",  title: "Festival Afrovenezolano 2024", tag: "Cultura" },
    { id: 1, height: "h-72",  title: "Encuentro de Tambores",        tag: "Música" },
    { id: 2, height: "h-44",  title: "Feria Gastronómica",           tag: "Gastronomía" },
    { id: 3, height: "h-64",  title: "Taller de Arte Urbano",        tag: "Arte" },
    { id: 4, height: "h-48",  title: "Congreso CONADECAFRO 2023",   tag: "Evento" },
    { id: 5, height: "h-80",  title: "Danza Afrovenezolana",         tag: "Cultura" },
    { id: 6, height: "h-56",  title: "Mural Comunitario — Caracas",  tag: "Arte" },
    { id: 7, height: "h-44",  title: "Expo Emprendedoras Afro",      tag: "Emprendimiento" },
    { id: 8, height: "h-72",  title: "Ceremonia de Identidad",       tag: "Tradición" },
    { id: 9, height: "h-48",  title: "Clase de Historia Afro",       tag: "Educación" },
    { id: 10, height: "h-60", title: "Feria de Salud Comunitaria",   tag: "Salud" },
    { id: 11, height: "h-52", title: "Colectivo Juvenil Afro",       tag: "Juventud" },
  ];

  const tagColors: Record<string, string> = {
    Cultura: "bg-brand-purple",
    Música: "bg-purple-700",
    Arte: "bg-brand-yellow text-brand-black",
    Evento: "bg-brand-purple",
    Gastronomía: "bg-purple-800",
    Tradición: "bg-brand-purple",
    Educación: "bg-purple-700",
    Salud: "bg-brand-purple",
    Juventud: "bg-purple-700",
    Emprendimiento: "bg-brand-yellow text-brand-black",
  };

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-brand-black mb-3 border-l-4 border-brand-purple pl-4">
          Galería de Actividades
        </h1>
        <p className="text-gray-500 max-w-2xl text-sm sm:text-base pl-4">
          Trabajos, encuentros y eventos de nuestras comunidades publicados en redes sociales.
        </p>
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`w-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden break-inside-avoid relative group ${photo.height} cursor-pointer`}
          >
            {/* Placeholder gradient */}
            <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${
              photo.id % 3 === 0
                ? "from-brand-purple/40 to-brand-black/60"
                : photo.id % 3 === 1
                ? "from-brand-yellow/30 to-brand-purple/40"
                : "from-brand-black/40 to-brand-purple/30"
            }`} />

            {/* Tag badge */}
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${tagColors[photo.tag] || "bg-brand-purple"}`}>
                {photo.tag}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white font-bold text-sm leading-snug">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
