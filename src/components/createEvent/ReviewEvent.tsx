import Image from "next/image";
import { EventDetailFormData } from "./EventDetail";
import { EventTicketingFormData } from "./EventTicketing";
import { Calendar, Clock, LocateIcon } from "lucide-react";
import MapSelector from "../common/MapSelector";
import { TicketIcon } from "../icons/Icon";

interface CreateEventState {
    eventDetail: EventDetailFormData;
    bannerImage: File;
    eventTicketingData: EventTicketingFormData
};


const ReviewEvent = ({ data }: { data: CreateEventState }) => {
    const bannerImage = data.bannerImage ? URL.createObjectURL(data.bannerImage) : null
    console.log('location is', data.eventDetail.latitude, data.eventDetail.location)
    return (
        <div>
            <div>
                <h4 className="text-lg font-medium text-dark-blue-gray">Nearly there! Check everything’s correct.</h4>
            </div>
            <div className="border border-dark-blue-gray rounded-md p-4 my-4 max-w-4xl mx-auto ">
                {
                    bannerImage ? (
                        <Image
                            src={bannerImage}
                            alt="event-image"
                            width={1000}
                            height={1000}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                    ) : (
                        <Image
                            src={'/assets/event_default_image.png'}
                            alt="event-image"
                            width={1000}
                            height={1000}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />
                    )
                }

                <div>
                    <h4 className="text-4xl py-4 font-semibold text-dark-blue-gray">{data.eventDetail.title}</h4>
                    <h5 className=" text-dark-blue-gray flex items-center gap-3"><Calendar /> {data.eventDetail.startDate} To {data.eventDetail.endDate}</h5>
                    <h5 className=" text-dark-blue-gray flex items-center gap-3 pt-3"><Clock /> {data.eventDetail.startTime} To {data.eventDetail.endTime}</h5>
                    <h4 className="text-4xl py-4 font-semibold text-dark-blue-gray">Location</h4>
                    <h5 className=" text-dark-blue-gray flex items-center gap-3 pt-3"><LocateIcon /> Address</h5>
                    {data.eventDetail.latitude && data.eventDetail.longitude ? (
                        <MapSelector
                            defaultPosition={[
                                Number(data.eventDetail.latitude),
                                Number(data.eventDetail.longitude),
                            ]}
                        />
                    ) : (
                        <p className="text-gray-500">No location selected.</p>
                    )}
                    <h4 className="text-4xl py-4 font-semibold text-dark-blue-gray">Ticket Information</h4>
                    <div className="flex items-center gap-2">
                        <TicketIcon /> <p>Ticket Type: {data.eventTicketingData.isFree ? 'Free Event' : 'Price /ticket'}</p>
                    </div>
                    <h4 className="text-4xl py-4 font-semibold text-dark-blue-gray">Event Description</h4>
                    <p>{data.eventDetail.description}</p>
                </div>

            </div>
        </div>
    )
}

export default ReviewEvent;