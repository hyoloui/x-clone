"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { getSearchResult } from "../_lib/getSearchResult";

type Props = { searchParams: { q: string; f?: string; pf?: string } };
export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
