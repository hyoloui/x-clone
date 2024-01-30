"use client";

import style from "./trendSection.module.css";
import { usePathname } from "next/navigation";
import Trend from "./Trend";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";

export default function TrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
    enabled: !!session?.user,
  });

  const pathname = usePathname();
  if (pathname === "/explore") {
    return null;
  }
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend, index) => (
            <Trend key={trend.count + index} trend={trend} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
