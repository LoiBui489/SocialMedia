'use client';

import { Post as PostType } from "@prisma/client";
import OptimizedImage from "../image";
import Post from "./post";
import { useUser } from "@clerk/nextjs";
import { useActionState, useEffect } from "react";
import { addComment } from "@/action/comment-action";
import { socket } from "@/socket";

type CommentWithDetail = PostType & {
    user: {
        displayName: string | null,
        username: string,
        avatar: string | null
    },
    _count: {
        like: number, 
        comments: number, 
        rePosts: number
    },
    like: { id: number }[], 
    rePosts: { id: number }[], 
    saved: { id: number }[] 
}

export default function Comment({ 
    comments,
    postId,
    username
}: { 
    comments: CommentWithDetail[],
    postId: number,
    username: string
}) {
    const { user } = useUser();
    const [state, formAction, isPending] = useActionState(addComment, { success: false, error: false, commentFor: undefined });

    useEffect(() => {
        if (!state.success) {
            socket.emit("sendNotification", {
                reciverUsername: username,
                data: {
                    senderUsername: user?.username,
                    type: "comment",
                    postType: state.commentFor ?? "post",
                    link: `/${username}/status/${postId}`
                }
            })
        }
    }, [state.success, username, user?.username, postId, state.commentFor]);

    return (
        <div>
            <form action={formAction} className="flex items-center justify-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <OptimizedImage src={user?.imageUrl} alt="avatar" width={40} height={40} />
                </div>
                <input type="text" name="comment" className="flex-1 bg-transparent outline-none p-2 text-xl" placeholder="Your Comment ..." autoComplete="off" />
                <input type="hidden" name="postId" value={postId} className="flex-1 bg-transparent outline-none p-2 text-xl" readOnly />
                <input type="hidden" name="username" value={username} className="flex-1 bg-transparent outline-none p-2 text-xl" readOnly />
                <button disabled={isPending} className="px-4 py-2 text-background font-bold bg-foreground rounded-full disabled:cursor-not-allowed disabled:bg-slate-600">
                    { isPending ? "Replying" : "Reply" }
                </button>
            </form>
            { state.error && <span className="text-iconRed p-4">Something went wrong! Please try again</span> }
            {
                comments.map((comment) => (
                    <div key={comment.id}>
                        <Post type="comment" post={comment} />
                    </div>
                ))
            }
        </div>
    );
};
