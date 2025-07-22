'use client'

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapSelectorProps {
    onLocationSelect?: (lat: number, lng: number, address?: string) => void;
    defaultPosition?: [number, number];
}

interface LocationMarkerProps {
    position: [number, number];
    setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
    onSelect: (lat: number, lng: number, address?: string) => void;
}

const LocationMarker = ({ position, setPosition, onSelect }: LocationMarkerProps) => {
    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                const data = await response.json();
                const address = data.display_name || '';
                onSelect(lat, lng, address); // pass address to parent
            } catch (error) {
                console.error("Reverse geocoding failed", error);
                onSelect(lat, lng,); // fallback
            }
        },
    });

    return <Marker position={position} />;
};


const MapSelector = ({
    onLocationSelect,
    defaultPosition = [20.5937, 78.9629], // India center
}: MapSelectorProps) => {
    const [position, setPosition] = useState<[number, number]>(defaultPosition);

    useEffect(() => {
        setPosition(defaultPosition);
        if (onLocationSelect) {
            onLocationSelect(defaultPosition[0], defaultPosition[1]);
        }
    }, [defaultPosition?.[0], defaultPosition?.[1]]); // 🔁 react when defaultPosition changes

    return (
        <div className="h-[400px] w-full rounded overflow-hidden z-0">
            <MapContainer
                center={position}
                zoom={5}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
            >
                <TileLayer
                    attribution='© OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    onSelect={onLocationSelect ?? (() => { })}
                />
            </MapContainer>
        </div>
    );
};

export default MapSelector;
