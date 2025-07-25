import { DollarSign } from "lucide-react";
import { TicketIcon } from "../icons/Icon";
import { EventListDataInterface } from "@/lib/interfaces/EventList.interface";
import Image from "next/image";
import Base_Url_UNI from "@/utils/BaseUrl";

const EventGridCard = ({ eventCardData }: { eventCardData: EventListDataInterface }) => {
    const {
        title,
        startDate,
        location,
        startTime,
        isFree,
        eventTickets,
    } = eventCardData;

    return (
        <div className="w-full flex gap-4 bg-white border rounded-xl shadow-sm p-3 hover:shadow-md transition">
            {/* Event Thumbnail Placeholder */}
            <div className="w-40 h-32 bg-dark-gray rounded-lg shrink-0">
                <Image
                    src={`${Base_Url_UNI}/${eventCardData.bannerImage}`}
                    alt="event-banner"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Event Content */}
            <div className="flex flex-col justify-between w-full">
                {/* Title */}
                <h3 className="text-xl font-semibold text-dark-blue-gray line-clamp-2">
                    {title}
                </h3>

                {/* Date & Location */}
                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <span className="text-nowrap">{startDate}</span>
                    <span>|</span>
                    <span className="line-clamp-1">{eventCardData.isOnline ? "Online" : location}</span>
                </div>

                {/* Time */}
                <div className="text-sm text-gray-500 mt-1">
                    Starts at: <span className="font-medium text-dark-blue">{startTime}</span>
                </div>

                {/* Ticket Info */}
                <div className="mt-2 flex items-center gap-2 text-green-700 text-base font-medium">
                    <TicketIcon color="#287921" />
                    {isFree ? (
                        <span>Free</span>
                    ) : (
                        <>
                            <DollarSign size={18} className="text-green-700" />
                            {eventTickets?.[0]?.price ?? "N/A"}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventGridCard;
