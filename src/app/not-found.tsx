import Link from "next/link";
import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div>
      <h1>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 보세요.</h1>
      <Link href="/search">검색</Link>
    </div>
  );
};

export default NotFound;
