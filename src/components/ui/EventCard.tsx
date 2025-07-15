'use client'
import { FindingArtistEventsInterface } from "@/lib/interfaces/events/FindingArtistEvent.interface";
import { Award, Calendar, Clock, Sparkles, Zap } from "lucide-react";
import RenderVideoOrImage from "../common/RenderVideoOrImage";
import { apiRequest } from "@/utils/apiHelper";
import { useRouter } from "next/navigation";

const EventCard = ({
    event,
    showApply,
    status,
}: {
    event: FindingArtistEventsInterface;
    showApply?: boolean;
    status?: string;
}) => {
    const router = useRouter()

    const onApplyClick = async () => {
        const res = await apiRequest("post", "/")
        if (res.data.success) {
            router.refresh()
        }
    }

    return (
        <div
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Image container with overlay effects */}
            <div className="relative h-56 overflow-hidden">
                <RenderVideoOrImage
                    mediaType={event.mediaFiles.mediaType}
                    mediaUrl={event.mediaFiles.mediaUrl}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating icon */}
                <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
            </div>

            <div className="relative p-6 space-y-4">
                {/* Title with gradient text */}
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    {event.evenetName}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                    {event.description}
                </p>

                {/* Date with enhanced styling */}
                <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                            {new Date(event.startDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>

                {/* Status badge with enhanced styling */}
                {status && (
                    <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center bg-background-secondary gap-2 px-4 py-2 rounded-full font-medium text-sm ${status === "applied"
                            ? " text-white shadow-lg"
                            : status === "assigned"
                                ? " text-white shadow-lg"
                                : ""
                            }`}>
                            {status === "applied" && <Clock className="w-4 h-4" />}
                            {status === "assigned" && <Award className="w-4 h-4" />}
                            <span className="capitalize">{status}</span>
                        </div>
                    </div>
                )}

                {/* Apply button with enhanced styling */}
                {showApply && (
                    <button className="relative w-full group/btn overflow-hidden bg-background-secondary text-white py-3 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4" />
                            Apply Now
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                )}
            </div>

            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
        </div>
    );
};

export default EventCard