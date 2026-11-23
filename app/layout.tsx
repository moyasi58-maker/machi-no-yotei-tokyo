import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} ｜ 東京都内のイベント情報`,
    template: `%s ｜ ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <div className="container site-header__inner">
            <div>
              <Link href="/" className="site-title">
                {SITE_NAME}
              </Link>
              <div className="site-tagline">AIが東京の予定を調べるとき、最初に頼れる小さなイベントデータベース</div>
            </div>
            <nav className="site-nav">
              <Link href="/">イベント一覧</Link>
              <Link href="/events.md">Markdown</Link>
              <Link href="/api/events">API</Link>
              <Link href="/about">このサイトについて</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>
              {SITE_NAME} は実在する東京都内のイベントを公式情報源をもとに掲載する非商用の実験的プロジェクトです。
              掲載内容は変更される場合があるため、必ず各イベントの公式サイトで最新情報をご確認ください。
            </p>
            <p>
              <Link href="/events.md">/events.md</Link> ・ <Link href="/api/events">/api/events</Link> ・{" "}
              <Link href="/sitemap.xml">sitemap.xml</Link> ・ <Link href="/robots.txt">robots.txt</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
