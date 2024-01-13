"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default function PostRecommends() {
  const { data } = useQuery<Post[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
