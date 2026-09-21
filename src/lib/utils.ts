export function dateLabel(date: string) {
  if (!/^\d{4}-\d{2}$/.test(date)) return date;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}-01T00:00:00Z`));
}
export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
