'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Star } from 'lucide-react';

export default function EventCard() {

    return (
        <div
            className="w-full group transition-all h-72 relative rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer group"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/img/home-banner.png"
                    alt="home"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            </div>
            <motion.div
                className="absolute inset-0 z-10 flex flex-col justify-between items-start px-6 py-4 space-y-3 text-white bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-lg transition-all duration-500"
            >
                {/* Rating + Badge */}
                <div className="flex items-center gap-3">
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <Star color="yellow" />
                    </motion.span>
                    <h4 className="font-semibold text-lg">4.5</h4>
                    <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                        Top Rated
                    </span>
                </div>

                <div className='w-full space-y-3'>
                    {/* Venue Name */}

                    {/* Price & Time */}
                    <div className="flex items-center justify-between w-full">
                        <h5 className="text-3xl font-semibold">$30</h5>
                        <h5 className="text-3xl font-semibold">9:45 PM</h5>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        {/* Availability Info */}
                        <p className="text-sm text-red-400 italic">Only 5 seats left!</p>
                        <p className="text-sm font-semibold text-gray-200">Tokyo Dome</p>
                    </div>

                </div>
            </motion.div>

            {/* Animated Text Overlay */}
            <AnimatePresence>
                <motion.div
                    className="absolute inset-0 z-20 flex flex-col justify-center items-start 
                    px-6 py-4 text-white space-y-3 backdrop-blur-md bg-black/30 transition-all duration-500
                    opacity-0 translate-y-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto"
                >
                    <motion.h3 className="text-2xl font-bold tracking-wide">
                        🎸 Rock Concert
                    </motion.h3>
                    <motion.p className="text-sm text-gray-200">
                        📅 August 31, 2025 @ 8:00 PM – September 1, 2030 @ 8:00 PM
                    </motion.p>
                    <motion.p className="text-sm text-gray-300">
                        📍 Doug Fir Lounge, 830 E. Burnside St., Portland, 97214
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300"
                    >
                        View on Google Maps
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
