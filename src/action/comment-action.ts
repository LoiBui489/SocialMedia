'use server';

import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addComment = async (prev: {success: boolean, error: boolean}, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) return { success: false, error: true };

    const comment = formData.get("comment");
    const postId = formData.get("postId");
    const username = formData.get("username");

    const Comment = z.object({
        parentPostId: z.number(),
        description: z.string().max(255)
    });
    const validatedFiled = Comment.safeParse({
        parentPostId: Number(postId),
        description: comment
    })
    if (!validatedFiled.success) return { success: false, error: true };

    try {
        await prisma.post.create({
            data: {
                ...validatedFiled.data,
                userId: userId
            }
        });

        const parentPost = await prisma.post.findFirst({
            where: { id: validatedFiled.data.parentPostId }
        })

        revalidatePath(`/${username}/status/${postId}`);
        return { success: true, error: false, commentFor: parentPost ? "comment" : "post" };
    } catch (error) {
        console.error(error);
        return { success: false, error: true };
    }
}