"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Fragment } from "react";

export default function PostRecommends() {
  const { data } = useInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
  });

  return data?.pages.map((page, i) => (
    <Fragment key={i}>
      {page.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </Fragment>
  ));
}
