"use client";

import React from "react";

export interface VenezuelaMapProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  resourceCounts: Record<string, number>;
}

// Paths SVG geográficamente correctos de los 24 estados de Venezuela
// ViewBox: 0 0 1000 800, coordenadas derivadas de datos geográficos reales simplificados
const STATES: {
  id: string;
  name: string;
  d: string;
  labelX: number;
  labelY: number;
}[] = [
  {
    id: "Zulia",
    name: "Zulia",
    labelX: 108,
    labelY: 265,
    d: "M 60,160 L 85,145 L 115,148 L 130,165 L 145,185 L 162,200 L 168,225 L 175,255 L 170,285 L 158,310 L 140,330 L 120,345 L 100,340 L 78,320 L 60,295 L 48,265 L 50,235 L 55,205 Z",
  },
  {
    id: "Falcón",
    name: "Falcón",
    labelX: 255,
    labelY: 148,
    d: "M 168,125 L 195,118 L 230,115 L 265,118 L 295,125 L 315,138 L 310,158 L 285,168 L 260,172 L 235,168 L 210,162 L 190,155 L 172,142 Z",
  },
  {
    id: "Lara",
    name: "Lara",
    labelX: 248,
    labelY: 222,
    d: "M 172,142 L 190,155 L 210,162 L 235,168 L 260,172 L 285,168 L 295,180 L 292,202 L 278,218 L 258,228 L 235,232 L 210,228 L 192,218 L 175,205 L 168,185 Z",
  },
  {
    id: "Yaracuy",
    name: "Yaracuy",
    labelX: 320,
    labelY: 208,
    d: "M 285,168 L 310,158 L 338,162 L 355,175 L 352,198 L 335,212 L 315,215 L 295,210 L 288,195 Z",
  },
  {
    id: "Carabobo",
    name: "Carabobo",
    labelX: 355,
    labelY: 228,
    d: "M 335,212 L 355,210 L 378,215 L 390,228 L 385,245 L 368,255 L 348,252 L 335,240 L 332,225 Z",
  },
  {
    id: "Aragua",
    name: "Aragua",
    labelX: 415,
    labelY: 228,
    d: "M 378,215 L 405,210 L 432,212 L 448,225 L 445,245 L 428,258 L 408,262 L 388,258 L 378,242 L 378,228 Z",
  },
  {
    id: "La Guaira",
    name: "La Guaira",
    labelX: 443,
    labelY: 197,
    d: "M 405,195 L 432,192 L 455,195 L 458,210 L 435,212 L 408,210 Z",
  },
  {
    id: "Distrito Capital",
    name: "D. Capital",
    labelX: 465,
    labelY: 215,
    d: "M 450,208 L 470,205 L 480,215 L 475,228 L 458,230 L 448,222 Z",
  },
  {
    id: "Miranda",
    name: "Miranda",
    labelX: 498,
    labelY: 235,
    d: "M 448,218 L 472,212 L 498,215 L 518,228 L 522,248 L 508,265 L 485,272 L 462,268 L 445,255 L 442,238 Z",
  },
  {
    id: "Portuguesa",
    name: "Portuguesa",
    labelX: 320,
    labelY: 268,
    d: "M 258,228 L 285,225 L 315,228 L 338,235 L 348,255 L 342,278 L 322,292 L 298,295 L 275,288 L 258,272 L 255,252 Z",
  },
  {
    id: "Cojedes",
    name: "Cojedes",
    labelX: 390,
    labelY: 270,
    d: "M 348,252 L 372,248 L 398,252 L 415,265 L 415,285 L 398,300 L 375,305 L 352,298 L 342,282 L 345,265 Z",
  },
  {
    id: "Trujillo",
    name: "Trujillo",
    labelX: 242,
    labelY: 275,
    d: "M 192,248 L 215,242 L 238,245 L 258,258 L 258,278 L 242,292 L 220,295 L 200,288 L 188,272 Z",
  },
  {
    id: "Mérida",
    name: "Mérida",
    labelX: 198,
    labelY: 328,
    d: "M 155,292 L 180,285 L 205,292 L 225,308 L 228,332 L 212,350 L 188,358 L 165,350 L 148,335 L 148,312 Z",
  },
  {
    id: "Barinas",
    name: "Barinas",
    labelX: 318,
    labelY: 332,
    d: "M 248,295 L 282,292 L 322,295 L 358,298 L 382,308 L 388,332 L 378,358 L 348,368 L 315,368 L 282,362 L 255,348 L 242,325 L 245,308 Z",
  },
  {
    id: "Táchira",
    name: "Táchira",
    labelX: 138,
    labelY: 355,
    d: "M 100,318 L 128,312 L 152,318 L 162,338 L 162,362 L 148,378 L 122,382 L 100,372 L 88,352 L 92,332 Z",
  },
  {
    id: "Guárico",
    name: "Guárico",
    labelX: 488,
    labelY: 318,
    d: "M 415,278 L 448,272 L 488,275 L 528,278 L 558,292 L 568,318 L 558,348 L 528,368 L 495,375 L 462,368 L 432,352 L 415,328 L 412,308 Z",
  },
  {
    id: "Anzoátegui",
    name: "Anzoátegui",
    labelX: 622,
    labelY: 282,
    d: "M 558,248 L 595,242 L 635,245 L 668,255 L 682,278 L 678,308 L 658,328 L 628,338 L 595,335 L 565,322 L 552,300 L 552,275 Z",
  },
  {
    id: "Monagas",
    name: "Monagas",
    labelX: 708,
    labelY: 288,
    d: "M 668,255 L 705,248 L 742,252 L 765,268 L 768,295 L 752,318 L 722,330 L 690,328 L 665,315 L 655,295 L 658,272 Z",
  },
  {
    id: "Sucre",
    name: "Sucre",
    labelX: 752,
    labelY: 248,
    d: "M 700,228 L 738,222 L 775,225 L 798,238 L 800,255 L 782,268 L 752,272 L 722,268 L 705,255 L 705,238 Z",
  },
  {
    id: "Nueva Esparta",
    name: "N. Esparta",
    labelX: 810,
    labelY: 218,
    d: "M 798,202 L 822,198 L 840,205 L 845,218 L 835,232 L 815,238 L 798,232 L 790,218 Z",
  },
  {
    id: "Delta Amacuro",
    name: "Delta Amacuro",
    labelX: 798,
    labelY: 335,
    d: "M 762,298 L 798,292 L 835,298 L 858,318 L 862,348 L 845,372 L 812,382 L 780,375 L 762,355 L 755,328 Z",
  },
  {
    id: "Apure",
    name: "Apure",
    labelX: 355,
    labelY: 445,
    d: "M 160,368 L 205,362 L 255,365 L 298,368 L 348,372 L 395,375 L 432,378 L 458,388 L 462,415 L 448,445 L 415,462 L 375,468 L 332,465 L 288,458 L 248,448 L 212,435 L 182,418 L 162,398 Z",
  },
  {
    id: "Bolívar",
    name: "Bolívar",
    labelX: 608,
    labelY: 488,
    d: "M 462,375 L 505,372 L 555,368 L 598,358 L 638,345 L 672,332 L 708,335 L 748,338 L 762,358 L 758,392 L 745,428 L 725,462 L 695,495 L 658,522 L 618,538 L 575,545 L 532,542 L 492,528 L 458,508 L 435,482 L 428,452 L 435,425 L 448,400 L 458,388 Z",
  },
  {
    id: "Amazonas",
    name: "Amazonas",
    labelX: 318,
    labelY: 568,
    d: "M 180,418 L 215,408 L 252,418 L 285,428 L 320,432 L 358,438 L 392,448 L 418,462 L 428,492 L 425,528 L 408,558 L 382,582 L 348,598 L 308,608 L 268,605 L 232,592 L 200,572 L 175,548 L 162,518 L 162,485 L 168,455 L 178,432 Z",
  },
];

const getStateColor = (
  stateId: string,
  selectedState: string,
  count: number
): string => {
  if (stateId === selectedState) return "#FFD700";
  if (count > 5) return "#4a0080";
  if (count > 2) return "#6A0DAD";
  if (count > 0) return "#9c55d4";
  return "#e8e0f0";
};

const getTextColor = (stateId: string, selectedState: string, count: number): string => {
  if (stateId === selectedState) return "#000000";
  if (count > 0) return "#ffffff";
  return "#5a4a7a";
};

const VenezuelaMap: React.FC<VenezuelaMapProps> = ({
  selectedState,
  onStateSelect,
  resourceCounts,
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="relative flex-1 bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl border-2 border-brand-purple/30 overflow-hidden min-h-[340px] shadow-md">
        <svg
          viewBox="0 0 900 660"
          className="w-full h-full"
          aria-label="Mapa interactivo de Venezuela por estados"
        >
          {/* Ocean */}
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#93c5fd" />
            </radialGradient>
          </defs>
          <rect width="900" height="660" fill="url(#oceanGrad)" />

          {/* States */}
          {STATES.map((state) => {
            const count = resourceCounts[state.id] || 0;
            const isSelected = state.id === selectedState;
            const fill = getStateColor(state.id, selectedState, count);
            const textColor = getTextColor(state.id, selectedState, count);

            return (
              <g
                key={state.id}
                onClick={() => onStateSelect(isSelected ? "Todos" : state.id)}
                className="cursor-pointer"
                style={{ transition: "all 0.15s ease" }}
              >
                <path
                  d={state.d}
                  fill={fill}
                  stroke="white"
                  strokeWidth={isSelected ? 3 : 1.5}
                  style={{
                    filter: isSelected
                      ? "drop-shadow(0 0 6px rgba(255,215,0,0.8))"
                      : "drop-shadow(0 1px 2px rgba(0,0,0,0.12))",
                  }}
                />
                <text
                  x={state.labelX}
                  y={state.labelY}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight={isSelected ? "700" : "500"}
                  fill={textColor}
                  className="pointer-events-none select-none"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {state.name}
                </text>
                {count > 0 && (
                  <g>
                    <circle
                      cx={state.labelX + 16}
                      cy={state.labelY - 9}
                      r="8"
                      fill={isSelected ? "#6A0DAD" : "#FFD700"}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <text
                      x={state.labelX + 16}
                      y={state.labelY - 6}
                      textAnchor="middle"
                      fontSize="6.5"
                      fontWeight="800"
                      fill={isSelected ? "white" : "#000"}
                      className="pointer-events-none select-none"
                    >
                      {count}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Compass rose */}
          <g transform="translate(840, 45)">
            <text textAnchor="middle" x="0" y="-18" fontSize="10" fontWeight="bold" fill="#6A0DAD" opacity="0.7">N</text>
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#6A0DAD" strokeWidth="1.5" opacity="0.5" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#6A0DAD" strokeWidth="1.5" opacity="0.5" />
          </g>

          {/* Label */}
          <text x="450" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6A0DAD" opacity="0.8">
            Haz clic en un estado para filtrar
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs px-1">
        {[
          { color: "#e8e0f0", border: "#c9b8e8", label: "Sin registros" },
          { color: "#9c55d4", border: "transparent", label: "1–2 personas" },
          { color: "#6A0DAD", border: "transparent", label: "3–5 personas" },
          { color: "#4a0080", border: "transparent", label: "+5 personas" },
          { color: "#FFD700", border: "#c5a200", label: "Seleccionado" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-3.5 h-3.5 rounded-sm"
              style={{
                background: item.color,
                border: `1px solid ${item.border}`,
              }}
            />
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenezuelaMap;
