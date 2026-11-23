import type { TokyoEvent } from "@/lib/types";
import { occursOnDate, todayInTokyo, upcomingWeekendDates } from "@/lib/date";

export interface EventFilterParams {
  area?: string;
  genre?: string;
  free?: boolean;
  today?: boolean;
  weekend?: boolean;
}

export function filterEvents(events: TokyoEvent[], params: EventFilterParams, now: Date = new Date()): TokyoEvent[] {
  let result = events;

  if (params.area) {
    result = result.filter((e) => e.area === params.area);
  }
  if (params.genre) {
    result = result.filter((e) => e.genre === params.genre);
  }
  if (params.free) {
    result = result.filter((e) => e.isFree === true);
  }
  if (params.today) {
    const todayStr = todayInTokyo(now);
    result = result.filter((e) => occursOnDate(e.startDateTime, e.endDateTime, todayStr));
  }
  if (params.weekend) {
    const [sat, sun] = upcomingWeekendDates(now);
    result = result.filter(
      (e) => occursOnDate(e.startDateTime, e.endDateTime, sat) || occursOnDate(e.startDateTime, e.endDateTime, sun)
    );
  }

  return [...result].sort((a, b) => a.startDateTime.localeCompare(b.startDateTime));
}

export function uniqueAreas(events: TokyoEvent[]): string[] {
  return Array.from(new Set(events.map((e) => e.area))).sort();
}

export function uniqueGenres(events: TokyoEvent[]): string[] {
  return Array.from(new Set(events.map((e) => e.genre)));
}
