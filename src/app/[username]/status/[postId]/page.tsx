import Comment from "@/components/post/comment";
import Post from "@/components/post/post";
import { prisma } from "@/utils/prisma";
import { auth } from "@clerk/nextjs/server";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostDetail({ params }: { params: Promise<{ postId: string, username: string }> }) {
    const { postId, username } = await params;
    const { userId } = await auth();
    if (!userId) return;

    const postIncludeQuery = {
        user: { select: { displayName: true, username: true, avatar: true } },
        _count: { select: { like: true, rePosts: true, comments: true } },
        like: { where: { userId: userId }, select: { id: true } },
        rePosts: { where: { userId: userId }, select: { id: true } },
        saved: { where: { userId: userId }, select: { id: true } },
    };
    const post = await prisma.post.findFirst({ 
        where: { id: Number(postId) },
        include: {
            ...postIncludeQuery,
            comments: { include: postIncludeQuery, orderBy: { createdAt: "desc" } },
        },
    });

    if (!post) return notFound();

    return (
        <div className="pt-4 px-2">
            <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md bg-background p-4 z-10">
                <Link href={"/"} >
                    <Image src={"/icons/back.svg"} alt="back" width={24} height={24} />
                </Link>
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">Post</h1>
                    <span className="text-sm text-textGray">{moment(post.createdAt).fromNow()}</span>
                </div>
            </div>
            <Post type="status" post={post} />
            <Comment comments={post.comments} postId={post.id} username={username} />
        </div>
    );
};
