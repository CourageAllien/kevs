"use client";

import { redirect } from "next/navigation";

// Redirect to main reception page which already shows reservations
export default function ReceptionReservationsPage() {
  redirect("/reception");
}
