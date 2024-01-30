import { QueryFunction } from "@tanstack/react-query";

/**
 * Dynamic query
 */
export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(
    `http://localhost:9090/api/posts?${urlSearchParams.toString()}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
      },
      cache: "no-store",
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
