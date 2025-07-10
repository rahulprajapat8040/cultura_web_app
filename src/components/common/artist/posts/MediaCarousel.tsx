'use client'
import React from 'react';
import Image from 'next/image';
import useDragScroll from '@/hooks/useDragScroll';
import { MediaFile } from '@/lib/interfaces/posts/postList.interface';

const MediaCarousel = ({ mediaFiles }: { mediaFiles: MediaFile[] }) => {
  const dragRef = useDragScroll();

  return (
    <div
      ref={dragRef}
      className="overflow-x-auto whitespace-nowrap mb-4 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex gap-4 snap-x snap-mandatory">
        {mediaFiles.map((media, index) => (
          <div
            key={index}
            className="min-w-[300px] sm:min-w-[400px] h-60 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center snap-center"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${media.mediaUrl}`}
              alt={`media-${index}`}
              width={800}
              height={300}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaCarousel;
