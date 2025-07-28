import OptimizedImage from "../image";
import PostFeature from "./post-feature";
import PostInteraction from "./post-interaction";
import Video from "../video";
import Link from "next/link";
import { Post as PostType } from "@prisma/client";
import moment from "moment";
import Image from "next/image";

type UserNameAvatar = {
    displayName: string | null,
    username: string,
    avatar: string | null
}

type InteractionCount = {
    like: number,
    comments: number,
    rePosts: number
}

type PostWithDetail = PostType & {
    user: UserNameAvatar,
    originalPost?: PostType & {
        user: UserNameAvatar,
        _count: InteractionCount,
        like: { id: number }[],
        rePosts: { id: number }[],
        saved: { id: number }[]
    } | null,
    _count: InteractionCount,
    like: { id: number }[],
    rePosts: { id: number }[],
    saved: { id: number }[]
}

export default function Post({
    // fileId,
    type = "post",
    post
}: {
    // fileId?: string,
    type?: "post" | "comment" | "status",
    post: PostWithDetail
}) {
    // const getFileDetails = async (fileId: string): Promise<FileDetailResponse> => {
    //     return new Promise((resolve, reject) => {
    //         imagekit.getFileDetails(fileId, function (error, result) {
    //             if (error) {
    //                 reject(error);
    //             } else {
    //                 resolve(result as FileDetailResponse);
    //             }
    //         });
    //     });
    // };

    // const fileDetail = await getFileDetails("67cabdc9432c476416be1947");
    // console.info(fileDetail);
    return (
        <div className="p-4 border-y border-borderGray">
            {/* Post type */}
            {
                post.originalPostId &&
                <div className="flex items-center gap-2 text-sm text-textGray font-bold mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path className="fill-textGray"
                            d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z" />
                    </svg>
                    <div>
                        <Link href={`/${post.user.username}`} className="hover:underline">
                            <span>{post.user.displayName ?? post.user.username}</span>
                        </Link>
                        <Link href={`/${post.user.username}/status/${post.id}`}>
                            <span> reposted</span>
                        </Link>
                    </div>
                </div>
            }
            {/* Original Post content */}
            {
                post.originalPost &&
                <div className={`flex gap-4 ${type === "post" && "flex-col"}`}>
                    {/* Author */}
                    <div className={`${type === "post" && "hidden"} w-10 h-10 rounded-full overflow-hidden`}>
                        {
                            post.originalPost.user.avatar ?
                                <OptimizedImage path={post.originalPost.user.avatar} alt="avatar" width={40} height={40} /> :
                                <Image src={"/general/no-avatar.png"} alt="avatar" width={40} height={40} />
                        }
                    </div>
                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="w-full flex justify-between">
                            {/* Infomation */}
                            <Link href={`/${post.originalPost.user.username}`} className="flex gap-4">
                                <div className={`${type === "comment" && "hidden"} w-10 h-10 rounded-full overflow-hidden`}>
                                    {
                                        post.originalPost.user.avatar ?
                                            <OptimizedImage path={post.originalPost.user.avatar} alt="avatar" width={40} height={40} /> :
                                            <Image src={"/general/no-avatar.png"} alt="avatar" width={40} height={40} />
                                    }
                                </div>
                                <div className={`flex items-center gap-2 ${type === "post" && "flex-col !gap-0 !items-start"}`}>
                                    <span className="font-bold">{post.originalPost.user.displayName ?? post.originalPost.user.username}</span>
                                    <span className={`${type === "post" && "text-sm"} text-textGray`}>@{post.originalPost.user.username}</span>
                                    {type === "comment" && <span className="text-textGray">{moment(post.createdAt).fromNow()}</span>}
                                </div>
                            </Link>
                            <PostFeature />
                        </div>
                        {/* Caption & Media */}
                        <div>
                            <Link href={`/${post.originalPost.user.username}/status/${post.originalPostId}`}>
                                <p className={`mb-2 ${type === "post" && "text-lg"}`}>{post.description}</p>
                            </Link>
                            {
                                post.originalPost.image &&
                                <OptimizedImage path={post.originalPost.image} alt="post-media"
                                    width={600} height={post.imageHeight ?? 400}
                                    className={post.originalPost.isSensitive ? "blur-lg" : ""} />
                            }
                            {
                                post.originalPost.video && 
                                <Video path={post.originalPost.video} className={post.originalPost.isSensitive ? "blur-lg" : ""} />
                            }
                            <p className="text-textGray text-sm mt-2">{moment(post.createdAt).fromNow()}</p>
                        </div>
                        <PostInteraction postId={post.originalPost.id} postType={type === "comment" ? "comment" : "post"} username={post.originalPost.user.username} _count={post.originalPost._count} isLiked={!!post.originalPost.like.length} isRePosted={!!post.originalPost.rePosts.length} isSaved={!!post.originalPost.saved.length} />
                    </div>
                </div>
            }
            {/* Post content */}
            {
                post.originalPostId === null &&
                <div className={`flex gap-4 ${(type === "post" || type === "status") && "flex-col"}`}>
                    {/* Author */}
                    <div className={`${(type === "post" || type === "status") && "hidden"} w-10 h-10 rounded-full overflow-hidden`}>
                        {
                            post.user.avatar ?
                                <OptimizedImage path={post.user.avatar} alt="avatar" width={40} height={40} /> :
                                <Image src={"/general/no-avatar.png"} alt="avatar" width={40} height={40} />
                        }
                    </div>
                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="w-full flex justify-between">
                            {/* Infomation */}
                            <Link href={`/${post.user.username}`} className="flex gap-4">
                                <div className={`${type === "comment" && "hidden"} w-10 h-10 rounded-full overflow-hidden`}>
                                    {
                                        post.user.avatar ?
                                            <OptimizedImage path={post.user.avatar} alt="avatar" width={40} height={40} /> :
                                            <Image src={"/general/no-avatar.png"} alt="avatar" width={40} height={40} />
                                    }
                                </div>
                                <div className={`flex items-center gap-2 ${(type === "post" || type === "status") && "flex-col !gap-0 !items-start"}`}>
                                    <span className="font-bold">{post.user.displayName ?? post.user.username}</span>
                                    <span className={`${(type === "post" || type === "status") && "text-sm"} text-textGray`}>@{post.user.username}</span>
                                    {type === "comment" && <span className="text-textGray">{moment(post.createdAt).fromNow()}</span>}
                                </div>
                            </Link>
                            <PostFeature />
                        </div>
                        {/* Caption & Media */}
                        <div>
                            <Link href={`/${post.user.username}/status/${post.id}`}>
                                <p className={`mb-2 ${(type === "post" || type === "status") && "text-lg"}`}>{post.description}</p>
                            </Link>
                            {
                                post.image &&
                                <OptimizedImage path={post.image} alt="post-media"
                                    width={600} height={post.imageHeight ?? 400}
                                    className={post.isSensitive ? "blur-lg" : ""} />
                            }
                            {
                                post.video && 
                                <Video path={post.video} className={post.isSensitive ? "blur-lg" : ""} />
                            }
                            {(type === "post" || type === "comment") && <p className="text-textGray text-sm mt-2">{moment(post.createdAt).fromNow()}</p>}
                            {type === "status" && <p className="text-textGray text-sm mt-2">
                                {post.createdAt.toLocaleString().substring(11, 15) + " " + post.createdAt.toLocaleString().slice(-2)} &#183; {post.createdAt.toString().substring(3, 16)}
                            </p>}
                        </div>
                        <PostInteraction postId={post.id} postType={type === "comment" ? "comment" : "post"} username={post.user.username} _count={post._count} isLiked={!!post.like.length} isRePosted={!!post.rePosts.length} isSaved={!!post.saved.length} />
                    </div>
                </div>
            }
        </div>
    );
};
