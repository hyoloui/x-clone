export async function getFollowRecommends() {
  const res = await fetch(`http://localhost:9090/api/follwRecommends`, {
    next: {
      tags: ["posts", "followings"],
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}