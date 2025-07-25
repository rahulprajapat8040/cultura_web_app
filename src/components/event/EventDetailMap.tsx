'use client'

import dynamic from "next/dynamic";


const MapSelector = dynamic(() => import("../common/MapSelector"), {
    ssr: false,
});

const EventDetailMap = ({ latitude, longitude }: { latitude: string, longitude: string }) => {
    return (
        <div className="py-3 max-w-3xl w-full">
            <MapSelector
                defaultPosition={[Number(latitude), Number(longitude)]}
            />
        </div>
    )
}

export default EventDetailMap;