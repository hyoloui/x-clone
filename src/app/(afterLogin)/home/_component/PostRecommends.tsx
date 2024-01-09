"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostsRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";

export default function PostRecommends() {
  const { data } = useQuery<Post[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostsRecommends,
    staleTime: 60 * 1000, // 1분
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
