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

}