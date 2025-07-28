import Link from "next/link";
import OptimizedImage from "./image";
import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Recommendation() {
    const { userId } = await auth();
    if (!userId) return;

    const followings = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true }
    });
    const followingIds = followings.map(following => following.followingId);

    const friendRecommendations = await prisma.user.findMany({
        where: {
            id: {
                not: userId,
                notIn: followingIds
            },
            following: { some: { followerId: { in: followingIds } } }
        },
        select: { id: true, displayName: true, username: true, avatar: true },
        take: 3
    });

    return (
        <div className="flex flex-col gap-2 p-2 border border-borderGray rounded-2xl">
            {/* User Cards */}
            {
                friendRecommendations.map(r => (
                    <div key={r.id} className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <div className="rounded-full overflow-hidden w-10 h-10">
                                {
                                    r.avatar ? 
                                    <OptimizedImage path={r.avatar} alt="avatar" width={100} height={100} /> :
                                    <Image src={"/general/no-avatar.png"} alt="avatar" width={100} height={100} />
                                }
                            </div>
                            <Link href={`/${r.username}`}>
                                <h1 className="font-bold ">{r.displayName}</h1>
                                <span className="text-sm text-textGray">@{r.username}</span>
                            </Link>
                        </div>
                        <button className="py-1 px-4 font-semibold bg-foreground text-background rounded-full">Follow</button>
                    </div>
                ))
            }
            <Link href="/" className="text-iconBlue text-sm">Show more</Link>
        </div>
    );
};
