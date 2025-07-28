'use server';

import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";

export const followUser = async (followingId: string) => {
    const { userId } = await auth();
    if (!userId) return;

    const following = await prisma.follow.findFirst({
        where: {
            followerId: userId,
            followingId: followingId
        }
    });
    if (following) {
        await prisma.follow.delete({
            where: { id: following.id }
        });
    } else {
        await prisma.follow.create({
            data: { followerId: userId, followingId: followingId }
        });
    }
}