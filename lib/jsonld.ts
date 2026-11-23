import type { TokyoEvent } from "@/lib/types";
import { SITE_URL } from "@/lib/site";

/**
 * schema.org/Event に準拠したJSON-LDを生成する。
 * 確認できていない項目（price, offers等）は無理に埋めず省略する。
 */
export function eventToJsonLd(event: TokyoEvent) {
  const offers = event.isFree
    ? {
        "@type": "Offer",
        price: "0",
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
        url: event.bookingUrl ?? event.officialUrl,
      }
    : event.bookingUrl
    ? {
        "@type": "Offer",
        url: event.bookingUrl,
        priceCurrency: "JPY",
        availability: "https://schema.org/InStock",
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDateTime,
    ...(event.endDateTime ? { endDate: event.endDateTime } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      event.status === "終了"
        ? "https://schema.org/EventMovedOnline"
        : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venueName,
      ...(event.address
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: event.address,
              addressLocality: "東京都",
              addressCountry: "JP",
            },
          }
        : {}),
    },
    ...(event.organizer
      ? {
          organizer: {
            "@type": "Organization",
            name: event.organizer,
          },
        }
      : {}),
    ...(offers ? { offers } : {}),
    url: `${SITE_URL}/events/${event.id}`,
    sameAs: event.officialUrl,
  };
}
