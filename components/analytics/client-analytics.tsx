"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

export function ClientAnalytics() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || process.env.NODE_ENV !== "production") {
    return null;
  }

  return <Analytics />;
}
