"use client";

import { redirect } from "next/navigation";

// Redirect to main reception page which already shows waitlist
export default function ReceptionWaitlistPage() {
  redirect("/reception");
}
