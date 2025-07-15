'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { apiRequest } from "@/utils/apiHelper";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EventInfoButtonProps {
    eventId: string
}

const EventInfoButton = ({ eventId }: EventInfoButtonProps) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const handleSetFindingArtist = async () => {
        startTransition(async () => {
            try {
                await apiRequest("put", `${process.env.NEXT_PUBLIC_APPROVE_REJECT_REQ}`, {
                    eventId,
                    status: "finding_artist",
                });
                toast.success("Status set to 'finding artist'");
                router.refresh()
                setOpen(false);
            } catch (error) {
                toast.error("Failed to update event status");
            }
        });
    };


    return (
        <TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <button
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                                aria-label="Event Info"
                            >
                                <Info className="w-5 h-5 text-white hover:text-blue-600" />
                            </button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        <p>Looking for an artist?</p>
                    </TooltipContent>
                </Tooltip>

                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Mark as "Finding Artist"</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-600 mt-2 mb-6">
                        This action will update the event status to{" "}
                        <span className="font-semibold text-yellow-700">finding_artist</span>.
                        Use this if you're currently searching for a suitable artist.
                    </p>

                    <button
                        onClick={handleSetFindingArtist}
                        disabled={isPending}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 transition disabled:opacity-50"
                    >
                        {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Set to Finding Artist"
                        )}
                    </button>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
};

export default EventInfoButton;
