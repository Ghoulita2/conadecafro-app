"use client";

import React, { useState } from "react";
import { useDatabase, VENEZUELA_STATES, RESOURCE_TYPES } from "../../context/DatabaseContext";
import { PlusCircle, CheckCircle } from "lucide-react";

export const RegisterForm: React.FC = () => {
  const { addResource } = useDatabase();
  const [name, setName] = useState("");
  const [state, setState] = useState(Object.keys(VENEZUELA_STATES)[0]);
  const [type, setType] = useState(RESOURCE_TYPES[0]);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addResource({ name, state, type });
    setName("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition";

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-black text-brand-black mb-4 flex items-center gap-2">
        <PlusCircle className="text-brand-purple flex-shrink-0" size={20} />
        Registrar Persona / Comunidad
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
            Nombre
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Ej. Consejo Comunal Afro"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
            Estado
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={inputClass}
          >
            {Object.keys(VENEZUELA_STATES).sort().map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
            Tipo de Recurso
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClass}
          >
            {RESOURCE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full font-black py-2.5 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 ${
            saved
              ? "bg-green-500 text-white"
              : "bg-brand-purple hover:bg-purple-800 text-white hover:scale-[1.02]"
          }`}
        >
          {saved ? (
            <><CheckCircle size={16} /> ¡Guardado!</>
          ) : (
            "Guardar Registro"
          )}
        </button>
      </form>
    </div>
  );
};
