import styles from "@/app/(afterLogin)/home/_component/tab.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPostsRecommends } from "./_lib/getPostRecommends";
import PostRecommends from "./_component/PostRecommends";

export default async function Home() {
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
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
