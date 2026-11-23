import { events } from "@/data/events";
import { eventsToMarkdown } from "@/lib/markdown";

export const revalidate = 300;

export async function GET() {
  const body = eventsToMarkdown(events);

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=600, stale-while-revalidate=1200",
    },
  });
}
