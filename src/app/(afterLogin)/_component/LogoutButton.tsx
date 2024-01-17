"use client";

import Image from "next/image";
import style from "./logoutButton.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

type Props = { session: Session | null };
export default function LogoutButton({ session: me }: Props) {
  const router = useRouter();

  const onLogout = () => {
    signOut({ redirect: false }).then(() => router.replace("/"));
  };

  if (!me?.user) return null;

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <Image
          src={me.user?.image as string}
          alt={me.user?.email as string}
          width={40}
          height={40}
        />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.id}</div>
      </div>
    </button>
  );
}
