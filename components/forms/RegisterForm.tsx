"use client";

import React, { useState } from "react";
import { useDatabase, VENEZUELA_STATES, RESOURCE_TYPES } from "../../context/DatabaseContext";
import { PlusCircle } from "lucide-react";

export const RegisterForm: React.FC = () => {
  const { addResource } = useDatabase();
  const [name, setName] = useState("");
  const [state, setState] = useState(Object.keys(VENEZUELA_STATES)[0]);
  const [type, setType] = useState(RESOURCE_TYPES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addResource({ name, state, type });
    setName("");
    // We keep state and type as is for consecutive entries, or we could reset them.
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center">
        <PlusCircle className="mr-2 text-brand-purple" size={20} />
        Registrar Nuevo Recurso
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Comunidad/Persona</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            placeholder="Ej. Consejo Comunal Afro"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-purple"
          >
            {Object.keys(VENEZUELA_STATES).sort().map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Recurso</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-purple"
          >
            {RESOURCE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-brand-purple hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Guardar Recurso
        </button>
      </form>
    </div>
  );
};
