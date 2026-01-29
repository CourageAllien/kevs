"use client";

import { redirect } from "next/navigation";

// Redirect to reception dashboard which handles reservations
export default function DashboardReservationsPage() {
  redirect("/reception");
}
