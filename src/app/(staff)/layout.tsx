import { StaffSidebar } from "@/components/staff/staff-sidebar";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <StaffSidebar />
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
