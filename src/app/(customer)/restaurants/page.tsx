import { Suspense } from "react";
import { RestaurantList } from "@/components/customer/restaurant-list";
import { RestaurantFilters } from "@/components/customer/restaurant-filters";
import { RestaurantSearch } from "@/components/customer/restaurant-search";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Restaurants | Kevs Kitchen",
  description: "Discover and explore restaurants near you. Browse menus, book tables, and order food.",
};

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="bg-gradient-wine text-cream py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Restaurants
          </h1>
          <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
            Explore curated restaurants, browse digital menus, and book your perfect table
          </p>
          
          {/* Search bar */}
          <RestaurantSearch />
        </div>
      </section>

      {/* Main content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <RestaurantFilters />
          </aside>

          {/* Restaurant grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold">All Restaurants</h2>
              <p className="text-sm text-muted-foreground">
                Showing all restaurants
              </p>
            </div>

            <Suspense fallback={<RestaurantListSkeleton />}>
              <RestaurantList />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}

function RestaurantListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-border">
          <Skeleton className="aspect-[16/10] w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
