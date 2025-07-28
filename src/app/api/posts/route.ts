import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) return;
    const userProfileId = req.nextUrl.searchParams.get("user");
    const page = req.nextUrl.searchParams.get("page");
    const limit = 5;

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
        skip: (Number(page) - 1) * limit, 
        take: limit, 
        orderBy: [{ createdAt: "desc" }, { id: "desc" }] 
    });
    
    const totalPost = await prisma.post.count({ where: whereCondition });
    const hasNextPage = totalPost > (Number(page) * limit);

    return Response.json({ posts, hasNextPage });
}