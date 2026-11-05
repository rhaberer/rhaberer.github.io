import { trace } from "@opentelemetry/api";
export const dynamic = "force-dynamic";
export function GET() {
  return trace
    .getTracer("portfolio")
    .startActiveSpan("portfolio.health", (span) => {
      try {
        span.setAttribute("portfolio.status", "ok");
        return Response.json(
          { status: "ok", service: "ronny-haberer-portfolio" },
          { headers: { "Cache-Control": "no-store" } },
        );
      } finally {
        span.end();
      }
    });
}
