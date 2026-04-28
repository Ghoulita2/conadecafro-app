"use client";
import React from "react";

export interface VenezuelaMapProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  resourceCounts: Record<string, number>;
}

// Coordinate transform: geographic (lon,lat) → SVG (x,y)
// ViewBox 0 0 1000 760
// x = (lon + 73.35) / 13.55 * 1000
// y = (12.20 - lat) / 11.55 * 748 + 6
// p() helper pre-computed below

const STATES: { id: string; name: string; d: string; lx: number; ly: number }[] = [
  {
    id: "Zulia", name: "Zulia", lx: 112, ly: 195,
    d: "M 0,15 L 26,15 L 55,28 L 77,41 L 99,54 L 113,73 L 136,86 L 155,100 L 165,116 L 170,136 L 172,158 L 168,180 L 158,198 L 148,215 L 140,228 L 136,248 L 130,268 L 125,290 L 118,310 L 106,326 L 88,338 L 66,345 L 44,342 L 22,332 L 8,316 L 0,300 Z",
  },
  {
    id: "Falcón", name: "Falcón", lx: 252, ly: 88,
    d: "M 136,86 L 155,100 L 165,116 L 175,106 L 188,94 L 202,76 L 214,58 L 220,42 L 228,26 L 235,15 L 242,26 L 238,44 L 232,60 L 240,52 L 252,40 L 262,28 L 272,18 L 282,28 L 290,42 L 286,58 L 278,72 L 292,78 L 308,86 L 320,96 L 328,110 L 322,124 L 310,132 L 295,136 L 278,138 L 262,136 L 245,130 L 228,120 L 214,108 L 200,116 L 188,126 L 175,130 L 162,128 L 150,120 Z",
  },
  {
    id: "Lara", name: "Lara", lx: 268, ly: 182,
    d: "M 170,136 L 175,130 L 188,126 L 200,116 L 214,108 L 228,120 L 245,130 L 262,136 L 278,138 L 295,136 L 310,132 L 322,124 L 328,110 L 338,118 L 345,132 L 342,148 L 332,162 L 318,172 L 302,180 L 285,184 L 268,184 L 252,178 L 238,168 L 225,155 L 212,146 L 198,140 L 182,138 Z",
  },
  {
    id: "Yaracuy", name: "Yaracuy", lx: 358, ly: 172,
    d: "M 322,124 L 340,116 L 358,112 L 375,116 L 388,126 L 395,140 L 390,155 L 378,165 L 362,170 L 346,168 L 332,160 L 325,146 L 328,132 Z",
  },
  {
    id: "Carabobo", name: "Carabobo", lx: 414, ly: 180,
    d: "M 388,126 L 408,118 L 428,115 L 445,120 L 456,132 L 458,148 L 450,162 L 436,170 L 420,174 L 402,170 L 390,158 L 388,142 Z",
  },
  {
    id: "Aragua", name: "Aragua", lx: 476, ly: 180,
    d: "M 445,120 L 468,112 L 490,110 L 508,116 L 520,130 L 522,148 L 514,162 L 498,172 L 480,176 L 462,172 L 448,162 L 445,146 L 448,132 Z",
  },
  {
    id: "La Guaira", name: "La Guaira", lx: 464, ly: 102,
    d: "M 432,104 L 448,98 L 465,95 L 482,98 L 498,104 L 508,116 L 490,110 L 468,112 L 448,118 L 436,112 Z",
  },
  {
    id: "Distrito Capital", name: "D. Capital", lx: 526, ly: 130,
    d: "M 498,104 L 518,100 L 534,104 L 540,118 L 534,130 L 520,136 L 506,132 L 498,120 Z",
  },
  {
    id: "Miranda", name: "Miranda", lx: 548, ly: 172,
    d: "M 508,116 L 520,130 L 522,148 L 518,164 L 508,174 L 528,170 L 548,166 L 565,162 L 578,154 L 584,140 L 580,124 L 568,112 L 552,105 L 535,104 L 520,108 Z",
  },
  {
    id: "Trujillo", name: "Trujillo", lx: 196, ly: 242,
    d: "M 168,180 L 182,178 L 198,180 L 212,188 L 222,200 L 225,216 L 218,230 L 205,240 L 190,244 L 175,240 L 162,228 L 158,212 L 162,198 Z",
  },
  {
    id: "Portuguesa", name: "Portuguesa", lx: 305, ly: 240,
    d: "M 252,178 L 268,184 L 285,184 L 302,180 L 318,172 L 332,162 L 346,168 L 358,178 L 365,192 L 362,210 L 350,224 L 332,234 L 312,240 L 292,240 L 274,232 L 260,218 L 252,202 L 250,188 Z",
  },
  {
    id: "Cojedes", name: "Cojedes", lx: 390, ly: 228,
    d: "M 362,170 L 378,165 L 395,168 L 410,176 L 422,190 L 425,206 L 418,222 L 404,232 L 388,236 L 370,232 L 356,220 L 350,206 L 352,192 L 358,180 Z",
  },
  {
    id: "Barinas", name: "Barinas", lx: 240, ly: 302,
    d: "M 140,248 L 158,242 L 175,240 L 190,244 L 205,248 L 218,255 L 228,268 L 232,285 L 228,305 L 218,322 L 202,335 L 182,342 L 162,345 L 142,342 L 125,332 L 115,316 L 112,298 L 118,280 L 128,265 L 136,255 Z",
  },
  {
    id: "Mérida", name: "Mérida", lx: 150, ly: 300,
    d: "M 88,258 L 106,252 L 125,250 L 140,255 L 150,268 L 155,285 L 150,302 L 138,316 L 120,325 L 100,328 L 82,322 L 68,308 L 65,292 L 70,276 L 80,264 Z",
  },
  {
    id: "Táchira", name: "Táchira", lx: 65, ly: 358,
    d: "M 22,332 L 44,328 L 65,328 L 82,334 L 96,348 L 100,365 L 94,382 L 78,394 L 58,398 L 38,392 L 20,378 L 10,360 L 12,342 Z",
  },
  {
    id: "Guárico", name: "Guárico", lx: 478, ly: 295,
    d: "M 425,206 L 448,198 L 472,194 L 498,194 L 522,200 L 545,210 L 562,225 L 568,245 L 564,268 L 552,288 L 532,305 L 508,315 L 482,318 L 456,312 L 432,298 L 415,280 L 408,260 L 410,240 L 418,224 Z",
  },
  {
    id: "Anzoátegui", name: "Anzoátegui", lx: 622, ly: 255,
    d: "M 565,162 L 580,155 L 598,148 L 618,145 L 640,148 L 660,156 L 676,168 L 685,185 L 682,205 L 670,222 L 652,235 L 630,242 L 608,245 L 585,240 L 565,228 L 552,210 L 548,190 L 552,172 Z",
  },
  {
    id: "Monagas", name: "Monagas", lx: 720, ly: 248,
    d: "M 660,156 L 682,148 L 705,145 L 728,148 L 750,158 L 765,175 L 768,196 L 758,215 L 740,230 L 718,238 L 694,240 L 672,232 L 655,218 L 648,198 L 650,178 Z",
  },
  {
    id: "Sucre", name: "Sucre", lx: 768, ly: 195,
    d: "M 718,148 L 740,138 L 762,132 L 786,132 L 808,140 L 825,155 L 835,172 L 832,190 L 818,204 L 798,212 L 775,215 L 752,210 L 732,198 L 720,182 L 716,165 Z",
  },
  {
    id: "Nueva Esparta", name: "N. Esparta", lx: 862, ly: 142,
    d: "M 848,128 L 866,122 L 882,126 L 892,138 L 890,152 L 876,160 L 860,158 L 848,148 L 844,136 Z",
  },
  {
    id: "Delta Amacuro", name: "Delta Amacuro", lx: 858, ly: 285,
    d: "M 765,235 L 788,228 L 812,225 L 836,230 L 858,242 L 875,260 L 882,282 L 878,306 L 862,326 L 840,338 L 815,342 L 790,336 L 768,320 L 752,298 L 748,272 L 752,250 Z",
  },
  {
    id: "Apure", name: "Apure", lx: 295, ly: 422,
    d: "M 20,378 L 40,368 L 65,360 L 95,352 L 125,348 L 155,348 L 182,352 L 208,358 L 235,362 L 262,368 L 288,375 L 312,382 L 335,390 L 355,400 L 370,415 L 375,435 L 368,455 L 352,470 L 330,480 L 305,486 L 278,486 L 250,480 L 222,470 L 195,458 L 168,445 L 142,435 L 115,428 L 88,425 L 62,425 L 38,428 L 20,435 L 18,408 Z",
  },
  {
    id: "Bolívar", name: "Bolívar", lx: 660, ly: 512,
    d: "M 408,318 L 432,310 L 456,305 L 482,302 L 508,305 L 532,312 L 555,322 L 572,340 L 582,362 L 585,388 L 578,415 L 562,440 L 540,462 L 515,482 L 490,500 L 465,518 L 442,538 L 425,560 L 415,585 L 408,612 L 405,640 L 408,668 L 412,696 L 415,722 L 418,748 L 446,754 L 475,755 L 505,750 L 535,740 L 562,725 L 585,706 L 604,683 L 618,656 L 628,626 L 635,595 L 640,562 L 645,528 L 652,495 L 660,462 L 668,428 L 672,395 L 670,362 L 660,332 L 644,308 L 622,292 L 598,280 L 572,272 L 545,268 L 518,268 L 492,272 L 468,280 L 445,292 L 424,308 Z",
  },
  {
    id: "Amazonas", name: "Amazonas", lx: 215, ly: 586,
    d: "M 20,435 L 38,430 L 62,428 L 88,428 L 115,432 L 142,440 L 168,452 L 195,465 L 222,478 L 250,488 L 278,492 L 305,490 L 328,482 L 346,468 L 358,450 L 368,432 L 380,450 L 390,470 L 398,495 L 404,522 L 408,550 L 412,578 L 415,608 L 415,638 L 412,668 L 408,698 L 405,728 L 402,754 L 375,758 L 345,756 L 315,750 L 285,740 L 255,726 L 228,708 L 202,686 L 178,660 L 158,630 L 140,598 L 125,565 L 112,530 L 100,494 L 88,458 L 55,448 L 30,448 L 20,458 Z",
  },
];

// Lake Maracaibo overlay (blue, non-interactive)
const LAKE_MARACAIBO = "M 118,145 L 132,135 L 148,135 L 160,148 L 165,165 L 162,185 L 154,200 L 142,210 L 128,212 L 115,205 L 106,190 L 105,172 L 108,158 Z";

const getStateFill = (id: string, selected: string, count: number): string => {
  if (id === selected) return "#FFD700";
  if (count > 5) return "#4a0080";
  if (count > 2) return "#7B1DB5";
  if (count > 0) return "#8B35C5";
  return "#6A0DAD";
};

const VenezuelaMap: React.FC<VenezuelaMapProps> = ({ selectedState, onStateSelect, resourceCounts }) => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="relative flex-1 rounded-2xl border-2 border-brand-purple/30 overflow-hidden shadow-md min-h-[360px]">
        <svg viewBox="0 0 1000 768" className="w-full h-full" style={{ background: "#4A90D9" }}
          aria-label="Mapa de Venezuela por estados">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EB6F5" />
              <stop offset="100%" stopColor="#2E6FB0" />
            </linearGradient>
          </defs>

          {/* Ocean background */}
          <rect width="1000" height="768" fill="url(#bg)" />

          {/* Geographic labels */}
          <text x="500" y="22" textAnchor="middle" fontSize="10" fill="white" opacity="0.7"
            fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="3">MAR CARIBE</text>
          <text x="88" y="460" textAnchor="middle" fontSize="8" fill="white" opacity="0.55"
            fontFamily="system-ui,sans-serif" transform="rotate(-30,88,460)">COLOMBIA</text>
          <text x="600" y="758" textAnchor="middle" fontSize="8" fill="white" opacity="0.55"
            fontFamily="system-ui,sans-serif" letterSpacing="1">BRASIL</text>
          <text x="940" y="380" textAnchor="middle" fontSize="8" fill="white" opacity="0.45"
            fontFamily="system-ui,sans-serif" transform="rotate(90,940,380)">GUYANA</text>

          {/* State polygons */}
          {STATES.map((state) => {
            const count = resourceCounts[state.id] || 0;
            const isSelected = state.id === selectedState;
            return (
              <g key={state.id} onClick={() => onStateSelect(isSelected ? "Todos" : state.id)}
                className="cursor-pointer">
                <path
                  d={state.d}
                  fill={getStateFill(state.id, selectedState, count)}
                  stroke="#000"
                  strokeWidth={isSelected ? 2.2 : 0.8}
                  strokeLinejoin="round"
                  style={{ filter: isSelected ? "drop-shadow(0 0 5px rgba(255,215,0,0.9))" : undefined }}
                />
                <text x={state.lx} y={state.ly} textAnchor="middle" fontSize="7.5"
                  fontWeight={isSelected ? "700" : "500"} fill={isSelected ? "#000" : "#fff"}
                  stroke="rgba(0,0,0,0.6)" strokeWidth="2" paintOrder="stroke"
                  className="pointer-events-none select-none" fontFamily="system-ui,sans-serif">
                  {state.name}
                </text>
                {count > 0 && (
                  <g>
                    <circle cx={state.lx + 14} cy={state.ly - 10} r="7.5" fill="#FFD700" stroke="#000" strokeWidth="1" />
                    <text x={state.lx + 14} y={state.ly - 7} textAnchor="middle" fontSize="7"
                      fontWeight="800" fill="#000" className="pointer-events-none select-none">{count}</text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Lake Maracaibo overlay */}
          <path d={LAKE_MARACAIBO} fill="url(#bg)" stroke="#000" strokeWidth="0.5" className="pointer-events-none" />

          {/* Instruction */}
          <text x="500" y="750" textAnchor="middle" fontSize="9" fill="white" opacity="0.7"
            fontFamily="system-ui,sans-serif">Haz clic en un estado para filtrar</text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs px-1">
        {[
          { color: "#6A0DAD", label: "Sin registros" },
          { color: "#8B35C5", label: "1–2 registros" },
          { color: "#4a0080", label: "+5 registros" },
          { color: "#FFD700", label: "Estado seleccionado" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm border border-black/30" style={{ background: item.color }} />
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenezuelaMap;
