import type { TokyoEvent } from "@/lib/types";
import { formatDateRangeJa } from "@/lib/date";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function eventsToMarkdown(events: TokyoEvent[]): string {
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME} ｜ イベント一覧（Markdown）`);
  lines.push("");
  lines.push(
    "東京都内で開催中・開催予定の実在イベント一覧です。AIエージェント・検索クローラーによる読み取りを想定したMarkdown形式で提供しています。"
  );
  lines.push("");
  lines.push(`- 掲載件数: ${events.length}件`);
  lines.push(`- 生成日時: ${new Date().toISOString()}`);
  lines.push(`- 人間向けページ: ${SITE_URL}/`);
  lines.push(`- JSON API: ${SITE_URL}/api/events`);
  lines.push("");
  lines.push("---");
  lines.push("");

  for (const event of events) {
    lines.push(`## ${event.name}`);
    lines.push("");
    lines.push(`- ジャンル: ${event.genre}`);
    lines.push(`- 開催状況: ${event.status}`);
    lines.push(`- 日時: ${formatDateRangeJa(event.startDateTime, event.endDateTime)}`);
    lines.push(`- 会場: ${event.venueName}`);
    lines.push(`- 住所: ${event.address ?? "不明"}`);
    lines.push(`- 最寄り駅: ${event.nearestStation ?? "不明"}`);
    lines.push(`- 料金: ${event.priceText}`);
    lines.push(`- 公式サイト: ${event.officialUrl}`);
    if (event.bookingUrl) {
      lines.push(`- 予約URL: ${event.bookingUrl}`);
    }
    lines.push(`- このサイトでの詳細ページ: ${SITE_URL}/events/${event.id}`);
    lines.push(`- 情報の最終確認日時: ${event.lastCheckedAt}`);
    lines.push("");
    lines.push(event.description);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
}
