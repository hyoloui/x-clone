import styles from "@/app/(afterLogin)/home/_component/tab.module.css";
import TabProvider from "./_component/TabProvider";
import Tab from "./_component/Tab";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <TabProvider>
        home
        <Tab />
        {/* <Post /> */}
      </TabProvider>
    </main>
  );
}
