"use client";

import { useQuery } from "@tanstack/react-query";
import style from "../profile.module.css";
import BackButton from "../../_component/BackButton";
import { getUser } from "../_lib/getUser";

export default function UserInfo({ username }: { username: string }) {
  const { data: user } = useQuery<User, Object, User, [_1: string, _2: string]>(
    {
      queryKey: ["user", username],
      queryFn: getUser,
      staleTime: 60 * 1000,
      gcTime: 60 * 5 * 1000,
    }
  );

  if (!user) return null;
  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
    </>
  );
}
