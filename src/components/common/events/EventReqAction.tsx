import { Check, X } from "lucide-react";
import Spinner from "../Spinner";
import { apiRequest } from "@/utils/apiHelper";

const EventRequestAction = () => {
    const handleClickButton = async (type: string) => {
        try {
            const res = await apiRequest("get", "/")
        } catch (error) {

        }
    }
    return (
        <div className="flex flex-col justify-center gap-4 lg:min-w-[140px]">
            <button
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
            >
                <Spinner />
                <>
                    <Check className="w-5 h-5" />
                    Approve
                </>
            </button>

            <button
                className="group relative flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                <Spinner color="gray" />
                <>
                    <X className="w-5 h-5" />
                    Reject
                </>
            </button>
        </div>
    )
}

export default EventRequestAction;