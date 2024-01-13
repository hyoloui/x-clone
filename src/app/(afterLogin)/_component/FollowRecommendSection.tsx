"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";
import { getFollowRecommends } from "../_lib/getFollowRecommends";

export default function FollowRecommendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
    enabled: !!session?.user,
  });

  return data?.map((user) => <FollowRecommend key={user.id} user={user} />);
}
