"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { getUserPosts } from "../_lib/getUserPosts";

export default function UserPosts({ username }: { username: string }) {
  const { data } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 60 * 5 * 1000,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user", username]);

  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
}
