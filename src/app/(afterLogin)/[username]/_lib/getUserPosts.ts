import { QueryFunction } from "@tanstack/react-query";

export const getUserPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: string]
> = async ({ queryKey }) => {
  const [_1, _2, username] = queryKey;
  const response = await fetch(
    `http://localhost:9090/api/users/${username}/posts`,
    {
      next: {
        tags: ["posts", "user", username],
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
