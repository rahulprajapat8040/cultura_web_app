'use client';

import { apiRequest } from "@/utils/apiHelper";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const ProfileAction = ({ artistId, isFollowed }: { artistId: string, isFollowed: boolean }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const followUnfollow = async () => {
        try {
            await apiRequest("post", `${process.env.NEXT_PUBLIC_FOLLOW_UNFOLLOW}`, { artistId, });

            startTransition(() => {
                router.refresh();
            });
        } catch (error) {
            console.error("Follow/Unfollow failed", error);
        }
    };

    return (
        <div className="bg-white rounded-xl border p-4 mt-6">
            <h4 className="text-lg font-semibold mb-2">Actions</h4>
            <div className="space-y-2">
                <button
                    onClick={followUnfollow}
                    disabled={isPending}
                    className="w-full disabled:bg-background-secondary/80 bg-background-secondary text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    {isPending ? "Processing..." : isFollowed ? "Unfollow" : "Follow"}
                </button>
                <button className="w-full bg-white border border-background-secondary backdrop-blur-sm   py-3 px-4 rounded-xl font-medium transition-all duration-200">
                    Message
                </button>
            </div>
        </div>
    );
};

export default ProfileAction;
