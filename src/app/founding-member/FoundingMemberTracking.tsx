"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { pushDataLayerEvent } from "@/lib/analytics";

export function FoundingMemberTracking() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  useEffect(() => {
    pushDataLayerEvent("founding_member_confirmed", {
      confirmation_source: source === "quiz" ? "quiz" : "email",
    });
  }, [source]);

  return null;
}
