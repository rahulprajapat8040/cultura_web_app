
import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Star, ArrowRight, DollarSign, ArrowLeft, InfoIcon } from 'lucide-react';
import { apiCall } from '@/app/callApi.server';
import RenderVideoOrImage from '@/components/common/RenderVideoOrImage';
import { EventsListInterface } from '@/lib/interfaces/events/allEventsList.interface';
import moment from 'moment'
import { Helper } from '@/utils/helper/helper';
import EventInfoButton from '@/components/common/events/EventInfoButton';


const MyEvents = async ({ searchParams }: { searchParams: Promise<{ page: number }> }) => {
    let { page } = await searchParams || 1;
    const limit = 4;
    const res: EventsListInterface = await apiCall(`/event/get-your-events?page=${page}&limit=${limit}`);
    const events = res.data;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-3xl text-background-secondary font-medium max-w-2xl mx-auto">
                        Explore your listed events, monitor their stats, <br /> and manage effortlessly.
                    </p>
                </div>

                {/* Event Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-3 gap-2">
                    {events.map((event) => {
                        const status = Helper.eventStatus(event.status)
                        return (
                            <div
                                key={event.id}
                                className="rounded-3xl w-[350px] relative bg-white/70 backdrop-blur-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 "
                            >
                                {
                                    event.status === 'approved' && (
                                        <div
                                            className="absolute top-2 text-white z-20 right-1"
                                        >
                                            <EventInfoButton
                                                eventId={event.id}
                                            />
                                        </div>
                                    )
                                }
                                <div className="relative h-48 w-full">
                                    {event.mediaFiles.length > 0 && (
                                        <RenderVideoOrImage
                                            mediaType={event.mediaFiles[0].mediaType}
                                            mediaUrl={event.mediaFiles[0].mediaUrl}
                                        />
                                    )}
                                </div>
                                <div className="p-5 flex flex-col justify-between">
                                    <div className="mb-4">
                                        <div className='flex gap-3 justify-between'>
                                            <h2 className="text-xl font-semibold text-slate-800 truncate">{event.evenetName}</h2>
                                            <span
                                                className={`capitalize text-sm px-3 py-1 rounded-full ${status.bgColor} ${status.textColor}`}
                                            >
                                                {status.text}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 mt-2 gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{moment(event.startDate).format('MMMM D, YYYY, HH:MM:SS')}</span>                                    </div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm text-gray-500 mt-auto border-t pt-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>20 bookings</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span>5.0</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-lg font-bold flex items-center gap-1">
                                            <DollarSign className="w-5 h-5" /> {event.ticketPrice}
                                        </span>
                                        <Link
                                            href={`/organizer/event/${event.slug}`}
                                            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                                        >
                                            View <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Pagination */}
                <div className="mt-14 flex justify-center items-center space-x-6">
                    {page > 1 && (
                        <Link
                            href={`/organizer/my-events?page=${page - 1}`}
                            className="p-2.5 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition"
                        >
                            <ArrowLeft color='#c2c0c0' />
                        </Link>
                    )}
                    <span className="text-gray-700 font-medium text-lg">Page {page}</span>
                    {res.pageInfo.totalPage > page && (
                        <Link
                            href={`/organizer/my-events?page=${page + 1}`}
                            className="p-2.5 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition"
                        >
                            <ArrowRight color='#c2c0c0' />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
