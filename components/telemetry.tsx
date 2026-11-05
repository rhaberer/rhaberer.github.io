"use client";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
export function Telemetry() {
  return (
    <>
      {process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" && (
        <Analytics
          beforeSend={(event) => ({
            ...event,
            url: event.url.split("?")[0].split("#")[0],
          })}
        />
      )}
      {process.env.NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS === "true" && (
        <SpeedInsights />
      )}
    </>
  );
}
