import React from "react";

export default function HistoriaPage() {
  const events = [
    {
      year: "1528",
      title: "Primeros Asentamientos",
      description: "Llegada de los primeros africanos esclavizados a Venezuela, marcando el inicio de la influencia africana en la demografía y cultura del país.",
    },
    {
      year: "1795",
      title: "Insurrección de Coro",
      description: "José Leonardo Chirino lidera una de las rebeliones más significativas buscando la abolición de la esclavitud y el establecimiento de una república.",
    },
    {
      year: "1854",
      title: "Abolición de la Esclavitud",
      description: "Bajo la presidencia de José Gregorio Monagas, se decreta formalmente la abolición de la esclavitud en el territorio venezolano.",
    },
    {
      year: "2012",
      title: "Creación de CONADECAFRO",
      description: "Fundación del Consejo Nacional para el Desarrollo de las Comunidades Afrodescendientes de Venezuela para promover políticas públicas integrales.",
    }
  ];

  return (
    <div className="bg-brand-black min-h-screen py-16 px-6 text-brand-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-yellow mb-4">Historia Afrovenezolana</h1>
        <p className="text-gray-300 mb-12 text-lg">
          Un recorrido cronológico por los hitos que han marcado la lucha, resistencia y aportes de las comunidades afrodescendientes en Venezuela.
        </p>

        {/* Timeline Container */}
        <div className="relative border-l-4 border-brand-purple ml-4 md:ml-6 space-y-12">
          {events.map((event, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[14px] top-1 h-6 w-6 rounded-full bg-brand-yellow border-4 border-brand-black"></div>
              
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 hover:border-brand-purple transition-colors">
                <span className="text-brand-yellow font-bold text-xl block mb-2">{event.year}</span>
                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
