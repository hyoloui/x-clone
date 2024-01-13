export async function getPostRecommends(): Promise<Post[]> {
  const response = await fetch("http://localhost:9090/api/postRecommends", {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
