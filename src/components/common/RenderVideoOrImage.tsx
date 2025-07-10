
import { Base_Url } from '@/app/callApi';
import Image from 'next/image';
import React from 'react';

const RenderVideoOrImage = ({ mediaUrl, mediaType }: { mediaUrl: string, mediaType: string }) => {
    if (!mediaUrl) return null;
    if (mediaType.startsWith("image/")) {
        return (
            <Image
                src={`${Base_Url}/${mediaUrl}`}
                alt={'media'}
                fill
                className="object-cover"
            />
        );
    }

    if (mediaType.startsWith("video/")) {
        return (
            <video
                src={`${Base_Url}/${mediaUrl}`}
                controls
                loop
                className="w-full h-auto rounded-xl object-cover"
            />
        );
    }

    return <p className="text-sm text-red-500">Unsupported media type</p>;
};

export default RenderVideoOrImage;
