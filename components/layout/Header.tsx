import React from "react";
import { MapPin } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-black text-brand-white border-b-4 border-brand-yellow px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <div className="bg-brand-purple p-2 rounded-full flex items-center justify-center">
          <MapPin size={24} className="text-brand-yellow" />
        </div>
        <h1 className="text-2xl font-bold tracking-wider">HUB CONADECAFRO</h1>
      </div>
      <nav>
        <ul className="flex space-x-6 text-sm font-medium">
          <li className="hover:text-brand-yellow cursor-pointer transition-colors">Inicio</li>
          <li className="hover:text-brand-yellow cursor-pointer transition-colors">Recursos</li>
          <li className="hover:text-brand-yellow cursor-pointer transition-colors">Comunidades</li>
        </ul>
      </nav>
    </header>
  );
};
