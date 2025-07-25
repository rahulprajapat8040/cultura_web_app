import { ArrowBack, TicketIcon } from "@/components/icons/Icon";
import { apiCall } from "../apiCall";
import { EventInfoInterface } from "@/lib/interfaces/EventInfo.interface";
import Image from "next/image";
import Base_Url_UNI from "@/utils/BaseUrl";
import { CalendarDays, Clock, MapPin, Share2Icon, Star } from "lucide-react";
import { Helper } from "@/utils/helper/helper";
import EventDetailMap from "@/components/event/EventDetailMap";
import MarkIntrested from "@/components/event/MarkIntrested";
import BuyTicket from "@/components/event/BuyTicket";

const EventDetail = async ({
    searchParams,
}: {
    searchParams: Promise<{ eventId: string }>;
}) => {
    const { eventId } = await searchParams;
    const res: EventInfoInterface = await apiCall(`${process.env.NEXT_PUBLIC_GET_EVENT_DETAIL}?eventId=${eventId}`)

    return (
        <section className="text-dark-blue-gray py-4">
            <div>
                <div className="flex gap-4 mx-auto max-w-[80rem] py-3">
                    <div
                        className="mt-3"
                    >
                        <ArrowBack />
                    </div>
                    <Image
                        src={`${Base_Url_UNI}/${res.bannerImage}`}
                        alt="banner image"
                        width={1000}
                        height={1000}
                        className="w-full h-[380px] object-cover rounded-lg"
                    />
                </div>
                <div className="max-w-[74rem] py-2 w-full mx-auto flex items-start justify-between">
                    <div>
                        <h1
                            className="py-1 text-4xl font-bold"
                        >
                            {res.title}
                        </h1>
                        <div className="py-4">
                            <h2 className="text-3xl pt-4 font-bold">Date and Time</h2>
                            <div className="pt-4 flex items-center gap-3">
                                <CalendarDays size={28} />
                                <span className="text-xl font-medium">
                                    {Helper.formateDate(res.startDate, res.endDate)}
                                </span>
                            </div>
                            <div className="pt-4 flex items-center gap-3">
                                <Clock size={28} />
                                <span className="text-xl font-medium">
                                    {Helper.getStartToEndTime(res.startTime, res.endTime)}
                                </span>
                            </div>
                        </div>
                        {
                            res.isOnline ? (
                                <p className="text-lg font-medium"><span className="text-danger text-2xl">* </span>This event is an online event</p>
                            ) : (
                                <>
                                    <div className="py-4">
                                        <h2 className="text-3xl pt-4 font-bold">Location</h2>
                                        <div className="pt-3 mt-2 flex items-center gap-1">
                                            <MapPin />
                                            <p className="text-lg font-medium"> {res.location} </p>
                                        </div>
                                        <EventDetailMap
                                            latitude={res.latitude}
                                            longitude={res.longitude}
                                        />
                                    </div>
                                </>
                            )
                        }
                        <div className="py-4">
                            <h2 className="text-3xl pt-4 font-bold">Event Description</h2>
                            <p className="text-lg mt-3 tracking-widest">
                                {res.description?.split('\n').map((line, idx) => (
                                    <span key={idx}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>

                        </div>
                    </div>
                    <div className="max-w-3xs w-full flex flex-col items-end">
                        <div className="py-1 flex items-center gap-3">
                            <MarkIntrested eventId={res.id} />
                            <Share2Icon />
                        </div>
                        <BuyTicket eventTickets={res.eventTickets} />
                        <div className="py-4">
                            {
                                res.eventTickets.length ? (
                                    <>
                                        <h2 className="text-2xl pt-4 font-bold">Ticket Information</h2>
                                        <div className="space-y-2 mt-4">
                                            {
                                                res.eventTickets.map((item) => {
                                                    return (
                                                        <div
                                                            className="flex items-center gap-2"
                                                            key={item.id}
                                                        >
                                                            <TicketIcon /> <span className="font-medium">{item.name} : </span> {item.price}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-xl mt-2 font-medium text-dark-gray">This is a Free Event</h3>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventDetail;