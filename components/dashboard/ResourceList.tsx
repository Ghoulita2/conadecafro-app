import React from "react";
import { Resource } from "../../context/DatabaseContext";
import { MapPin, Users } from "lucide-react";

interface ResourceListProps {
  resources: Resource[];
  selectedState: string;
}

export const ResourceList: React.FC<ResourceListProps> = ({ resources, selectedState }) => {
  const filteredResources = selectedState === "Todos" 
    ? resources 
    : resources.filter((r) => r.state === selectedState);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-4 flex-grow overflow-auto">
      <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center">
        <Users className="mr-2 text-brand-purple" size={20} />
        Directorio de Recursos
      </h2>
      
      {filteredResources.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay recursos registrados en esta ubicación.</p>
      ) : (
        <ul className="space-y-3">
          {filteredResources.map((resource) => (
            <li key={resource.id} className="p-3 border-l-4 border-brand-yellow bg-gray-50 rounded-r-md">
              <h3 className="font-bold text-brand-black">{resource.name}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="flex items-center"><MapPin size={14} className="mr-1" /> {resource.state}</span>
                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs">{resource.type}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
