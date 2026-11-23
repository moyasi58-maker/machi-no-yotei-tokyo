export const SITE_NAME = "まちの予定 TOKYO";
export const SITE_DESCRIPTION =
  "東京都内で開催される展示・音楽・マーケット・上映会などのイベント情報を、人にもAIにも読み取りやすい形で提供する小さなデータベースです。";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://machi-no-yotei-tokyo.vercel.app").replace(
  /\/$/,
  ""
);
