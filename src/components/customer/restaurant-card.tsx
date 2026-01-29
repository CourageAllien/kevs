"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    slug: string;
    description: string;
    cuisine: string[];
    address: string;
    image: string;
    rating: number;
    reviewCount: number;
    priceRange: number;
    isOpen: boolean;
    features: string[];
  };
  index: number;
}

export function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const priceLabel = "$".repeat(restaurant.priceRange);

  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
      <Card 
        className={cn(
          "group overflow-hidden border-border/50 hover:border-wine/30 hover:shadow-lg transition-all duration-300",
          "animate-fade-in opacity-0"
        )}
        style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              className={cn(
                "text-xs",
                restaurant.isOpen 
                  ? "bg-green-600 hover:bg-green-600" 
                  : "bg-gray-600 hover:bg-gray-600"
              )}
            >
              <Clock className="h-3 w-3 mr-1" />
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </Badge>
          </div>

          {/* Price badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur">
              {priceLabel}
            </Badge>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Cuisine badges on image */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            {restaurant.cuisine.slice(0, 2).map((c) => (
              <Badge 
                key={c} 
                variant="secondary"
                className="bg-white/90 text-foreground text-xs"
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title and rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-wine transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-medium text-sm">{restaurant.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {restaurant.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-4">
            {restaurant.features.slice(0, 3).map((feature) => (
              <Badge 
                key={feature} 
                variant="outline"
                className="text-xs py-0 px-2"
              >
                {feature}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                // Navigate to menu
                window.location.href = `/restaurants/${restaurant.slug}`;
              }}
            >
              View Menu
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-wine hover:bg-wine/90"
              onClick={(e) => {
                e.preventDefault();
                // Navigate to booking
                window.location.href = `/restaurants/${restaurant.slug}/book`;
              }}
            >
              Book Table
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
