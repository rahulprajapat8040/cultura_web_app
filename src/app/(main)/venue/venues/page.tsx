import React from 'react';
import { MapPin, Calendar, Star, ArrowRight, DollarSign } from 'lucide-react';
import { apiCall } from '@/app/callApi';
import { VenueListInterface } from '@/lib/interfaces/venue_owner/allVenueList.interface';
import RenderVideoOrImage from '@/components/common/RenderVideoOrImage';


const Venues = async () => {
    const res: VenueListInterface = await apiCall('/venue/get-all-venues?page=1&limit=1000')
    const data = res.data

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
                    {data.map((venue) => (
                        <div
                            key={venue.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
                        >
                            {/* Image */}
                            <div className="relative h-48 rounded-t-2xl overflow-hidden">
                                {
                                    venue.mediaFiles.length && (
                                        <RenderVideoOrImage
                                            mediaType={venue.mediaFiles[0].mediaType}
                                            mediaUrl={venue.mediaFiles[0].mediaUrl}
                                        />
                                    )
                                }
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
                                <div className="flex gap-2 text-sm text-gray-500 mb-2">
                                    <MapPin />
                                    {venue.location}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {20} bookings
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        {5}
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-bold text-slate-700 flex items-center justify-center"> <DollarSign /> {venue.price}</span>
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
