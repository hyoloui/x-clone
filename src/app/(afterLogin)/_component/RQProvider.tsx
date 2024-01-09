"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // 포커스가 바뀌어도 새로고침 하지 않음
          retryOnMount: false, // 컴포넌트가 마운트 될 때마다 재시도
          refetchOnReconnect: false, // 인터넷 연결이 다시 되었을 때 새로고침 하지 않음
          retry: false, // 재시도 끄기 (기본값은 3회)
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
