import Image from 'next/image';
import React from 'react';
import { MapPin, Calendar, Star, Heart, ArrowRight } from 'lucide-react';
import { apiCall } from '@/app/callApi';

const dummyVenues = [
    {
        id: 1,
        name: 'Sunset Arena',
        location: 'Tokyo, Japan',
        price: '¥12,000/day',
        image: '/images/venue1.jpg',
        rating: 4.8,
        category: 'Arena',
        features: ['WiFi', 'Parking', 'AC'],
        bookings: 127
    },
    {
        id: 2,
        name: 'Global Culture Hall',
        location: 'Osaka, Japan',
        price: '¥18,000/day',
        image: '/images/venue2.jpg',
        rating: 4.9,
        category: 'Hall',
        features: ['Sound System', 'Stage', 'Catering'],
        bookings: 89
    },
    {
        id: 3,
        name: 'Hikari Events Dome',
        location: 'Kyoto, Japan',
        price: '¥25,000/day',
        image: '/images/venue3.jpg',
        rating: 4.7,
        category: 'Dome',
        features: ['LED Screen', 'VIP Area', 'Security'],
        bookings: 156
    },
    {
        id: 4,
        name: 'Cultura Plaza',
        location: 'Nagoya, Japan',
        price: '¥15,000/day',
        image: '/images/venue4.jpg',
        rating: 4.6,
        category: 'Plaza',
        features: ['Outdoor', 'Garden', 'Lighting'],
        bookings: 92
    },
    {
        id: 5,
        name: 'Neon District Club',
        location: 'Shibuya, Japan',
        price: '¥22,000/day',
        image: '/images/venue4.jpg',
        rating: 4.8,
        category: 'Club',
        features: ['Dance Floor', 'Bar', 'DJ Booth'],
        bookings: 203
    },
    {
        id: 6,
        name: 'Sakura Convention Center',
        location: 'Fukuoka, Japan',
        price: '¥28,000/day',
        image: '/images/venue4.jpg',
        rating: 4.9,
        category: 'Convention',
        features: ['Meeting Rooms', 'Exhibition', 'Catering'],
        bookings: 134
    },
    {
        id: 7,
        name: 'Zen Garden Pavilion',
        location: 'Nara, Japan',
        price: '¥20,000/day',
        image: '/images/venue4.jpg',
        rating: 4.7,
        category: 'Pavilion',
        features: ['Traditional', 'Garden View', 'Tea Service'],
        bookings: 78
    },
    {
        id: 8,
        name: 'Future Tech Arena',
        location: 'Yokohama, Japan',
        price: '¥35,000/day',
        image: '/images/venue4.jpg',
        rating: 4.9,
        category: 'Tech Hub',
        features: ['Holographic', 'AI Support', 'VR Ready'],
        bookings: 89
    },
];



const Venues = async () => {
    const res = await apiCall('/venue/get-all-venues?page=1&limit=1000')
    console.log(res)

    return (
        <div className="min-h-screen bg-slate-100 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-sm text-gray-500 font-medium mb-2">Your Listings</p>
                    <h2 className="text-4xl font-bold text-slate-800">Manage Your Venues</h2>
                    <p className="text-lg text-gray-600 mt-2">
                        Review your listed venues and track their performance.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {dummyVenues.map((venue) => (
                        <div
                            key={venue.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                        >
                            {/* Image */}
                            <div className="relative h-48 rounded-t-2xl overflow-hidden">
                                <Image
                                    src={venue.image}
                                    alt={venue.name}
                                    fill
                                    className="object-cover"
                                />
                                {/* <button
                                    onClick={() => toggleLike(venue.id)}
                                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${likedVenues.has(venue.id)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-600 hover:text-red-400'
                                            }`}
                                    />
                                </button> */}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">{venue.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    {venue.location}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {venue.bookings} bookings
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        {venue.rating}
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-bold text-slate-700">{venue.price}</span>
                                    <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                        View Details <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Venues;
