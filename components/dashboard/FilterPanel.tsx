"use client";

import React from "react";
import { VENEZUELA_STATES } from "../../context/DatabaseContext";
import { Filter, X } from "lucide-react";

interface FilterPanelProps {
  selectedState: string;
  setSelectedState: (state: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ selectedState, setSelectedState }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-black text-brand-black mb-3 flex items-center gap-2">
        <Filter className="text-brand-purple flex-shrink-0" size={18} />
        Filtrar por Estado
      </h2>

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition"
      >
        <option value="Todos">Todos los Estados</option>
        {Object.keys(VENEZUELA_STATES).sort().map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {selectedState !== "Todos" && (
        <button
          onClick={() => setSelectedState("Todos")}
          className="mt-2 flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:text-purple-800 transition"
        >
          <X size={12} /> Limpiar filtro
        </button>
      )}
    </div>
  );
};
