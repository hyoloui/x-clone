export async function getTrends() {
  const res = await fetch(`http://localhost:9090/api/hashtags/trends`, {
    next: {
      tags: ["trends"],
    },
    cache: "no-store",
    credentials: "include",
  });
  console.log("getTrends", res.status);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
