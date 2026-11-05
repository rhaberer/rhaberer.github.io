"use client";
import { track } from "@vercel/analytics";
export function event(
  name: string,
  data: Record<string, string | number | boolean> = {},
) {
  if (
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" &&
    process.env.NEXT_PUBLIC_ENABLE_CUSTOM_EVENTS === "true"
  )
    track(name, data);
}
