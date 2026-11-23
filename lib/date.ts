const TOKYO_TZ = "Asia/Tokyo";

/** 現在時刻をAsia/Tokyoの日付文字列（YYYY-MM-DD）で取得 */
export function todayInTokyo(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TOKYO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function toTokyoDateOnly(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TOKYO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

/** イベントが指定日（YYYY-MM-DD, Asia/Tokyo）に開催されているか */
export function occursOnDate(startIso: string, endIso: string | null, dateStr: string): boolean {
  const start = toTokyoDateOnly(startIso);
  const end = endIso ? toTokyoDateOnly(endIso) : start;
  return dateStr >= start && dateStr <= end;
}

/** 直近の土日（今日が土日ならその週末）の日付配列を YYYY-MM-DD で返す */
export function upcomingWeekendDates(now: Date = new Date()): string[] {
  const todayStr = todayInTokyo(now);
  const [y, m, d] = todayStr.split("-").map(Number);
  // UTC正午を基準にTokyo日付のズレを避けて計算する
  const base = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: TOKYO_TZ, weekday: "short" }).format(base);
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);

  let daysUntilSat: number;
  if (weekdayIndex === 6) daysUntilSat = 0;
  else if (weekdayIndex === 0) daysUntilSat = -1;
  else daysUntilSat = 6 - weekdayIndex;

  const sat = new Date(base);
  sat.setUTCDate(base.getUTCDate() + daysUntilSat);
  const sun = new Date(sat);
  sun.setUTCDate(sat.getUTCDate() + 1);

  const fmt = (dt: Date) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: TOKYO_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(
      dt
    );

  return [fmt(sat), fmt(sun)];
}

export function formatDateTimeJa(iso: string): string {
  const fmtDate = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO_TZ,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  const fmtTime = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO_TZ,
    hour: "2-digit",
    minute: "2-digit",
  });
  const d = new Date(iso);
  return `${fmtDate.format(d)} ${fmtTime.format(d)}`;
}

export function formatDateRangeJa(startIso: string, endIso: string | null): string {
  const fmtDate = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO_TZ,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  const fmtTime = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO_TZ,
    hour: "2-digit",
    minute: "2-digit",
  });

  const start = new Date(startIso);
  const startStr = `${fmtDate.format(start)} ${fmtTime.format(start)}`;

  if (!endIso) return startStr + " 〜";

  const end = new Date(endIso);
  const sameDay = toTokyoDateOnly(startIso) === toTokyoDateOnly(endIso);

  if (sameDay) {
    return `${fmtDate.format(start)} ${fmtTime.format(start)}〜${fmtTime.format(end)}`;
  }
  return `${startStr} 〜 ${fmtDate.format(end)} ${fmtTime.format(end)}`;
}
