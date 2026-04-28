"use client";

import React from "react";

export interface VenezuelaMapProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  resourceCounts: Record<string, number>;
}

// Datos de los 24 estados de Venezuela con paths SVG simplificados
// ViewBox: 0 0 800 600
const STATES: { id: string; name: string; d: string; labelX: number; labelY: number }[] = [
  // Zulia (Oeste)
  { id: "Zulia", name: "Zulia", labelX: 80, labelY: 200,
    d: "M 45,120 L 80,110 L 120,130 L 140,170 L 155,220 L 140,270 L 100,290 L 60,270 L 40,230 L 45,180 Z" },
  // Falcón
  { id: "Falcón", name: "Falcón", labelX: 200, labelY: 110,
    d: "M 140,100 L 200,90 L 250,100 L 260,130 L 240,150 L 200,155 L 160,145 L 140,130 Z" },
  // Lara
  { id: "Lara", name: "Lara", labelX: 210, labelY: 190,
    d: "M 160,145 L 200,155 L 240,150 L 260,170 L 250,210 L 220,230 L 185,220 L 162,200 Z" },
  // Yaracuy
  { id: "Yaracuy", name: "Yaracuy", labelX: 262, labelY: 190,
    d: "M 240,150 L 275,145 L 290,165 L 285,200 L 260,210 L 250,185 Z" },
  // Táchira (Suroeste)
  { id: "Táchira", name: "Táchira", labelX: 112, labelY: 330,
    d: "M 100,290 L 140,270 L 165,285 L 175,320 L 160,350 L 130,360 L 100,340 L 90,315 Z" },
  // Mérida
  { id: "Mérida", name: "Mérida", labelX: 185, labelY: 310,
    d: "M 165,285 L 200,275 L 235,290 L 240,325 L 220,350 L 185,355 L 165,335 L 160,310 Z" },
  // Barinas
  { id: "Barinas", name: "Barinas", labelX: 255, labelY: 320,
    d: "M 235,265 L 285,255 L 330,265 L 335,310 L 310,345 L 270,350 L 240,335 L 235,300 Z" },
  // Trujillo
  { id: "Trujillo", name: "Trujillo", labelX: 200, labelY: 245,
    d: "M 185,220 L 220,230 L 235,255 L 215,275 L 185,275 L 165,255 L 170,235 Z" },
  // Portuguesa
  { id: "Portuguesa", name: "Portuguesa", labelX: 270, labelY: 245,
    d: "M 250,210 L 285,200 L 315,210 L 325,245 L 305,265 L 270,265 L 250,245 Z" },
  // Cojedes
  { id: "Cojedes", name: "Cojedes", labelX: 320, labelY: 220,
    d: "M 285,200 L 320,195 L 345,210 L 345,240 L 325,255 L 300,250 L 285,225 Z" },
  // Carabobo
  { id: "Carabobo", name: "Carabobo", labelX: 295, labelY: 170,
    d: "M 285,155 L 320,148 L 335,165 L 330,185 L 310,195 L 290,185 L 285,170 Z" },
  // Aragua
  { id: "Aragua", name: "Aragua", labelX: 340, labelY: 175,
    d: "M 320,148 L 360,145 L 380,160 L 375,185 L 350,195 L 330,185 L 335,165 Z" },
  // La Guaira
  { id: "La Guaira", name: "La Guaira", labelX: 355, labelY: 143,
    d: "M 320,130 L 380,128 L 385,145 L 360,148 L 325,148 Z" },
  // Distrito Capital
  { id: "Distrito Capital", name: "D. Capital", labelX: 390, labelY: 158,
    d: "M 380,128 L 400,126 L 405,145 L 385,148 L 380,140 Z" },
  // Miranda
  { id: "Miranda", name: "Miranda", labelX: 405, labelY: 175,
    d: "M 385,148 L 415,143 L 430,160 L 425,185 L 400,195 L 375,185 L 375,165 Z" },
  // Vargas / La Guaira Litoral — already covered above
  // Guárico
  { id: "Guárico", name: "Guárico", labelX: 380, labelY: 255,
    d: "M 345,200 L 415,195 L 440,225 L 435,270 L 400,290 L 360,285 L 340,260 L 345,235 Z" },
  // Apure
  { id: "Apure", name: "Apure", labelX: 285, labelY: 385,
    d: "M 240,345 L 330,340 L 380,350 L 385,400 L 350,430 L 285,430 L 245,410 L 235,380 Z" },
  // Anzoátegui
  { id: "Anzoátegui", name: "Anzoátegui", labelX: 480, labelY: 225,
    d: "M 435,185 L 500,178 L 540,195 L 545,240 L 520,270 L 470,275 L 440,250 L 435,215 Z" },
  // Monagas
  { id: "Monagas", name: "Monagas", labelX: 550, labelY: 225,
    d: "M 540,195 L 590,188 L 620,210 L 615,250 L 580,270 L 545,265 L 540,240 Z" },
  // Sucre
  { id: "Sucre", name: "Sucre", labelX: 600, labelY: 175,
    d: "M 580,155 L 635,148 L 660,168 L 645,195 L 610,200 L 580,185 Z" },
  // Nueva Esparta (Isla — simplificada)
  { id: "Nueva Esparta", name: "N. Esparta", labelX: 660, labelY: 143,
    d: "M 655,130 L 680,128 L 690,142 L 680,155 L 655,155 L 645,142 Z" },
  // Delta Amacuro
  { id: "Delta Amacuro", name: "Delta Amacuro", labelX: 640, labelY: 270,
    d: "M 615,240 L 660,232 L 695,260 L 690,305 L 655,320 L 620,300 L 610,270 Z" },
  // Bolívar
  { id: "Bolívar", name: "Bolívar", labelX: 510, labelY: 360,
    d: "M 435,270 L 520,265 L 615,270 L 640,310 L 635,390 L 560,440 L 470,445 L 395,410 L 380,355 L 405,295 Z" },
  // Amazonas
  { id: "Amazonas", name: "Amazonas", labelX: 330, labelY: 460,
    d: "M 245,410 L 350,430 L 395,415 L 400,480 L 370,530 L 295,540 L 235,510 L 220,460 Z" },
];

const getStateColor = (stateName: string, selectedState: string, count: number) => {
  if (stateName === selectedState) return "#FFD700"; // brand-yellow
  if (count > 5) return "#4a0080";   // dark purple
  if (count > 2) return "#6A0DAD";   // brand-purple
  if (count > 0) return "#9c4dd4";   // light purple
  return "#1a1a2e";                  // dark base
};

const VenezuelaMap: React.FC<VenezuelaMapProps> = ({ selectedState, onStateSelect, resourceCounts }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative flex-1 bg-gray-950 rounded-xl border-2 border-brand-purple overflow-hidden min-h-[320px]">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-purple-950/10" />

        <svg
          viewBox="0 0 760 580"
          className="w-full h-full"
          style={{ background: "transparent" }}
          aria-label="Mapa de Venezuela"
        >
          {/* Ocean texture lines */}
          <defs>
            <pattern id="oceanPattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <line x1="0" y1="10" x2="20" y2="10" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="760" height="580" fill="url(#oceanPattern)" />

          {STATES.map((state) => {
            const count = resourceCounts[state.name] || 0;
            const isSelected = state.name === selectedState || state.id === selectedState;
            const fill = getStateColor(state.id, selectedState, count);

            return (
              <g key={state.id} onClick={() => onStateSelect(isSelected ? "Todos" : state.id)}
                className="cursor-pointer group">
                <path
                  d={state.d}
                  fill={fill}
                  stroke={isSelected ? "#FFD700" : "#6A0DAD"}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                  className="transition-all duration-200"
                  style={{ filter: isSelected ? "drop-shadow(0 0 8px #FFD700)" : "none" }}
                />
                {/* State label */}
                <text
                  x={state.labelX}
                  y={state.labelY}
                  textAnchor="middle"
                  fontSize={count > 0 ? "7.5" : "7"}
                  fontWeight={isSelected ? "bold" : "normal"}
                  fill={isSelected ? "#000" : "#e0e0e0"}
                  className="pointer-events-none select-none"
                >
                  {state.name}
                </text>
                {/* Resource count badge */}
                {count > 0 && (
                  <g>
                    <circle cx={state.labelX + 14} cy={state.labelY - 10} r="7" fill="#FFD700" />
                    <text x={state.labelX + 14} y={state.labelY - 7}
                      textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#000"
                      className="pointer-events-none">
                      {count}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Title overlay */}
          <text x="380" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFD700" opacity="0.9">
            Venezuela — Haz clic en un estado para filtrar
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 px-1 text-xs">
        {[
          { color: "#1a1a2e", label: "Sin registros" },
          { color: "#9c4dd4", label: "1–2 personas" },
          { color: "#6A0DAD", label: "3–5 personas" },
          { color: "#4a0080", label: "+5 personas" },
          { color: "#FFD700", label: "Estado seleccionado" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm border border-brand-purple/50" style={{ background: item.color }} />
            <span className="text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenezuelaMap;
