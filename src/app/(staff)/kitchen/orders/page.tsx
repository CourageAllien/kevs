"use client";

import { redirect } from "next/navigation";

// Redirect to main kitchen page which already shows orders
export default function KitchenOrdersPage() {
  redirect("/kitchen");
}
