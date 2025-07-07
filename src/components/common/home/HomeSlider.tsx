'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';


export default function HomeSlider() {

    const useHasMounted = () => {
        const [hasMounted, setHasMounted] = useState(false);
        useEffect(() => setHasMounted(true), []);
        return hasMounted;
    }
    const hasMounted = useHasMounted();
    const pieces = 5;
    const imagesData = [
        {
            url: '/assets/img/home-banner.png',
            text: 'Welcome To Cultura'
        },
        {
            url: '/assets/img/home-banner.png',
            text: 'Welcome To Cultura --- 1'
        },
        {
            url: '/assets/img/home-banner.png',
            text: 'Welcome To Cultura ---2'
        },
        {
            url: '/assets/img/home-banner.png',
            text: 'Welcome To Cultura --3'
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [showImage, setShowImage] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const totalPieces = pieces * pieces;
    
    useEffect(() => {
        // Clear all timeouts before starting new cycle
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowImage(false);
            timeoutRef.current = setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % imagesData.length);
                setShowImage(true);
            }, 600); // allow animation out before next image
        }, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [activeIndex]); // Only restart when image changes

    const getShuffledIndexes = () => {
        const indexes = Array.from({ length: totalPieces }, (_, i) => i);
        for (let i = indexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
        }
        return indexes;
    };

    const renderPieces = (imageUrl: string) => {
        const shuffledIndexes = getShuffledIndexes();
        
        return Array.from({ length: pieces }).flatMap((_, row) =>
            Array.from({ length: pieces }).map((_, col) => {
                const index = row * pieces + col;
                const shuffledIndex = shuffledIndexes[index];

                return (
                    <motion.div
                        key={index}
                        className="absolute"
                        style={{
                            width: `${100 / pieces}%`,
                            height: `${100 / pieces}%`,
                            left: `${(100 / pieces) * col}%`,
                            top: `${(100 / pieces) * row}%`,
                            overflow: 'hidden',
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 200,
                            rotate: Math.random() * 90 - 45,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                            y: 0,
                            rotate: 0,
                        }}
                        transition={{
                            delay: shuffledIndex * 0.01,
                            duration: 0.5,
                            ease: 'easeOut',
                        }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-no-repeat"
                            style={{
                                backgroundImage: `url('${imageUrl}')`,
                                backgroundSize: `${pieces * 100}% ${pieces * 100}%`,
                                backgroundPosition: `${(col * 100) / (pieces - 1)}% ${(row * 100) / (pieces - 1)}%`,
                            }}
                        />
                    </motion.div>
                );
            })
        );
    };
    if (!hasMounted) return null;

    return (
        <section className="relative w-full h-[550px] overflow-hidden">
            <div className="w-full h-full relative">
                {showImage && renderPieces(imagesData[activeIndex].url)}

                {/* Overlay with text and button */}
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-4"
                >
                    <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                        {imagesData[activeIndex].text}
                    </h3>
                    <button
                        className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
                        onClick={() => alert('Button clicked!')}
                    >
                        Explore Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
