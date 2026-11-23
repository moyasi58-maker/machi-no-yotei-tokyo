import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article>
      <h1 className="page-heading">このサイトについて</h1>

      <p className="detail-description">
        「まちの予定 TOKYO」は、東京都内で開催される実在のイベント情報を、公式情報源にもとづいて掲載する小さな実験的サイトです。
        人が見やすいWebページとしてだけでなく、AIエージェントが情報を取得・理解・引用しやすい形で提供することを主な目的としています。
      </p>

      <h2>掲載方針</h2>
      <ul>
        <li>イベント情報は東京都・区市町村・施設・主催者などの公式サイトを確認して掲載しています。</li>
        <li>確認できなかった項目（料金・開館時間など）は「不明」と表示し、推測で埋めていません。</li>
        <li>会期・料金・開催状況は変更される場合があります。来場前に必ず各イベントの公式サイトをご確認ください。</li>
        <li>AI検索・AI学習での掲載や引用が保証されるものではありません。</li>
      </ul>

      <h2>AIのための機械可読データ</h2>
      <ul>
        <li>
          イベント詳細ページには <code>schema.org/Event</code> 準拠のJSON-LDを埋め込んでいます。
        </li>
        <li>
          <code>/api/events</code>・<code>/api/events/{"{id}"}</code> で認証不要のJSON APIを提供しています。
        </li>
        <li>
          <code>/events.md</code> でイベント一覧をMarkdown形式で提供しています。
        </li>
        <li>
          <code>/sitemap.xml</code>・<code>/robots.txt</code> を設置し、検索用・AI検索用クローラーを不必要にブロックしていません。
        </li>
      </ul>

      <h2>アクセス解析について</h2>
      <p>
        このサイトはVercelの標準的なアクセスログ機能を用いて、ページおよびAPIへのアクセス状況・User-Agentの傾向を確認しています。
        User-Agentの文字列だけでAIクローラーのアクセスであると断定することはできないため、「検証済みのアクセス」と「推測にもとづくアクセス」は区別して扱います。
        個人を特定する情報は必要以上に収集しません。
      </p>

      <h2>将来の展望</h2>
      <p>
        現段階では収益化機能はありません。将来的には、公式チケットサイトへの正規のアフィリエイト送客、主催者向けの有料掲載、AIエージェント向けの有料データAPIなどを検討する可能性がありますが、
        虚偽情報の掲載、隠れた命令の埋め込み、推薦操作、アクセス数の不正な水増しは行いません。
      </p>
    </article>
  );
}
