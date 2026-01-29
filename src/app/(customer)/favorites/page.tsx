"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Star, 
  MapPin, 
  Clock,
  Trash2,
  UtensilsCrossed,
  Store,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo favorite restaurants
const favoriteRestaurants = [
  {
    id: "1",
    name: "La Bella Italia",
    slug: "la-bella-italia",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    cuisine: "Italian, Mediterranean",
    rating: 4.8,
    priceRange: "$$$",
    address: "123 Main Street, New York",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  },
  {
    id: "2",
    name: "Tokyo Ramen House",
    slug: "tokyo-ramen-house",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    cuisine: "Japanese, Ramen",
    rating: 4.9,
    priceRange: "$$",
    address: "456 Oak Avenue, Brooklyn",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
  },
  {
    id: "3",
    name: "El Mariachi",
    slug: "el-mariachi",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    cuisine: "Mexican, Latin",
    rating: 4.7,
    priceRange: "$$",
    address: "789 Sunset Blvd, Manhattan",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
  },
];

// Demo favorite dishes
const favoriteDishes = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    restaurant: "La Bella Italia",
    restaurantSlug: "la-bella-italia",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    price: 22.99,
    description: "Creamy pasta with pancetta, egg, and parmesan",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: "2",
    name: "Tonkotsu Ramen",
    restaurant: "Tokyo Ramen House",
    restaurantSlug: "tokyo-ramen-house",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    price: 16.99,
    description: "Rich pork bone broth with chashu and soft-boiled egg",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: "3",
    name: "Tacos Al Pastor",
    restaurant: "El Mariachi",
    restaurantSlug: "el-mariachi",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    price: 14.99,
    description: "Marinated pork tacos with pineapple and cilantro",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: "4",
    name: "Tiramisu",
    restaurant: "La Bella Italia",
    restaurantSlug: "la-bella-italia",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    price: 10.99,
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
];

export default function FavoritesPage() {
  const [restaurants, setRestaurants] = useState(favoriteRestaurants);
  const [dishes, setDishes] = useState(favoriteDishes);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const removeRestaurant = (id: string) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
    toast.success("Removed from favorites");
  };

  const removeDish = (id: string) => {
    setDishes(dishes.filter(d => d.id !== id));
    toast.success("Removed from favorites");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-wine/10">
              <Heart className="h-6 w-6 text-wine fill-wine" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">My Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            Your saved restaurants and dishes for quick access
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="restaurants" className="gap-2">
              <Store className="h-4 w-4" />
              Restaurants ({restaurants.length})
            </TabsTrigger>
            <TabsTrigger value="dishes" className="gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              Dishes ({dishes.length})
            </TabsTrigger>
          </TabsList>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants">
            {restaurants.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No favorite restaurants yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start exploring and save restaurants you love
                  </p>
                  <Link href="/restaurants">
                    <Button className="bg-wine hover:bg-wine/90">
                      Browse Restaurants
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative w-32 sm:w-48 flex-shrink-0">
                          <Image
                            src={restaurant.image}
                            alt={restaurant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link href={`/restaurants/${restaurant.slug}`}>
                                <h3 className="font-semibold hover:text-wine transition-colors">
                                  {restaurant.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => removeRestaurant(restaurant.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-gold text-gold" />
                              {restaurant.rating}
                            </span>
                            <Badge variant="outline">{restaurant.priceRange}</Badge>
                          </div>
                          
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {restaurant.address}
                          </div>
                          
                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <span className="text-xs text-muted-foreground">
                              Saved {formatDate(restaurant.savedAt)}
                            </span>
                            <Link href={`/restaurants/${restaurant.slug}`}>
                              <Button size="sm" variant="outline" className="gap-1">
                                View Menu
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Dishes Tab */}
          <TabsContent value="dishes">
            {dishes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No favorite dishes yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse menus and save dishes you want to try
                  </p>
                  <Link href="/restaurants">
                    <Button className="bg-wine hover:bg-wine/90">
                      Explore Menus
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {dishes.map((dish) => (
                  <Card key={dish.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={() => removeDish(dish.id)}
                      >
                        <Heart className="h-4 w-4 fill-wine text-wine" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold line-clamp-1">{dish.name}</h3>
                        <span className="font-semibold text-wine">{formatPrice(dish.price)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {dish.description}
                      </p>
                      <Link href={`/restaurants/${dish.restaurantSlug}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                          {dish.restaurant}
                        </Badge>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-3">
                        Saved {formatDate(dish.savedAt)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
