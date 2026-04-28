import React from "react";
import { Resource } from "../../context/DatabaseContext";
import { MapPin, Users } from "lucide-react";

interface ResourceListProps {
  resources: Resource[];
  selectedState: string;
}

const TYPE_COLORS: Record<string, string> = {
  "Educación": "bg-blue-100 text-blue-700",
  "Cultura": "bg-purple-100 text-purple-700",
  "Salud": "bg-green-100 text-green-700",
  "Tecnología": "bg-cyan-100 text-cyan-700",
  "Emprendimiento": "bg-yellow-100 text-yellow-700",
  "Organización Comunitaria": "bg-orange-100 text-orange-700",
};

export const ResourceList: React.FC<ResourceListProps> = ({ resources, selectedState }) => {
  const filteredResources = selectedState === "Todos"
    ? resources
    : resources.filter((r) => r.state === selectedState);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex-grow flex flex-col">
      <h2 className="text-lg font-black text-brand-black mb-3 flex items-center gap-2">
        <Users className="text-brand-purple flex-shrink-0" size={18} />
        Directorio
        <span className="ml-auto text-xs font-bold bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full">
          {filteredResources.length}
        </span>
      </h2>

      {filteredResources.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center py-8 text-center">
          <div className="text-4xl mb-2">📌</div>
          <p className="text-gray-400 text-sm">
            {selectedState === "Todos"
              ? "Aún no hay registros. ¡Sé el primero!"
              : `No hay recursos en ${selectedState} todavía.`}
          </p>
        </div>
      ) : (
        <ul className="space-y-2 overflow-y-auto max-h-72 md:max-h-none pr-1">
          {filteredResources.map((resource) => (
            <li key={resource.id} className="p-3 border-l-4 border-brand-yellow bg-gray-50 rounded-r-xl hover:bg-yellow-50 transition-colors">
              <h3 className="font-bold text-brand-black text-sm leading-snug">{resource.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={11} /> {resource.state}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[resource.type] || "bg-gray-200 text-gray-600"}`}>
                  {resource.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
