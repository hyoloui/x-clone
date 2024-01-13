import { QueryFunction } from "@tanstack/react-query";

export const getUser: QueryFunction<User, [_1: string, _2: string]> = async ({
  queryKey,
}) => {
  const [_1, username] = queryKey;
  const response = await fetch(`http://localhost:9090/api/users/${username}`, {
    next: {
      tags: ["user", username],
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
