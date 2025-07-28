'use server';

import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";

export const likePost = async (postId: number) => {
    const { userId } = await auth();
    if (!userId) return;

    const liked = await prisma.like.findFirst({
        where: {
            userId: userId,
            postId: postId
        }
    });
    if (liked) {
        await prisma.like.delete({
            where: { id: liked.id }
        });
    } else {
        await prisma.like.create({
            data: { userId: userId, postId: postId }
        });
    }
}

export const repostPost = async (postId: number) => {
    const { userId } = await auth();
    if (!userId) return;

    const originalPost = await prisma.post.findFirst({
        where: { id: postId }
    })
    if (!originalPost) return;

    await prisma.post.create({
        data: { 
            userId: userId, 
            originalPostId: postId, 
            description: originalPost.description,
            image: originalPost.image,
            video: originalPost.video,
            isSensitive: originalPost.isSensitive  
        }
    });
}

export const savePost = async (postId: number) => {
    const { userId } = await auth();
    if (!userId) return;

    const saved = await prisma.saved.findFirst({
        where: {
            userId: userId,
            postId: postId
        }
    })
    if (saved) {
        await prisma.saved.delete({
            where: { id: saved.id }
        })
    } else {
        await prisma.saved.create({
            data: { userId: userId, postId: postId }
        })
    }
}
