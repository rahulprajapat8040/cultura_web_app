import { EventStatusType } from "@/lib/interfaces/events/EventStatus.type";
import moment from "moment"
export class Helper {

    static timeHelper = (date: string) => {
        const diff = moment(date).fromNow();
        return diff;
    };

    static eventStatus = (status: string) => {
        const statusMap: Record<
            string,
            { text: string; bgColor: string; textColor: string }
        > = {
            inrequest: {
                text: "in request",
                bgColor: "bg-blue-100",
                textColor: "text-blue-800",
            },
            rejected: {
                text: "rejected",
                bgColor: "bg-red-100",
                textColor: "text-red-800",
            },
            approved: {
                text: "approved",
                bgColor: "bg-green-100",
                textColor: "text-green-800",
            },
            finding_artist: {
                text: "finding artist",
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-800",
            },
            upcoming: {
                text: "upcoming",
                bgColor: "bg-indigo-100",
                textColor: "text-indigo-800",
            },
            live: {
                text: "live",
                bgColor: "bg-teal-100",
                textColor: "text-teal-800",
            },
            ended: {
                text: "ended",
                bgColor: "bg-gray-100",
                textColor: "text-gray-800",
            },
            canceled: {
                text: "canceled",
                bgColor: "bg-rose-100",
                textColor: "text-rose-800",
            },
        };

        return (
            statusMap[status] || {
                text: "unknown",
                bgColor: "bg-slate-100",
                textColor: "text-slate-800",
            }
        );
    };


}