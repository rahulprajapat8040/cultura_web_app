'use client'
import EventRequestAction from "@/components/common/events/EventReqAction";
import Spinner from "@/components/common/Spinner";
import useScroll from "@/hooks/useScroll";
import { PageInfo, RequestInterface } from "@/lib/interfaces/venue_owner/venueRequest.interface";
import { apiRequest } from "@/utils/apiHelper";
import { Calendar, Check, Clock, FileText, Users, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Bookings = () => {
    const [page, setPage] = useState(1);
    const [states, setStates] = useState<{
        pageInfo: PageInfo; data: RequestInterface[];
    }>({
        pageInfo: {
            total: 0,
            currentPage: 1,
            totalPage: 1
        },
        data: []
    });
    const hasMore = page < (states.pageInfo.totalPage)


    const fetchEvents = async () => {
        try {
            const PATH = `${process.env.NEXT_PUBLIC_GET_REQUESTS_FOR_EVENTS}`
            const res = await apiRequest("get", `${PATH}?page=${page}`)
            if (res.data.success) {
                const { data, pageInfo } = res.data.data
                setStates(prev => ({
                    pageInfo,
                    data: page === 1 ? data : [...prev.data, ...data]
                }))
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [page])

    const loadRef = useScroll({
        hasMore,
        onLoadMore: () => setPage(prev => prev + 1)
    })

    const bookings = states.data

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                        Pending Event Requests
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Review event details, organizer proposals, and estimated attendance to make informed decisions on booking requests.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm text-blue-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        {bookings.length} requests pending review
                    </div>
                </div>

                {/* Enhanced Booking Cards */}
                <div className="space-y-8">
                    {bookings.map((event) => (
                        <div
                            key={event.id}
                            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8">
                                    {/* Enhanced Event Image */}
                                    <div className="relative">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border border-gray-300">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/${event.mediaFiles.mediaUrl}`}
                                                alt={event.evenetName}
                                                width={96}
                                                height={96}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Enhanced Event Content */}
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {event.evenetName}
                                            </h2>
                                            <p className="text-gray-600 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>

                                        {/* Enhanced Event Details */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Calendar className="w-5 h-5 text-blue-500" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Start Date</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(event.startDate).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(event.startDate).toLocaleTimeString("en-IN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Clock className="w-5 h-5 text-green-500" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">End Date</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(event.endDate).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(event.endDate).toLocaleTimeString("en-IN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg sm:col-span-2">
                                                <Users className="w-5 h-5 text-purple-500" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Expected Attendance</p>
                                                    <p className="text-lg font-bold text-gray-900">
                                                        {event.maxTickets.toLocaleString()} people
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced Proposal Section */}
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <h4 className="font-semibold text-gray-900">Organizer's Proposal</h4>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 border border-blue-100">
                                                <p className="text-gray-700 leading-relaxed">
                                                    {event.proposal}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enhanced Actions */}
                                    <EventRequestAction />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Empty State */}
                {bookings.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-600 mb-8">No pending booking requests at the moment.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                            Refresh
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Bookings;
