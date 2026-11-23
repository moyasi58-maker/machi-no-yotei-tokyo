import Link from "next/link";
import type { TokyoEvent } from "@/lib/types";
import { formatDateRangeJa } from "@/lib/date";

export default function EventCard({ event }: { event: TokyoEvent }) {
  return (
    <Link href={`/events/${event.id}`} className="event-card">
      <div className="event-card__meta">
        <span className="badge">{event.genre}</span>
        <span className="badge">{event.area}</span>
        {event.isFree === true && <span className="badge badge--free">無料</span>}
      </div>
      <h3 className="event-card__title">{event.name}</h3>
      <div className="event-card__date">{formatDateRangeJa(event.startDateTime, event.endDateTime)}</div>
      <div className="event-card__venue">{event.venueName}</div>
    </Link>
  );
}
