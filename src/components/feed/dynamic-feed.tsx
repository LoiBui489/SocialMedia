'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../post/post";

const fetchPosts = async (page: number, userProfileId?: string) => {
    const apiUrl = userProfileId ? `/api/posts?page=${page}&user=${userProfileId}` : `/api/posts?page=${page}`;
    const res = await fetch(apiUrl);
    console.log(apiUrl);
    return await res.json();
}

export default function DynamicFeed({ userProfileId }: { userProfileId?: string }) {
    const { data, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
        initialPageParam: 2,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasNextPage ? allPages.length + 2 : undefined;
        }
    });
    if (error) return <div>Can&apos;t load posts</div>
    if (status === "pending") return <div>Loading...</div>

    const allPosts = data.pages.flatMap(page => page.posts) || [];

    return (
        <InfiniteScroll dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h1>Loading...</h1>}
            endMessage={<h1>No more post...</h1>} >
            {allPosts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </InfiniteScroll>
    );
};
