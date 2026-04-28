"use client";

import React from "react";

export interface VenezuelaMapProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  resourceCounts: Record<string, number>;
}

/**
 * Coordinate transform (lon, lat) → (svgX, svgY)
 * ViewBox: 0 0 960 820
 * Lon range: -73.4 to -59.7  → x: 10 to 950
 * Lat range: 12.2 to 0.7     → y: 10 to 810
 *
 * x = (lon + 73.4) / 13.7 * 940 + 10
 * y = (12.2 - lat) / 11.5 * 800 + 10
 */

// Each state polygon is derived from simplified real geographic coordinates
const STATES: { id: string; name: string; d: string; lx: number; ly: number }[] = [
  {
    // Zulia — NW state surrounding Lake Maracaibo
    id: "Zulia", name: "Zulia", lx: 100, ly: 220,
    d: `M 20,50 L 57,20 L 94,22 L 108,38 L 125,30 L 130,55
        L 118,80 L 108,95 L 118,115 L 130,140 L 138,170
        L 142,200 L 148,225 L 152,255 L 148,280 L 138,300
        L 125,318 L 112,332 L 98,342 L 82,348 L 65,340
        L 48,325 L 34,305 L 22,280 L 18,255 L 20,225
        L 22,195 L 20,165 L 20,130 L 20,95 Z`,
  },
  {
    // Falcón — northern state with Paraguaná Peninsula
    id: "Falcón", name: "Falcón", lx: 248, ly: 128,
    d: `M 185,118 L 198,100 L 210,85 L 222,75 L 235,65
        L 245,58 L 252,48 L 258,36 L 265,22 L 278,28
        L 290,22 L 302,28 L 308,40 L 302,55 L 295,65
        L 285,72 L 278,82 L 295,88 L 312,92 L 325,98
        L 335,108 L 342,118 L 340,132 L 332,142 L 318,148
        L 302,152 L 285,155 L 268,155 L 252,150 L 238,142
        L 222,135 L 208,128 L 195,122 Z`,
  },
  {
    // Lara
    id: "Lara", name: "Lara", lx: 265, ly: 215,
    d: `M 208,128 L 222,135 L 238,142 L 252,150 L 268,155
        L 285,155 L 302,152 L 318,148 L 332,142 L 340,132
        L 348,140 L 352,155 L 348,172 L 340,185 L 328,198
        L 312,208 L 295,215 L 278,218 L 262,215 L 248,208
        L 235,198 L 222,188 L 212,175 L 205,162 L 202,148
        L 202,135 Z`,
  },
  {
    // Yaracuy — small state
    id: "Yaracuy", name: "Yaracuy", lx: 360, ly: 195,
    d: `M 340,132 L 355,125 L 368,122 L 382,126 L 392,135
        L 398,148 L 395,162 L 385,172 L 372,178 L 358,178
        L 345,172 L 338,162 L 338,148 L 342,138 Z`,
  },
  {
    // Carabobo
    id: "Carabobo", name: "Carabobo", lx: 412, ly: 198,
    d: `M 382,126 L 398,120 L 415,118 L 428,122 L 438,132
        L 442,145 L 438,158 L 428,168 L 415,175 L 400,178
        L 388,175 L 378,165 L 375,152 L 378,140 Z`,
  },
  {
    // Aragua
    id: "Aragua", name: "Aragua", lx: 468, ly: 205,
    d: `M 428,122 L 445,115 L 462,112 L 478,115 L 492,122
        L 500,132 L 502,145 L 498,158 L 488,168 L 472,175
        L 458,178 L 442,175 L 432,165 L 428,152 L 428,138 Z`,
  },
  {
    // La Guaira (Vargas) — thin coastal strip
    id: "La Guaira", name: "La Guaira", lx: 460, ly: 100,
    d: `M 428,108 L 445,102 L 462,98 L 478,100 L 492,106
        L 498,115 L 492,122 L 478,115 L 462,112 L 445,115
        L 430,118 L 428,112 Z`,
  },
  {
    // Distrito Capital
    id: "Distrito Capital", name: "D. Capital", lx: 502, ly: 135,
    d: `M 492,106 L 508,102 L 520,105 L 525,115 L 522,125
        L 512,130 L 500,132 L 492,122 L 492,112 Z`,
  },
  {
    // Miranda
    id: "Miranda", name: "Miranda", lx: 540, ly: 175,
    d: `M 498,115 L 515,108 L 530,105 L 545,108 L 558,115
        L 568,125 L 572,140 L 568,155 L 558,165 L 542,172
        L 525,175 L 508,172 L 495,162 L 490,148 L 490,135
        L 494,122 L 498,115 Z`,
  },
  {
    // Trujillo — Andean state
    id: "Trujillo", name: "Trujillo", lx: 200, ly: 262,
    d: `M 148,225 L 162,220 L 178,218 L 195,222 L 210,228
        L 222,238 L 228,252 L 225,268 L 215,280 L 200,288
        L 185,290 L 170,285 L 158,275 L 150,260 L 148,245 Z`,
  },
  {
    // Portuguesa
    id: "Portuguesa", name: "Portuguesa", lx: 305, ly: 262,
    d: `M 248,208 L 262,215 L 278,218 L 295,215 L 312,208
        L 325,198 L 338,198 L 350,205 L 358,218 L 358,235
        L 350,250 L 338,262 L 322,270 L 305,272 L 288,268
        L 272,260 L 260,248 L 252,235 L 250,220 Z`,
  },
  {
    // Cojedes
    id: "Cojedes", name: "Cojedes", lx: 390, ly: 252,
    d: `M 358,178 L 372,178 L 385,172 L 398,175 L 412,180
        L 425,190 L 432,205 L 432,222 L 425,238 L 412,250
        L 395,258 L 378,260 L 362,255 L 350,245 L 345,230
        L 348,215 L 352,200 L 358,190 Z`,
  },
  {
    // Mérida — Andean
    id: "Mérida", name: "Mérida", lx: 158, ly: 318,
    d: `M 82,300 L 98,295 L 115,292 L 130,295 L 145,302
        L 158,312 L 168,325 L 172,342 L 168,358 L 158,370
        L 142,378 L 125,382 L 108,378 L 94,368 L 82,355
        L 75,338 L 75,320 Z`,
  },
  {
    // Táchira — SW Andean
    id: "Táchira", name: "Táchira", lx: 62, ly: 370,
    d: `M 20,318 L 38,310 L 55,305 L 72,305 L 88,308
        L 102,318 L 112,332 L 115,348 L 108,362 L 96,375
        L 80,385 L 62,390 L 45,388 L 30,380 L 20,368
        L 20,345 Z`,
  },
  {
    // Barinas — Llanos
    id: "Barinas", name: "Barinas", lx: 258, ly: 340,
    d: `M 148,280 L 162,272 L 178,268 L 195,268 L 210,272
        L 225,275 L 240,278 L 255,282 L 268,288 L 280,298
        L 288,312 L 292,328 L 288,345 L 278,358 L 262,368
        L 245,375 L 228,378 L 210,375 L 195,368 L 180,358
        L 168,345 L 158,330 L 152,315 L 150,298 Z`,
  },
  {
    // Guárico — Central Llanos
    id: "Guárico", name: "Guárico", lx: 465, ly: 335,
    d: `M 425,190 L 442,185 L 460,182 L 478,185 L 495,190
        L 512,195 L 528,202 L 542,212 L 552,225 L 558,242
        L 558,260 L 552,278 L 540,292 L 522,302 L 504,308
        L 485,310 L 466,308 L 448,300 L 432,288 L 420,272
        L 412,255 L 410,238 L 415,222 L 420,208 Z`,
  },
  {
    // Anzoátegui
    id: "Anzoátegui", name: "Anzoátegui", lx: 630, ly: 265,
    d: `M 558,175 L 575,168 L 592,162 L 610,160 L 628,162
        L 645,168 L 660,178 L 670,192 L 675,208 L 672,225
        L 662,240 L 648,252 L 630,260 L 612,265 L 594,265
        L 576,260 L 560,250 L 550,235 L 546,218 L 548,202
        L 552,188 Z`,
  },
  {
    // Monagas
    id: "Monagas", name: "Monagas", lx: 725, ly: 265,
    d: `M 660,178 L 678,170 L 698,165 L 718,165 L 738,170
        L 755,180 L 765,195 L 768,212 L 762,230 L 748,245
        L 730,255 L 710,260 L 690,260 L 672,255 L 658,242
        L 650,228 L 648,212 L 650,196 Z`,
  },
  {
    // Sucre — NE peninsula
    id: "Sucre", name: "Sucre", lx: 768, ly: 215,
    d: `M 710,165 L 730,155 L 752,148 L 775,145 L 798,148
        L 818,158 L 832,172 L 838,188 L 832,202 L 818,212
        L 800,218 L 780,220 L 760,218 L 742,210 L 728,198
        L 718,185 L 712,172 Z`,
  },
  {
    // Nueva Esparta — Island
    id: "Nueva Esparta", name: "N. Esparta", lx: 855, ly: 178,
    d: `M 840,165 L 858,160 L 875,162 L 888,170 L 892,182
        L 885,193 L 872,198 L 858,198 L 845,192 L 838,182
        L 838,172 Z`,
  },
  {
    // Delta Amacuro — Orinoco Delta, far east
    id: "Delta Amacuro", name: "Delta Amacuro", lx: 840, ly: 318,
    d: `M 762,258 L 782,248 L 802,242 L 825,242 L 848,248
        L 868,260 L 882,278 L 888,298 L 885,320 L 875,340
        L 858,355 L 838,362 L 818,362 L 798,355 L 782,342
        L 768,325 L 760,308 L 758,288 Z`,
  },
  {
    // Apure — Large central south llanos
    id: "Apure", name: "Apure", lx: 292, ly: 455,
    d: `M 20,368 L 38,358 L 58,350 L 78,345 L 98,342
        L 118,345 L 138,350 L 158,355 L 178,358 L 198,360
        L 218,362 L 238,365 L 258,368 L 278,372 L 298,378
        L 318,385 L 338,392 L 355,402 L 368,415 L 375,432
        L 375,450 L 368,468 L 355,482 L 338,492 L 318,498
        L 298,500 L 278,498 L 258,492 L 238,482 L 218,470
        L 198,458 L 178,448 L 158,440 L 138,435 L 118,432
        L 98,432 L 78,435 L 58,440 L 38,448 L 20,458
        L 20,415 Z`,
  },
  {
    // Bolívar — Huge SE state (Guayana)
    id: "Bolívar", name: "Bolívar", lx: 640, ly: 530,
    d: `M 410,308 L 432,302 L 455,298 L 478,298 L 500,302
        L 522,308 L 542,315 L 560,325 L 575,340 L 585,358
        L 590,378 L 590,398 L 585,420 L 575,440 L 560,460
        L 545,478 L 530,495 L 518,512 L 508,530 L 500,548
        L 495,568 L 492,590 L 492,612 L 495,635 L 498,658
        L 498,680 L 495,702 L 488,722 L 478,740 L 465,755
        L 450,765 L 435,772 L 420,775 L 405,775 L 390,772
        L 375,765 L 360,755 L 348,742 L 338,728 L 332,712
        L 330,695 L 332,678 L 338,662 L 348,648 L 362,635
        L 378,622 L 395,612 L 412,602 L 428,592 L 440,580
        L 450,565 L 455,548 L 456,530 L 452,512 L 444,495
        L 432,480 L 418,468 L 405,460 L 395,452 L 388,442
        L 382,430 L 378,415 L 375,400 L 372,385 L 368,370
        L 365,355 L 365,340 L 368,325 L 372,312 Z`,
  },
  {
    // Amazonas — Large southern state
    id: "Amazonas", name: "Amazonas", lx: 215, ly: 610,
    d: `M 20,458 L 38,450 L 58,444 L 78,440 L 98,438
        L 118,438 L 138,442 L 158,448 L 178,455 L 198,465
        L 218,475 L 238,488 L 258,498 L 278,505 L 298,508
        L 318,508 L 338,502 L 355,492 L 368,475 L 375,455
        L 382,440 L 388,455 L 392,475 L 395,498 L 395,520
        L 392,545 L 385,568 L 375,592 L 362,615 L 348,638
        L 335,658 L 325,678 L 318,698 L 312,720 L 308,742
        L 305,762 L 302,782 L 298,802 L 292,818
        L 270,822 L 248,820 L 225,815 L 202,808
        L 180,798 L 158,785 L 138,770 L 118,752
        L 100,732 L 84,710 L 70,688 L 58,665
        L 48,642 L 40,618 L 34,595 L 28,572
        L 22,548 L 20,522 L 20,495 Z`,
  },
];

const getStateFill = (id: string, selected: string, count: number): string => {
  if (id === selected) return "#FFD700";
  if (count > 5) return "#4a0080";
  if (count > 2) return "#6A0DAD";
  if (count > 0) return "#9460d0";
  return "#6A0DAD"; // default brand-purple for all states
};

const getStateOpacity = (id: string, selected: string, count: number): number => {
  if (id === selected) return 1;
  if (count > 0) return 1;
  return 0.72; // slightly transparent for states with no records
};

const VenezuelaMap: React.FC<VenezuelaMapProps> = ({ selectedState, onStateSelect, resourceCounts }) => {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="relative flex-1 rounded-2xl border-2 border-brand-purple/30 overflow-hidden shadow-md min-h-[360px]"
           style={{ background: "#4A90D9" }}>
        <svg
          viewBox="0 0 960 840"
          className="w-full h-full"
          aria-label="Mapa oficial interactivo de Venezuela por estados"
        >
          {/* Ocean gradient */}
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ab4f5" />
              <stop offset="100%" stopColor="#3478b5" />
            </linearGradient>
            <filter id="stateShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
            </filter>
          </defs>

          {/* Ocean background */}
          <rect width="960" height="840" fill="url(#oceanGrad)" />

          {/* Country label */}
          <text x="480" y="800" textAnchor="middle" fontSize="11" fill="white" opacity="0.6"
                fontFamily="system-ui,sans-serif" fontWeight="600" letterSpacing="2">
            MAR CARIBE
          </text>
          <text x="185" y="75" textAnchor="middle" fontSize="9" fill="white" opacity="0.55"
                fontFamily="system-ui,sans-serif" letterSpacing="1">
            COLOMBIA
          </text>
          <text x="650" y="800" textAnchor="middle" fontSize="9" fill="white" opacity="0.55"
                fontFamily="system-ui,sans-serif" letterSpacing="1">
            BRASIL
          </text>

          {/* States */}
          {STATES.map((state) => {
            const count = resourceCounts[state.id] || 0;
            const isSelected = state.id === selectedState;
            const fill = getStateFill(state.id, selectedState, count);
            const opacity = getStateOpacity(state.id, selectedState, count);

            return (
              <g key={state.id}
                 onClick={() => onStateSelect(isSelected ? "Todos" : state.id)}
                 className="cursor-pointer"
                 style={{ transition: "opacity 0.15s" }}>
                <path
                  d={state.d}
                  fill={fill}
                  fillOpacity={opacity}
                  stroke="#000000"
                  strokeWidth={isSelected ? 2.5 : 1}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{
                    filter: isSelected ? "drop-shadow(0 0 6px rgba(255,215,0,0.9))" : undefined,
                  }}
                />
                {/* State name label */}
                <text
                  x={state.lx}
                  y={state.ly}
                  textAnchor="middle"
                  fontSize={isSelected ? "8.5" : "7.5"}
                  fontWeight={isSelected ? "700" : "500"}
                  fill={isSelected ? "#000" : "#fff"}
                  stroke={isSelected ? "none" : "rgba(0,0,0,0.5)"}
                  strokeWidth="2"
                  paintOrder="stroke"
                  className="pointer-events-none select-none"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  {state.name}
                </text>
                {/* Resource count badge */}
                {count > 0 && (
                  <g>
                    <circle cx={state.lx + 14} cy={state.ly - 10} r="7.5"
                            fill="#FFD700" stroke="#000" strokeWidth="1" />
                    <text x={state.lx + 14} y={state.ly - 7}
                          textAnchor="middle" fontSize="7" fontWeight="800" fill="#000"
                          className="pointer-events-none select-none">
                      {count}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Instruction label */}
          <text x="480" y="22" textAnchor="middle" fontSize="10" fill="white" opacity="0.85"
                fontFamily="system-ui,sans-serif" fontWeight="600">
            Haz clic en un estado para filtrar — REPÚBLICA BOLIVARIANA DE VENEZUELA
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs px-1">
        {[
          { color: "#6A0DAD", border: "#000", label: "Sin registros" },
          { color: "#9460d0", border: "#000", label: "1–2 registros" },
          { color: "#4a0080", border: "#000", label: "+5 registros" },
          { color: "#FFD700", border: "#000", label: "Estado seleccionado" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-sm"
                 style={{ background: item.color, border: `1.5px solid ${item.border}` }} />
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenezuelaMap;
