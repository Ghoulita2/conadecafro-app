"use client";

import React, { useState } from "react";
import { RegisterForm } from "../../components/forms/RegisterForm";
import { FilterPanel } from "../../components/dashboard/FilterPanel";
import { ResourceList } from "../../components/dashboard/ResourceList";
import { DynamicMap } from "../../components/map/DynamicMap";
import { useDatabase } from "../../context/DatabaseContext";

export default function RegistroPage() {
  const { resources } = useDatabase();
  const [selectedState, setSelectedState] = useState<string>("Todos");

  return (
    <main className="flex-grow flex flex-col md:flex-row p-4 gap-4 overflow-hidden h-[calc(100vh-76px)]">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
        <RegisterForm />
        <FilterPanel selectedState={selectedState} setSelectedState={setSelectedState} />
        <ResourceList resources={resources} selectedState={selectedState} />
      </div>

      {/* Right Content - Map */}
      <div className="w-full md:w-2/3 lg:w-3/4 h-[500px] md:h-full pb-4">
        <DynamicMap resources={resources} selectedState={selectedState} />
      </div>
    </main>
  );
}
