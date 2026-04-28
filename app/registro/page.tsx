"use client";

import React, { useState, useMemo } from "react";
import { RegisterForm } from "../../components/forms/RegisterForm";
import { FilterPanel } from "../../components/dashboard/FilterPanel";
import { ResourceList } from "../../components/dashboard/ResourceList";
import VenezuelaMap from "../../components/map/VenezuelaMap";
import { useDatabase } from "../../context/DatabaseContext";
import { Map, X } from "lucide-react";

export default function RegistroPage() {
  const { resources } = useDatabase();
  const [selectedState, setSelectedState] = useState<string>("Todos");
  const [showMap, setShowMap] = useState(false);

  // Count resources per state for the map
  const resourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    resources.forEach((r) => {
      counts[r.state] = (counts[r.state] || 0) + 1;
    });
    return counts;
  }, [resources]);

  return (
    <main className="flex-grow flex flex-col">
      {/* Mobile toggle bar */}
      <div className="md:hidden flex items-center justify-between bg-brand-black px-4 py-2 border-b border-brand-purple">
        <span className="text-brand-white text-sm font-bold">
          {selectedState === "Todos" ? "Todos los estados" : selectedState}
        </span>
        <button
          onClick={() => setShowMap((v) => !v)}
          className="flex items-center gap-2 bg-brand-purple text-white text-xs font-bold px-3 py-1.5 rounded-full"
        >
          {showMap ? <X size={14} /> : <Map size={14} />}
          {showMap ? "Ver lista" : "Ver mapa"}
        </button>
      </div>

      {/* Desktop & Mobile layout */}
      <div className="flex-grow flex flex-col md:flex-row gap-0 md:gap-4 md:p-4 overflow-hidden md:h-[calc(100vh-76px)]">
        {/* Sidebar — hidden on mobile when map is shown */}
        <aside className={`
          w-full md:w-80 lg:w-96 flex flex-col gap-3 overflow-y-auto
          md:flex-shrink-0 px-4 py-4 md:px-0 md:py-0
          ${showMap ? "hidden md:flex" : "flex"}
        `}>
          <RegisterForm />
          <FilterPanel selectedState={selectedState} setSelectedState={setSelectedState} />
          <ResourceList resources={resources} selectedState={selectedState} />
        </aside>

        {/* Map panel — fills remaining space, shown on mobile only when toggled */}
        <div className={`
          flex-grow flex flex-col min-h-[400px] md:min-h-0 px-4 pb-4 md:px-0 md:pb-0
          ${!showMap ? "hidden md:flex" : "flex"}
        `}>
          <VenezuelaMap
            selectedState={selectedState}
            onStateSelect={setSelectedState}
            resourceCounts={resourceCounts}
          />
        </div>
      </div>
    </main>
  );
}
