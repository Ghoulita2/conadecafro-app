import React from "react";

export default function GaleriaPage() {
  const photos = [
    { id: 0, height: "h-64", title: "Ofrenda Floral 11° Aniversario", tag: "Evento", url: "https://conadecafro.wordpress.com/wp-content/uploads/2023/03/ofrenda-floral-de-conadecafro-11-aniversario-1.jpg" },
    { id: 1, height: "h-72", title: "Cierre del III Congreso Nacional Afrovenezolano", tag: "Cultura", url: "https://conadecafro.wordpress.com/wp-content/uploads/2023/03/cierre-iii-congreso-nacional-afrovenezolano-plenaria-en-la-escuela-venezolana-de-planificacion-este-sabado-25-de-febrero-con-un-homenaje-a-la-cimarrona-norma-romero-y-al-cimarron-mayor-a.jpg" },
    { id: 2, height: "h-52", title: "Participación Popular en el Congreso", tag: "Juventud", url: "https://conadecafro.wordpress.com/wp-content/uploads/2023/03/cierre-iii-congreso-nacional-afrovenezolano-plenaria-en-la-escuela-venezolana-de-planificacion-este-sabado-25-de-febrero-con-un-homenaje-a-la-cimarrona-norma-romero-y-al-cimarron-mayor-a-2.jpg" },
    { id: 3, height: "h-80", title: "Homenaje a Líderes Afrovenezolanos", tag: "Tradición", url: "https://conadecafro.wordpress.com/wp-content/uploads/2023/03/cierre-iii-congreso-nacional-afrovenezolano-plenaria-en-la-escuela-venezolana-de-planificacion-este-sabado-25-de-febrero-con-un-homenaje-a-la-cimarrona-norma-romero-y-al-cimarron-mayor-a-4.jpg" },
    { id: 4, height: "h-56", title: "Equipo Institucional de Conadecafro", tag: "Evento", url: "https://conadecafro.wordpress.com/wp-content/uploads/2023/03/ofrenda-floral-de-conadecafro-11-aniversario-6.jpg" },
    { id: 5, height: "h-60", title: "Congreso de la Nueva Época", tag: "Educación", url: "https://conadecafro.wordpress.com/wp-content/uploads/2023/03/336159691_1369704533763339_3421413764139418524_n.jpg" },
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
    Juventud: "bg-brand-yellow text-brand-black",
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
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`w-full bg-gray-200 rounded-xl overflow-hidden break-inside-avoid relative group ${photo.height} cursor-pointer shadow-sm`}
          >
            {/* Imagen real */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={photo.url} 
              alt={photo.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradiente oscuro inferior siempre visible para asegurar que el título se lea */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Tag badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white shadow-sm ${tagColors[photo.tag] || "bg-brand-purple"}`}>
                {photo.tag}
              </span>
            </div>

            {/* Título permanente abajo */}
            <div className="absolute inset-0 flex items-end p-4 z-10">
              <p className="text-white font-bold text-sm leading-snug drop-shadow-md">{photo.title}</p>
            </div>
            
            {/* Overlay hover sutil */}
            <div className="absolute inset-0 bg-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
