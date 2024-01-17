import styles from "@/app/(afterLogin)/home/home.module.css";

import { Suspense } from "react";
import { auth } from "@/auth";

import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Loading from "@/app/(afterLogin)/home/loading";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";

export default async function Home() {
  const session = await auth();
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm session={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
