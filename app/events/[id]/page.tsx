import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { events, getEventById } from "@/data/events";
import { eventToJsonLd } from "@/lib/jsonld";
import { formatDateRangeJa, formatDateTimeJa } from "@/lib/date";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return {};

  return {
    title: event.name,
    description: event.description,
    alternates: {
      canonical: `/events/${event.id}`,
    },
    openGraph: {
      title: event.name,
      description: event.description,
      type: "article",
      url: `${SITE_URL}/events/${event.id}`,
    },
  };
}

export const revalidate = 300;

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  const jsonLd = eventToJsonLd(event);

  return (
    <article className="event-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="breadcrumb">
        <Link href="/">イベント一覧</Link> / {event.name}
      </nav>

      <div className="event-detail__badges">
        <span className="badge">{event.genre}</span>
        <span className="badge">{event.area}</span>
        <span className="badge">{event.status}</span>
        {event.isFree === true && <span className="badge badge--free">無料</span>}
      </div>

      <h1>{event.name}</h1>
      <p className="detail-description">{event.description}</p>

      <table className="detail-table">
        <tbody>
          <tr>
            <th>日時</th>
            <td>{formatDateRangeJa(event.startDateTime, event.endDateTime)}</td>
          </tr>
          {event.openingHoursText && (
            <tr>
              <th>開館・開場時間</th>
              <td>{event.openingHoursText}</td>
            </tr>
          )}
          {event.closedDaysText && (
            <tr>
              <th>休館日</th>
              <td>{event.closedDaysText}</td>
            </tr>
          )}
          <tr>
            <th>会場</th>
            <td>{event.venueName}</td>
          </tr>
          <tr>
            <th>住所</th>
            <td>{event.address ?? "不明"}</td>
          </tr>
          <tr>
            <th>最寄り駅</th>
            <td>{event.nearestStation ?? "不明"}</td>
          </tr>
          <tr>
            <th>料金</th>
            <td>{event.priceText}</td>
          </tr>
          {event.organizer && (
            <tr>
              <th>主催</th>
              <td>{event.organizer}</td>
            </tr>
          )}
          <tr>
            <th>開催状況</th>
            <td>{event.status}</td>
          </tr>
          <tr>
            <th>情報の最終確認日時</th>
            <td>{formatDateTimeJa(event.lastCheckedAt)}</td>
          </tr>
        </tbody>
      </table>

      <div className="cta-row">
        <a className="btn btn--primary" href={event.officialUrl} target="_blank" rel="noopener noreferrer">
          公式サイトを見る
        </a>
        {event.bookingUrl && event.bookingUrl !== event.officialUrl && (
          <a className="btn btn--secondary" href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
            予約・チケット情報
          </a>
        )}
      </div>

      <div className="note-box">
        会期・料金・開催状況は変更される場合があります。来場前に必ず公式サイトで最新情報をご確認ください。
        {event.sourceNote && <> {event.sourceNote}</>}
      </div>
    </article>
  );
}
