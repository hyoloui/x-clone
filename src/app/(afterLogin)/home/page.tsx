import styles from "@/app/(afterLogin)/home/_component/tab.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/Post";

export default function HomePage() {
  const postList: number[] = Array.from({ length: 20 }, (_, i) => i);
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        {postList.map((index) => (
          <Post key={index} />
        ))}
      </TabProvider>
    </main>
  );
}
