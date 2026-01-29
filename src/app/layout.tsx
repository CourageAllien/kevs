import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

export const metadata: Metadata = {
  title: "Kevs Kitchen - Restaurant Management Platform",
  description: "A comprehensive multi-restaurant management platform for seamless dining experiences. Order food, book tables, and manage restaurant operations all in one place.",
  keywords: ["restaurant", "food ordering", "table booking", "restaurant management", "dining"],
  authors: [{ name: "Kevs Kitchen" }],
  openGraph: {
    title: "Kevs Kitchen - Restaurant Management Platform",
    description: "A comprehensive multi-restaurant management platform for seamless dining experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: 'bg-card border-border',
                title: 'text-foreground font-serif',
                description: 'text-muted-foreground',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
