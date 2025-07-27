import { redirect } from "next/navigation";

// This page is never rendered. It's just a trick to get the not-found page
// to render under a locale.
export default function NotFound() {
  redirect("/");
}
