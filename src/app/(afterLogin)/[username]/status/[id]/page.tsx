import style from "./singlePost.module.css";

import BackButton from "@/app/(afterLogin)/_component/BackButton";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import Comments from "./_component/Comments";

type Props = { params: { id: string } };
export default function SinglePostPage({ params: { id } }: Props) {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>게시하기</h3>
      </div>
      <SinglePost id={id} />
      <CommentForm />
      <Comments id={id} />
    </div>
  );
}
