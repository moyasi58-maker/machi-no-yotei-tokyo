import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * このサイトは「AIに読み取られ、引用されること」を目的としているため、
 * 検索用クローラー・AI検索クローラーを広く許可する。
 *
 * 参考:
 * - https://developers.openai.com/api/docs/bots
 *   (OAI-SearchBot=検索用, ChatGPT-User=ユーザー操作用, GPTBot=学習用)
 * - 各社の公式ドキュメントに記載されたユーザーエージェント名を個別に許可し、
 *   ワイルドカード(*)でもすべて許可することで、将来追加されるクローラーも
 *   不必要にブロックしない方針とする。
 */
export default function robots(): MetadataRoute.Robots {
  const namedBots = [
    "OAI-SearchBot", // OpenAI: 検索用
    "ChatGPT-User", // OpenAI: ユーザー操作用
    "GPTBot", // OpenAI: 学習用
    "PerplexityBot", // Perplexity: 検索用
    "Perplexity-User",
    "ClaudeBot", // Anthropic: 学習用
    "anthropic-ai",
    "Claude-User",
    "Claude-SearchBot",
    "Google-Extended", // Google: Gemini/Geminiグラウンディング制御
    "Googlebot",
    "Bingbot",
    "CCBot", // Common Crawl
    "Applebot",
    "Applebot-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...namedBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
