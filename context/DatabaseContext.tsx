"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Resource = {
  id: string;
  name: string;
  state: string;
  type: string;
  lat: number;
  lng: number;
};

// Coordenadas aproximadas de los Estados de Venezuela
export const VENEZUELA_STATES: Record<string, [number, number]> = {
  "Amazonas": [3.2861, -65.5583],
  "Anzoátegui": [9.0833, -64.2500],
  "Apure": [7.3333, -68.9999],
  "Aragua": [10.2333, -67.4333],
  "Barinas": [8.6226, -70.2147],
  "Bolívar": [6.3333, -63.5000],
  "Carabobo": [10.1999, -67.9999],
  "Cojedes": [9.3333, -68.3333],
  "Delta Amacuro": [8.5000, -61.5000],
  "Falcón": [11.3333, -69.6667],
  "Guárico": [8.8333, -66.5000],
  "Lara": [10.0667, -69.3333],
  "Mérida": [8.5983, -71.1449],
  "Miranda": [10.2500, -66.3333],
  "Monagas": [9.3333, -63.1667],
  "Nueva Esparta": [10.9999, -63.9999],
  "Portuguesa": [9.1667, -69.2500],
  "Sucre": [10.4500, -63.0000],
  "Táchira": [7.8333, -72.0000],
  "Trujillo": [9.3333, -70.4333],
  "La Guaira": [10.5999, -66.9333],
  "Yaracuy": [10.3333, -68.7500],
  "Zulia": [9.8333, -72.5000],
  "Distrito Capital": [10.4806, -66.9036],
};

export const RESOURCE_TYPES = [
  "Educación",
  "Cultura",
  "Salud",
  "Tecnología",
  "Emprendimiento",
  "Organización Comunitaria"
];

interface DatabaseContextType {
  resources: Resource[];
  addResource: (resource: Omit<Resource, "id" | "lat" | "lng">) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resources, setResources] = useState<Resource[]>([]);

  // Load from localStorage on client mount
  useEffect(() => {
    const saved = localStorage.getItem("conadecafro_resources");
    if (saved) {
      try {
        setResources(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to localStorage when resources change
  useEffect(() => {
    localStorage.setItem("conadecafro_resources", JSON.stringify(resources));
  }, [resources]);

  const addResource = (data: Omit<Resource, "id" | "lat" | "lng">) => {
    // Generate slight random offset for markers in same state to avoid exact overlap
    const stateCoords = VENEZUELA_STATES[data.state] || [7.8, -66.0];
    const offsetLat = (Math.random() - 0.5) * 0.1;
    const offsetLng = (Math.random() - 0.5) * 0.1;

    const newResource: Resource = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      lat: stateCoords[0] + offsetLat,
      lng: stateCoords[1] + offsetLng,
    };
    setResources((prev) => [...prev, newResource]);
  };

  return (
    <DatabaseContext.Provider value={{ resources, addResource }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};
