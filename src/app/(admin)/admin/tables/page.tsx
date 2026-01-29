"use client";

import { redirect } from "next/navigation";

// Redirect to reception floor plan
export default function AdminTablesPage() {
  redirect("/reception/floor-plan");
}
