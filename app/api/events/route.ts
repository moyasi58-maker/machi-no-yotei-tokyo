import { NextRequest, NextResponse } from "next/server";
import { events } from "@/data/events";
import { filterEvents } from "@/lib/filter";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const filtered = filterEvents(events, {
    area: sp.get("area") ?? undefined,
    genre: sp.get("genre") ?? undefined,
    free: sp.get("free") === "1" || sp.get("free") === "true",
    today: sp.get("today") === "1" || sp.get("today") === "true",
    weekend: sp.get("weekend") === "1" || sp.get("weekend") === "true",
  });

  return NextResponse.json(
    {
      count: filtered.length,
      totalCount: events.length,
      generatedAt: new Date().toISOString(),
      events: filtered,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=600, stale-while-revalidate=1200",
      },
    }
  );
}
