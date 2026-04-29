"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

export interface VenezuelaMapProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  resourceCounts: Record<string, number>;
}

// ── Mapa interno (cargado únicamente en el cliente) ──────────────────────────
function MapInner({ selectedState, onStateSelect, resourceCounts }: VenezuelaMapProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [L, setL] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [RL, setRL] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoData, setGeoData] = useState<any>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Carga leaflet + react-leaflet + GeoJSON en el cliente
  useEffect(() => {
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
      fetch("/venezuela-states.geojson").then((r) => r.json()),
    ]).then(([leaflet, reactLeaflet, geo]) => {
      // Fix de iconos por defecto de Leaflet con Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
      setL(leaflet);
      setRL(reactLeaflet);
      setGeoData(geo);
    });
  }, []);

  // Zoom al estado seleccionado
  useEffect(() => {
    if (!mapRef.current || !L || !geoData) return;
    if (selectedState === "Todos") {
      mapRef.current.setView([8.0, -66.0], 6);
    } else {
      // Busca el feature del estado y hace zoom a sus bounds
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const feature = geoData.features.find((f: any) =>
        normalizeState(f.properties.ESTADO) === selectedState
      );
      if (feature) {
        const layer = L.geoJSON(feature);
        mapRef.current.fitBounds(layer.getBounds(), { padding: [40, 40] });
      }
    }
  }, [selectedState, L, geoData]);

  if (!L || !RL || !geoData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-blue-50 rounded-2xl border-2 border-brand-purple/20">
        <div className="flex flex-col items-center gap-3 text-brand-purple">
          <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold">Cargando mapa oficial…</span>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, GeoJSON, ZoomControl } = RL;

  // Estilo de cada feature según paleta institucional
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featureStyle = (feature: any) => {
    const stateName = normalizeState(feature?.properties?.ESTADO ?? "");
    const isSelected = stateName === selectedState;
    const count = resourceCounts[stateName] ?? 0;

    if (isSelected) {
      return {
        fillColor: "#FFD700",
        fillOpacity: 0.92,
        color: "#000000",
        weight: 1.5,
      };
    }
    if (count > 5) return baseStyle("#4a0080");
    if (count > 2) return baseStyle("#7B1DB5");
    if (count > 0) return baseStyle("#8B35C5");
    return baseStyle("#6A0DAD");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEachFeature = (feature: any, layer: L.Layer) => {
    const stateName = normalizeState(feature?.properties?.ESTADO ?? "");
    const count = resourceCounts[stateName] ?? 0;

    // Tooltip
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (layer as any).bindTooltip(
      `<div style="font-family:system-ui;font-size:13px;font-weight:700;color:#3b0764;padding:4px 8px">
        ${stateName}${count > 0 ? ` &nbsp;<span style="background:#FFD700;color:#000;border-radius:9999px;padding:1px 7px;font-size:11px">●${count}</span>` : ""}
      </div>`,
      { sticky: true, opacity: 1, className: "custom-tooltip" }
    );

    // Click para filtrar
    layer.on("click", () => {
      onStateSelect(stateName === selectedState ? "Todos" : stateName);
    });

    // Hover
    layer.on("mouseover", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).setStyle({ fillOpacity: 0.85, weight: 2 });
    });
    layer.on("mouseout", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (layer as any).setStyle(featureStyle(feature));
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Mapa */}
      <div
        className="relative flex-1 rounded-2xl border-2 border-brand-purple/30 overflow-hidden shadow-md min-h-[360px]"
        style={{ minHeight: 360 }}
      >
        <MapContainer
          center={[8.0, -66.0]}
          zoom={6}
          zoomControl={false}
          minZoom={5}
          maxZoom={10}
          maxBounds={[[0, -75], [13, -58]]}
          maxBoundsViscosity={0.8}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {/* Fondo: océano azul institucional (CartoDB Positron en tono azul) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
            opacity={0}
          />
          {/* Capa de color sólido azul para simular océano */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #6EB6F5 0%, #2E6FB0 100%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* GeoJSON de estados venezolanos */}
          <GeoJSON
            key={selectedState} // re-renderiza cuando cambia la selección para actualizar estilos
            data={geoData}
            style={featureStyle}
            onEachFeature={onEachFeature}
          />

          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs px-1">
        {[
          { color: "#6A0DAD", label: "Sin registros" },
          { color: "#8B35C5", label: "1–2 registros" },
          { color: "#4a0080", label: "+5 registros" },
          { color: "#FFD700", label: "Estado seleccionado" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-3.5 h-3.5 rounded-sm border border-black/30"
              style={{ background: item.color }}
            />
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Normaliza los nombres del GeoJSON (MAYÚSCULAS) al formato del sistema */
const STATE_MAP: Record<string, string> = {
  AMAZONAS: "Amazonas",
  ANZOATEGUI: "Anzoátegui",
  APURE: "Apure",
  ARAGUA: "Aragua",
  BARINAS: "Barinas",
  BOLIVAR: "Bolívar",
  CARABOBO: "Carabobo",
  COJEDES: "Cojedes",
  "DELTA AMACURO": "Delta Amacuro",
  "DISTRITO CAPITAL": "Distrito Capital",
  FALCON: "Falcón",
  GUARICO: "Guárico",
  "LA GUAIRA": "La Guaira",
  LARA: "Lara",
  MERIDA: "Mérida",
  MIRANDA: "Miranda",
  MONAGAS: "Monagas",
  "NUEVA ESPARTA": "Nueva Esparta",
  PORTUGUESA: "Portuguesa",
  SUCRE: "Sucre",
  TACHIRA: "Táchira",
  TRUJILLO: "Trujillo",
  YARACUY: "Yaracuy",
  ZULIA: "Zulia",
};

function normalizeState(raw: string): string {
  const key = raw.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return STATE_MAP[key] ?? raw;
}

function baseStyle(fillColor: string) {
  return {
    fillColor,
    fillOpacity: 0.82,
    color: "#000000",
    weight: 0.8,
  };
}

// ── Export con SSR deshabilitado (Leaflet requiere window) ──────────────────
const VenezuelaMap = dynamic(() => Promise.resolve(MapInner), { ssr: false });
export default VenezuelaMap;
