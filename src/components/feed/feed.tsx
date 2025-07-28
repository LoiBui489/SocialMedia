import { prisma } from "@/utils/prisma";
import Post from "../post/post";
import { auth } from "@clerk/nextjs/server";
import DynamicFeed from "./dynamic-feed";

export default async function Feed({ userProfileId }: { userProfileId?: string }) {
    const { userId } = await auth();
    if (!userId) return;

    const followings = await prisma.follow.findMany({
        where: {
            followerId: userId
        },
        select: {
            followingId: true
        }
    });
    const followingIds = followings.map(following => following.followingId);

    const whereCondition = userProfileId ? {
        userId: userProfileId,
        parentPostId: null
    } : {
        userId: {
            in: [userId, ...followingIds]
        },
        parentPostId: null
    };
    const postIncludeQuery = {
        user: { select: { displayName: true, username: true, avatar: true } },
        _count: { select: { like: true, rePosts: true, comments: true } },
        like: { where: { userId: userId }, select: { id: true } },
        rePosts: { where: { userId: userId }, select: { id: true } },
        saved: { where: { userId: userId }, select: { id: true } },
    };

    const posts = await prisma.post.findMany({
        where: whereCondition,
        include: {
            originalPost: { include: postIncludeQuery },
            ...postIncludeQuery
        },
        take: 5,
        skip: 0,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }]
    });

    return (
        <div>
            {
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            }
            <DynamicFeed userProfileId={userProfileId} />
        </div>
    );
};
