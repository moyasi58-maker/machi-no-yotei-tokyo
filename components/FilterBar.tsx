"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface FilterBarProps {
  areas: string[];
  genres: string[];
}

export default function FilterBar({ areas, genres }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function toggleBoolean(key: string) {
    const isActive = searchParams.get(key) === "1";
    updateParam(key, isActive ? null : "1");
  }

  const isToday = searchParams.get("today") === "1";
  const isWeekend = searchParams.get("weekend") === "1";
  const isFree = searchParams.get("free") === "1";
  const currentArea = searchParams.get("area") ?? "";
  const currentGenre = searchParams.get("genre") ?? "";

  return (
    <div className="filters">
      <div className="filter-group">
        <button type="button" className="chip" data-active={isToday} onClick={() => toggleBoolean("today")}>
          今日
        </button>
        <button type="button" className="chip" data-active={isWeekend} onClick={() => toggleBoolean("weekend")}>
          今週末
        </button>
        <button type="button" className="chip" data-active={isFree} onClick={() => toggleBoolean("free")}>
          無料
        </button>
      </div>
      <div className="filter-group">
        <select
          className="filter-select"
          value={currentArea}
          onChange={(e) => updateParam("area", e.target.value || null)}
          aria-label="地域で絞り込む"
        >
          <option value="">地域: すべて</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={currentGenre}
          onChange={(e) => updateParam("genre", e.target.value || null)}
          aria-label="ジャンルで絞り込む"
        >
          <option value="">ジャンル: すべて</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {(isToday || isWeekend || isFree || currentArea || currentGenre) && (
          <button type="button" className="chip" onClick={() => router.push(pathname)}>
            絞り込みをクリア
          </button>
        )}
      </div>
    </div>
  );
}
