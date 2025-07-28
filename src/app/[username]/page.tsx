import Feed from "@/components/feed/feed";
import FollowButton from "@/components/follow-button";
import OptimizedImage from "@/components/image";
import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const { userId } = await auth();

    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        include: {
            _count: { select: { follower: true, following: true, posts: { where: { parentPostId: null } } } },
            following: userId ? { where: { followerId: userId } } : undefined,
        }
    });
    if (!user) {
        return notFound();
    }

    return (
        <div>
            {/* Profile title */}
            <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md bg-background p-4 z-10">
                <Link href={"/"} >
                    <Image src={"/icons/back.svg"} alt="back" width={24} height={24} />
                </Link>
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{user.displayName}</h1>
                    <span className="text-sm text-textGray">{user._count.posts}</span>
                </div>
            </div>
            {/* Info */}
            <div>
                {/* Cover and Avatar */}
                <div className="w-full relative">
                    <div className="w-full aspect-[2/1]">
                        {
                            user.cover ?
                                <OptimizedImage path={user.cover} alt="avatar" width={600} height={300} /> :
                                <Image src={"/general/no-cover.jpg"} alt="avatar" width={600} height={300} />
                        }
                    </div>
                    <div className="w-1/6 aspect-square rounded-full overflow-hidden border-4 border-borderGray absolute left-4 -translate-y-1/2">
                        {
                            user.avatar ?
                                <OptimizedImage path={user.avatar} alt="avatar" width={100} height={100} /> :
                                <Image src={"/general/no-avatar.png"} alt="avatar" width={100} height={100} />
                        }
                    </div>
                </div>
                {
                    user.id !== userId ?
                        <div className="flex items-center justify-end gap-4 pt-4 px-4">
                            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-borderGray cursor-pointer">
                                <Image src={"icons/more.svg"} alt="more" width={20} height={20} />
                            </div>
                            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-borderGray cursor-pointer">
                                <Image src={"icons/explore.svg"} alt="more" width={20} height={20} />
                            </div>
                            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-borderGray cursor-pointer">
                                <Image src={"icons/message.svg"} alt="more" width={20} height={20} />
                            </div>
                            <FollowButton isFollowing={!!user.following.length} userId={user.id} />
                        </div> :
                        <div className="w-full h-14"></div>
                }
                {/* User Info */}
                <div className="flex flex-col gap-2 p-4">
                    <h1 className="text-2xl font-bold">{user.displayName ?? user.username}</h1>
                    <span className="text-sm text-textGray">@{user.username}</span>
                    <p>{user.bio}</p>
                    <div className="flex gap-4 text-textGray">
                        <div className="flex gap-2 items-center">
                            <Image src={"icons/location.svg"} alt="location" width={20} height={20} />
                            <span>{user.location}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Image src={"icons/date.svg"} alt="location" width={20} height={20} />
                            <span>Join At {user.createdAt.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Image src={"icons/job.svg"} alt="location" width={20} height={20} />
                            <span>{user.job}</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-2 items-center">
                            <span className="font-bold">{user._count.follower}</span>
                            <span className="text-textGray">Follower</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span className="font-bold">{user._count.following}</span>
                            <span className="text-textGray">Following</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Feeds */}
            <Feed userProfileId={user.id} />
        </div>
    );
};
