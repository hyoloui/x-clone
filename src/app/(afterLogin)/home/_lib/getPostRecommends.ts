type Props = { pageParam?: number };
export async function getPostRecommends({ pageParam }: Props): Promise<Post[]> {
  const response = await fetch(
    `http://localhost:9090/api/posts/recommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      cache: "no-store",
    }
  );
  console.log("getPostRecommends", response.status);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
