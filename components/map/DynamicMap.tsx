import dynamic from "next/dynamic";
import { Resource } from "../../context/DatabaseContext";

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapWithoutSSR = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
      <div className="text-brand-purple font-medium">Cargando mapa...</div>
    </div>
  ),
});

interface DynamicMapProps {
  resources: Resource[];
  selectedState: string;
}

export const DynamicMap: React.FC<DynamicMapProps> = (props) => {
  return <MapWithoutSSR {...props} />;
};
