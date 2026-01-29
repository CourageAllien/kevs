import { CustomerNav } from "@/components/customer/customer-nav";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <CustomerNav />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
