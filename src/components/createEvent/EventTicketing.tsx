import { DollarSign, IndianRupee, PlusCircle, Trash2 } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FreeIcon, TicketIconUnFill } from "../icons/Icon";

export type EventTicket = {
    name: string;
    price: number;
};

export type EventTicketingFormData = {
    isFree: boolean;
    eventTickets: EventTicket[];
};

export type EventTicketingRef = {
    getData: () => EventTicketingFormData;
};

type Props = {
    initialData?: EventTicketingFormData;
};

const EventTicketing = forwardRef<EventTicketingRef, Props>(({ initialData }, ref) => {
    const [isFree, setIsFree] = useState<boolean>(false);
    const [eventTickets, setEventTickets] = useState<EventTicket[]>([
        { name: "", price: 0 },
    ]);

    const handleAddTicket = () => {
        setEventTickets((prev) => [...prev, { name: "", price: 0 }]);
    };

    const handleRemoveTicket = (index: number) => {
        setEventTickets((prev) => prev.filter((_, i) => i !== index));
    };

    const handleTicketChange = (
        index: number,
        key: "name" | "price",
        value: string
    ) => {
        setEventTickets((prev) =>
            prev.map((ticket, i) =>
                i === index ? { ...ticket, [key]: value } : ticket
            )
        );
    };

    useEffect(() => {
        if (initialData) {
            setIsFree(initialData.isFree);
            setEventTickets(initialData.eventTickets);
        }
    }, [initialData]);

    // 👇 expose method to parent
    useImperativeHandle(ref, () => ({
        getData: () => ({
            isFree,
            eventTickets
        }),
    }));

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Free or Paid */}
            <div className="flex flex-col gap-4">
                <label className="text-base sm:text-3xl font-medium text-dark-blue-gray flex gap-1">
                    What type of event are you running?
                </label>
                <div className="grid grid-cols-2 gap-12">
                    <div
                        onClick={() => setIsFree(false)}
                        className={`border cursor-pointer flex items-center justify-center flex-col text-center gap-7 py-3 ${!isFree ? "border-dark-blue-gray" : "border-gray-300"
                            }`}
                    >
                        <TicketIconUnFill stroke="#555" size={90} />
                        <div>
                            <h3 className="text-xl text-dark-gray">Ticketed Event</h3>
                            <p className="text-dark-gray pt-2">
                                My event requires tickets for entry
                            </p>
                        </div>
                    </div>
                    <div
                        onClick={() => setIsFree(true)}
                        className={`border cursor-pointer flex items-center justify-center flex-col text-center gap-7 py-3 ${isFree ? "border-dark-blue-gray" : "border-gray-300"
                            }`}
                    >
                        <FreeIcon />
                        <div>
                            <h3 className="text-xl text-dark-gray">Free Event</h3>
                            <p className="text-dark-gray pt-2">I’m running a free event</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticket Fields */}
            {!isFree && (
                <div className="flex flex-col gap-4 max-w-2xl w-full">
                    <label className="text-base sm:text-3xl font-medium text-dark-blue-gray flex gap-1">
                        What tickets are you selling?
                    </label>
                    <div className="flex items-start gap-4 w-full">
                        <div className="space-y-3">
                            {eventTickets.map((ticket, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <input
                                        type="text"
                                        className="border w-full py-1.5 px-2 border-gray-300 outline-none"
                                        placeholder="Ticket Name e.g. General Admission"
                                        value={ticket.name}
                                        onChange={(e) =>
                                            handleTicketChange(index, "name", e.target.value)
                                        }
                                    />
                                    <div className="w-full flex items-center">
                                        <div className="bg-gray-300/80 border py-1.5 w-10 flex items-center justify-center">
                                            <DollarSign color="gray" />
                                        </div>
                                        <input
                                            type="number"
                                            className="border w-full py-1.5 px-2 border-gray-300 outline-none"
                                            placeholder="Price"
                                            value={ticket.price}
                                            onChange={(e) =>
                                                handleTicketChange(index, "price", e.target.value)
                                            }
                                        />
                                    </div>
                                    {eventTickets.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTicket(index)}
                                            className="text-danger"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleAddTicket}
                        >
                            <PlusCircle size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default EventTicketing;
