'use client'
import { RootState } from "@/lib/redux/Store";
import { apiRequest } from "@/utils/apiHelper";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StarFilledIcon } from "../icons/Icon";

const MarkIntrested = ({ eventId }: { eventId: string }) => {
    const [state, setState] = useState(false)
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const getIsInterseted = async () => {
        const PATH = `${process.env.NEXT_PUBLIC_IS_MARKED_INTERSETED}?eventId=${eventId}`
        const res = await apiRequest("get", PATH)
        // console.log(res)
        setState(res.data.data)
    }

    const toogleEventInterset = async () => {
        const PATH = `${process.env.NEXT_PUBLIC_TOOGLE_EVENT_INTERSET}`
        const res = await apiRequest("post", PATH, { eventId })
        console.log('event', res)
        if (res.data.success) {
            getIsInterseted()
        }
    }

    useEffect(() => {
        isLoggedIn && getIsInterseted()
    }, [])
    if (isLoggedIn) {
    }
    return (
        <button
            onClick={toogleEventInterset}
            className="bg-background p-2 rounded-full">
            {state ? <StarFilledIcon /> : <Star />}
        </button>
    )
}

export default MarkIntrested;