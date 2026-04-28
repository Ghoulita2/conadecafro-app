import React from "react";
import { VENEZUELA_STATES } from "../../context/DatabaseContext";
import { Filter } from "lucide-react";

interface FilterPanelProps {
  selectedState: string;
  setSelectedState: (state: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ selectedState, setSelectedState }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-4">
      <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center">
        <Filter className="mr-2 text-brand-purple" size={20} />
        Filtrar por Estado
      </h2>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-purple"
      >
        <option value="Todos">Todos los Estados</option>
        {Object.keys(VENEZUELA_STATES).sort().map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
};
