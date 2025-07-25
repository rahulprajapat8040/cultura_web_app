import { EventTicket } from "@/lib/interfaces/HomeData.interface";
import moment from "moment";

export class Helper {
    static toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
    }

    static getMonthAndDates = (startDate: string, endDate: string) => {
        const start = moment(startDate);
        const end = moment(endDate);

        const month = start.format("MMMM"); // e.g. "July"
        const startDay = start.format("DD"); // e.g. "01"
        const endDay = end.format("DD");     // e.g. "04"

        return {
            month: month, // optional: convert to lowercase
            date: `${startDay}-${endDay}`,
        };
    };

    static getStartToEndTime = (startTime: string, endTime: string): string => {
        const formattedStart = moment(startTime, "HH:mm:ss").format("hh:mm A");
        const formattedEnd = moment(endTime, "HH:mm:ss").format("hh:mm A");
        return `${formattedStart} - ${formattedEnd}`;
    };

    static showBasePriceOrFree = (eventTickets: EventTicket[]) => {
        return eventTickets.length ? eventTickets[0].price : 'Free'
    }

    static formateDate = (startDate: string, endDate: string) => {
        const start = moment(startDate);
        const end = moment(endDate);

        const formatStr = 'dddd, D MMMM YYYY';

        if (start.isSame(end, 'day')) {
            return start.format(formatStr);
        } else {
            return `${start.format(formatStr)} - TO - ${end.format(formatStr)}`;
        }
    };
}