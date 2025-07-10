import moment from "moment"
export class Helper {
    static timeHelper = (date: string) => {
        const diff = moment(date).fromNow();
        return diff;
    };
}