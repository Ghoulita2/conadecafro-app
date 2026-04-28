import React from "react";

export default function HistoriaPage() {
  const events = [
    {
      year: "Siglo XVI",
      title: "Los primeros africanos en Venezuela",
      description: "A partir de 1528, personas africanas esclavizadas son traídas a fuerza al territorio venezolano, comenzando así siglos de resistencia, adaptación y aportes culturales que marcarían profundamente la identidad nacional.",
      color: "border-brand-yellow",
      badge: "bg-brand-yellow text-brand-black",
    },
    {
      year: "1795",
      title: "Insurrección de Coro — José Leonardo Chirino",
      description: "Chirino lideró la primera gran rebelión de esclavizados y campesinos, inspirada en la Revolución Haitiana, exigiendo la abolición de la esclavitud y el establecimiento de leyes igualitarias.",
      color: "border-brand-purple",
      badge: "bg-brand-purple text-white",
    },
    {
      year: "1816",
      title: "Decreto de Carúpano — Simón Bolívar",
      description: "Bolívar decreta la libertad de los esclavizados que se unan a las fuerzas independentistas, reconociendo la crucial participación de los afrovenezolanos en la guerra de independencia.",
      color: "border-brand-yellow",
      badge: "bg-brand-yellow text-brand-black",
    },
    {
      year: "1854",
      title: "Abolición de la Esclavitud",
      description: "El presidente José Gregorio Monagas firma el decreto que prohíbe formalmente la esclavitud en todo el territorio venezolano, un hito histórico producto de décadas de lucha y resistencia.",
      color: "border-brand-purple",
      badge: "bg-brand-purple text-white",
    },
    {
      year: "1999",
      title: "Reconocimiento Constitucional",
      description: "La Constitución de la República Bolivariana de Venezuela reconoce por primera vez los derechos culturales y la identidad de los pueblos afrodescendientes como parte de la diversidad nacional.",
      color: "border-brand-yellow",
      badge: "bg-brand-yellow text-brand-black",
    },
    {
      year: "2012",
      title: "Creación de CONADECAFRO",
      description: "Se establece el Consejo Nacional para el Desarrollo de las Comunidades Afrodescendientes de Venezuela, organismo que centraliza políticas públicas de inclusión, desarrollo y visibilización cultural afrovenezolana.",
      color: "border-brand-purple",
      badge: "bg-brand-purple text-white",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-brand-purple text-xs sm:text-sm font-bold tracking-widest uppercase border border-brand-purple/30 px-4 py-1 rounded-full">
            Memoria Histórica
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-purple mt-5 mb-4 leading-tight">
            Historia Afrovenezolana
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Un recorrido por los hitos que marcaron la lucha, resistencia y aportes de las comunidades afrodescendientes en Venezuela.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-4 border-brand-purple ml-6 space-y-10 pb-10">
          {events.map((event, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12">
              {/* Dot */}
              <div className="absolute -left-[14px] top-1 h-6 w-6 rounded-full bg-brand-yellow border-4 border-white ring-2 ring-brand-yellow/30" />

              <div className={`bg-white p-5 sm:p-7 rounded-2xl shadow-sm border border-gray-100 border-l-4 ${event.color} hover:shadow-md transition-shadow`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${event.badge}`}>
                    {event.year}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 leading-snug">{event.title}</h3>
                </div>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
          {/* End dot */}
          <div className="absolute -left-[14px] bottom-0 h-6 w-6 rounded-full bg-brand-purple border-4 border-white" />
        </div>
      </div>
    </div>
  );
}
