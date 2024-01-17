export async function getFollowRecommends() {
  const res = await fetch(`http://localhost:9090/api/users/followRecommends`, {
    next: {
      tags: ["posts", "followings"],
    },
    cache: "no-store",
  });
  console.log("getFollowRecommends", res.status);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
