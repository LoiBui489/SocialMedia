'use server';

import { Setting } from "@/components/share/types";
import { imagekit } from "@/utils/imageKit";
import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const shareAction = async (formData: FormData, setting: Setting) => {
    const media = formData.get("media") as File;
    const bytes = await media.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const transformation = `w-600,${setting.shape === "wide" ? "ar-16-9" : setting.shape === "square" ? "ar-1-1" : ""}`;
    console.log(transformation);

    imagekit.upload({
        file: buffer,
        fileName: media.name,
        ...(media?.type.startsWith("image") && { transformation: { pre: transformation } }),
        customMetadata: { isSensitive: setting.isSensitive },
        folder: "/social-media/post"
    }, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
        }
    });
}

export const addPost = async (prev: { success: boolean, error: boolean }, formData: FormData) => {
    const { userId } = await auth();
    if (!userId) return { success: false, error: true };

    const description = formData.get("description");
    const media = formData.get("media") as File;
    const isSensitive = formData.get("isSensitive") === "true" ? true : false;
    const shape = formData.get("shape");

    const uploadFile = async (): Promise<UploadResponse> => {
        const bytes = await media.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const transformation = `w-600,${shape === "wide" ? "ar-16-9" : shape === "square" ? "ar-1-1" : ""}`;

        return new Promise((resolve, reject) => {
            imagekit.upload({
                file: buffer,
                fileName: media.name,
                ...(media?.type.startsWith("image") && { transformation: { pre: transformation } }),
                customMetadata: { isSensitive: isSensitive },
                folder: "/social-media/post"
            }, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result as UploadResponse);
                }
            });
        })
    }

    const Post = z.object({
        description: z.string().max(255),
        isSensitive: z.boolean().default(false),
    });
    const validatedFiled = Post.safeParse({
        description: description,
        isSensitive: isSensitive
    })
    if (!validatedFiled.success) return { success: false, error: true };

    let imgUrl = "";
    let vidUrl = "";
    if (media.size) {
        const uploadedFile = await uploadFile();
        if (uploadedFile.fileType === "image") {
            imgUrl = uploadedFile.filePath;
        } else {
            vidUrl = uploadedFile.filePath;
        }
    }

    try {
        await prisma.post.create({
            data: {
                ...validatedFiled.data,
                userId: userId,
                image: imgUrl.length > 0 ? imgUrl : null,
                video: vidUrl.length > 0 ? vidUrl : null
            }
        });
        revalidatePath("/");
        return { success: true, error: false };
    } catch (error) {
        console.error(error);
        return { success: false, error: true };
    }
}