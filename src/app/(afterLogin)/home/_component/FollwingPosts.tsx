"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getFollwingPosts } from "../_lib/getFollowingPosts";
import Post from "../../_component/Post";

export default function FollwingPosts() {
  const { data } = useSuspenseQuery<Post[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollwingPosts,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
