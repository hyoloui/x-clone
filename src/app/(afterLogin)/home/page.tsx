import styles from "@/app/(afterLogin)/home/_component/tab.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

async function getPostsRecommends() {
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
export default async function Home() {
  const postList: number[] = Array.from({ length: 20 }, (_, i) => i);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostsRecommends,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          {postList.map((index) => (
            <Post key={index} />
          ))}
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
