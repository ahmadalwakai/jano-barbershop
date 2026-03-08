import { redirect } from "next/navigation";

export default async function LegacyBookingSuccessRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : "";
  const target = sessionId ? `/book/success?session_id=${encodeURIComponent(sessionId)}` : "/book/success";
  redirect(target);
}
