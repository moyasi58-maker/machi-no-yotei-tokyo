import { Suspense } from "react";
import { events } from "@/data/events";
import { filterEvents, uniqueAreas, uniqueGenres } from "@/lib/filter";
import EventCard from "@/components/EventCard";
import FilterBar from "@/components/FilterBar";

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const get = (key: string) => (typeof sp[key] === "string" ? (sp[key] as string) : undefined);

  const filtered = filterEvents(events, {
    area: get("area"),
    genre: get("genre"),
    free: get("free") === "1",
    today: get("today") === "1",
    weekend: get("weekend") === "1",
  });

  return (
    <>
      <h1 className="page-heading">東京都内のイベント一覧</h1>
      <p className="page-lead">
        美術展、音楽、マーケット、上映会など、東京都内で開催中・開催予定のイベントを日付順に掲載しています（全{events.length}件中{" "}
        {filtered.length}件を表示）。
      </p>

      <Suspense fallback={null}>
        <FilterBar areas={uniqueAreas(events)} genres={uniqueGenres(events)} />
      </Suspense>

      {filtered.length === 0 ? (
        <p className="empty-state">条件に一致するイベントは見つかりませんでした。絞り込みを変更してください。</p>
      ) : (
        <div className="event-grid">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </>
  );
}
