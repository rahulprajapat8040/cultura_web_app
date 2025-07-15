
import Image from 'next/image';
import React from 'react';

const RenderVideoOrImage = ({ mediaUrl, mediaType }: { mediaUrl: string, mediaType: string }) => {
    if (!mediaUrl) return null;
    if (mediaType.startsWith("image/")) {
        return (
            <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${mediaUrl}`}
                alt={'media'}
                fill
                className="object-cover"
            />
        );
    }

    if (mediaType.startsWith("video/")) {
        return (
            <video
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${mediaUrl}`}
                controls
                loop
                className="w-full h-auto rounded-xl object-cover"
            />
        );
    }

    return <p className="text-sm text-red-500">Unsupported media type</p>;
};

export default RenderVideoOrImage;
