"use client";

import { useRouter } from "next/navigation";
import { useOnlineStatus } from "./useOnlineStatus";
import { NoInternetUI } from "./NoInternetUI";

export default function NoInternetWrapper({ children }: { children: React.ReactNode }) {
  const isOnline = useOnlineStatus();
  const router = useRouter();

  if (!isOnline) {
    return <NoInternetUI onRetry={() => router.push("/")} />;
  }

  return <>{children}</>;
}
