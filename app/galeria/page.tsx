import React from "react";
import { Image as ImageIcon } from "lucide-react";

export default function GaleriaPage() {
  // Array de fotos falsas con tamaños variables para simular mampostería (Masonry)
  const photos = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    heightClass: ["h-48", "h-64", "h-80", "h-56"][i % 4],
    title: `Evento Cultural ${i + 1}`,
  }));

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 w-full">
      <h1 className="text-3xl font-bold text-brand-black mb-8 border-l-4 border-brand-purple pl-4">
        Galería de Actividades
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Un espacio para visualizar los trabajos, encuentros y eventos publicados en nuestras redes sociales, destacando el aporte cultural de nuestras comunidades.
      </p>

      {/* CSS columns approach for Masonry layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className={`w-full bg-gray-200 rounded-lg overflow-hidden break-inside-avoid relative group ${photo.heightClass}`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <ImageIcon size={48} opacity={0.5} />
            </div>
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-brand-white font-bold">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
