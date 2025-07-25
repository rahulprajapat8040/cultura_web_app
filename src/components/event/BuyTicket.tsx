'use client'

import { EventTicket } from "@/lib/interfaces/EventList.interface";
import { TicketIcon } from "../icons/Icon";
import { useState } from "react";

const BuyTicket = ({ eventTickets }: { eventTickets: EventTicket[] }) => {
    const [states, setStates] = useState({
        openModel1: false
    })

    const handleSetState = (key: string, value: any) => {
        setStates((prev) => ({ ...prev, [key]: value }));
    };


    return (
        <div>
            <button
                onClick={() => handleSetState("openModel1", true)}
                className="bg-yellow w-[200px] text-xl font-medium mt-3 py-4 rounded-md flex justify-center gap-2 items-center">
                <TicketIcon />
                Buy Tickets
            </button>
            {
                states.openModel1 && (
                    <EventTicketModel1 eventTickets={eventTickets} />
                )
            }
        </div>
    )
}

export default BuyTicket;

const EventTicketModel1 = ({ eventTickets }: { eventTickets: EventTicket[] }) => {
    return (
        <>
            {
                eventTickets.map((item) => {
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
        </>
    )
}