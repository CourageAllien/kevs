"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Star, DollarSign, X } from "lucide-react";

const cuisineTypes = [
  "Italian",
  "Japanese",
  "Mexican",
  "Indian",
  "Thai",
  "Chinese",
  "French",
  "American",
  "Mediterranean",
  "Korean",
];

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "halal", label: "Halal" },
  { id: "kosher", label: "Kosher" },
];

const priceRanges = [
  { value: 1, label: "$" },
  { value: 2, label: "$$" },
  { value: 3, label: "$$$" },
  { value: 4, label: "$$$$" },
];

export function RestaurantFilters() {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const toggleDietary = (dietary: string) => {
    setSelectedDietary((prev) =>
      prev.includes(dietary)
        ? prev.filter((d) => d !== dietary)
        : [...prev, dietary]
    );
  };

  const togglePrice = (price: number) => {
    setSelectedPrices((prev) =>
      prev.includes(price)
        ? prev.filter((p) => p !== price)
        : [...prev, price]
    );
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedDietary([]);
    setSelectedPrices([]);
    setMinRating(null);
  };

  const activeFiltersCount =
    selectedCuisines.length +
    selectedDietary.length +
    selectedPrices.length +
    (minRating ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}

      {/* Cuisine types */}
      <div>
        <h3 className="font-semibold mb-3">Cuisine</h3>
        <div className="flex flex-wrap gap-2">
          {cuisineTypes.map((cuisine) => (
            <Badge
              key={cuisine}
              variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedCuisines.includes(cuisine)
                  ? "bg-wine hover:bg-wine/90"
                  : "hover:bg-muted"
              }`}
              onClick={() => toggleCuisine(cuisine)}
            >
              {cuisine}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex gap-2">
          {priceRanges.map((price) => (
            <Button
              key={price.value}
              variant={selectedPrices.includes(price.value) ? "default" : "outline"}
              size="sm"
              className={
                selectedPrices.includes(price.value)
                  ? "bg-wine hover:bg-wine/90"
                  : ""
              }
              onClick={() => togglePrice(price.value)}
            >
              <DollarSign className="h-3 w-3" />
              {price.label.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <div className="flex gap-2">
          {[4, 4.5].map((rating) => (
            <Button
              key={rating}
              variant={minRating === rating ? "default" : "outline"}
              size="sm"
              className={minRating === rating ? "bg-wine hover:bg-wine/90" : ""}
              onClick={() => setMinRating(minRating === rating ? null : rating)}
            >
              <Star className="h-3 w-3 mr-1 fill-current" />
              {rating}+
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Dietary options */}
      <div>
        <h3 className="font-semibold mb-3">Dietary Options</h3>
        <div className="space-y-3">
          {dietaryOptions.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <Checkbox
                id={option.id}
                checked={selectedDietary.includes(option.id)}
                onCheckedChange={() => toggleDietary(option.id)}
              />
              <Label htmlFor={option.id} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-serif text-xl font-semibold mb-6">Filters</h2>
          <FilterContent />
        </div>
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-wine">{activeFiltersCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="font-serif">Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
