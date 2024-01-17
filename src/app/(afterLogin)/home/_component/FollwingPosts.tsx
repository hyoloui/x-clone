"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Fragment } from "react";

import { getFollwingPosts } from "../_lib/getFollowingPosts";
import Post from "../../_component/Post";

export default function FollwingPosts() {
  const { data } = useSuspenseInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "followings"],
    queryFn: getFollwingPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
