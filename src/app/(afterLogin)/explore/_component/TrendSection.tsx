"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";
import Trend from "@/app/(afterLogin)/_component/Trend";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // 1분
    gcTime: 60 * 1000 * 5, // 5분
  });

  return data?.map((trend) => <Trend key={trend.tagId} trend={trend} />);
}
