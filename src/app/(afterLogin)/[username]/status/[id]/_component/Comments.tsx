"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { getComments } from "../_lib/getComments";

export default function Comments({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);

  const { data, error } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    enabled: !!post,
  });

  if (!post) return null;
  if (error) {
    return (
      <div
        style={{
          height: 100,
          alignItems: "center",
          fontSize: 31,
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        댓글을 불러올 수 없습니다.
      </div>
    );
  }
  if (post) {
    return data?.map((post) => <Post post={post} key={post.postId} />);
  }
}
