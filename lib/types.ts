export type EventGenre =
  | "美術展・展示会"
  | "音楽・コンサート"
  | "文学・読書イベント"
  | "映画・上映会"
  | "地域のお祭り・マーケット"
  | "ワークショップ"
  | "期間限定の催し";

export type EventStatus = "開催予定" | "開催中" | "終了" | "不明";

export interface TokyoEvent {
  /** URLに使う一意なID（半角英数とハイフンのみ） */
  id: string;
  /** イベント名 */
  name: string;
  /** ジャンル */
  genre: EventGenre;
  /** 簡潔な説明（100〜200字程度） */
  description: string;
  /** 会場名 */
  venueName: string;
  /** 住所（不明な場合は null） */
  address: string | null;
  /** 地域・エリア表示用（例: 六本木） */
  area: string;
  /** 最寄り駅 */
  nearestStation: string | null;
  /** 開始日時（ISO 8601, Asia/Tokyo, 例: 2026-11-21T11:00:00+09:00） */
  startDateTime: string;
  /** 終了日時（ISO 8601, Asia/Tokyo）。単日イベントの終了時刻、または会期最終日の閉場時刻 */
  endDateTime: string | null;
  /** 開館・開場時間の説明（自由記述、不明な場合は null） */
  openingHoursText: string | null;
  /** 休館日・休業日の説明（不明な場合は null） */
  closedDaysText: string | null;
  /** 料金の説明文（自由記述） */
  priceText: string;
  /** 入場無料かどうか。不明な場合は null */
  isFree: boolean | null;
  /** 公式情報URL */
  officialUrl: string;
  /** 予約・チケット購入URL（不明な場合は null） */
  bookingUrl: string | null;
  /** 主催者（不明な場合は null） */
  organizer: string | null;
  /** 開催状況 */
  status: EventStatus;
  /** 情報の最終確認日時（ISO 8601, Asia/Tokyo） */
  lastCheckedAt: string;
  /** 補足・出典メモ（人間向け、任意） */
  sourceNote: string | null;
}
