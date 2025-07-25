import { Helper } from "@/utils/helper/helper";
import { StarFilledIcon } from "../icons/Icon";
import { Star, TicketIcon } from "lucide-react";
import { EventCardInterface } from "@/lib/interfaces/EventCard.interface";
import Image from "next/image";
import Base_Url_UNI from "@/utils/BaseUrl";
import MarkIntrested from "./MarkIntrested";
import Link from "next/link";

const EventCard = ({ item }: { item: EventCardInterface }) => {
    const date = Helper.getMonthAndDates(item.startDate, item.endDate)
    const time = Helper.getStartToEndTime(item.startTime, item.endTime)
    return (
        <li
            className="flex flex-col items-center justify-center gap-2"
        >
            <Link
                href={`/event-detail?eventId=${item.id}`}
            >
                <div className="w-full h-64 bg-dark-gray relative rounded-t-lg">
                    <Image
                        src={`${Base_Url_UNI}/${item.bannerImage}`}
                        alt="banner image"
                        width={1000}
                        height={1000}
                        className="w-full h-full rounded-t-lg object-cover"
                    />
                    <div className="absolute bg-yellow px-3 py-1 text-dark-blue-gray font-semibold bottom-0 rounded-tr-md">
                        {item.category.name}
                    </div>
                    <div className=" absolute top-2 right-2">
                        <MarkIntrested
                            eventId={item.id}
                        />
                    </div>
                </div>
                <div className="flex justify-between w-full gap-3">
                    <div>
                        <h5 className="text-[#4539B4] text-3xl font-medium">
                            {date.month}
                        </h5>
                        <h5 className="font-bold">
                            {date.date}
                        </h5>
                    </div>
                    <div className="w-full space-y-0.5">
                        <h3 className="font-medium text-lg line-clamp-1">{item.title}</h3>
                        <p className="line-clamp-1">{item.isOnline ? "Online" : item.location}</p>
                        <span>
                            {time}
                        </span>
                        <div className="flex items-center gap-3">
                            <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <TicketIcon /> {Helper.showBasePriceOrFree(item.eventTickets)}</h6>
                            <h6 className="flex items-center gap-1 text-lg font-medium text-dark-gray"> <StarFilledIcon /> {item.interestedCount} intrested</h6>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default EventCard;