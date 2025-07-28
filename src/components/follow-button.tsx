'use client'

import { followUser } from "@/action/followAction";
import { useOptimistic, useState } from "react";

export default function FollowButton({
    isFollowing,
    userId
}: {
    isFollowing: boolean,
    userId: string
}) {
    const [state, setState] = useState(isFollowing);
    const [optimicticFollow, setOprimicticFollow] = useOptimistic(state, (prev) => !prev);

    const followAction = async () => {
        setOprimicticFollow("");
        await followUser(userId);
        setState(prev => !prev);
    };

    return (
        <form action={followAction}>
            <button className={`py-2 px-4 font-bold rounded-full ${optimicticFollow ? "bg-background text-foreground border border-borderGray" : "bg-foreground text-background"}`}>
                {optimicticFollow ? "Following" : "Follow"}
            </button>
        </form>
    );
};
