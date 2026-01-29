"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Clock, Flame, Leaf, AlertTriangle, UtensilsCrossed } from "lucide-react";
import { useDiningStore } from "@/stores/dining-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MenuItemCardProps {
  item: {
    id: string;
    restaurantId: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    dietaryTags: string[];
    allergens: string[];
    spiceLevel?: string;
    prepTime: number;
    isAvailable: boolean;
    isPopular: boolean;
    isNew: boolean;
  };
}

const spiceLevelColors: Record<string, string> = {
  MILD: "text-yellow-500",
  MEDIUM: "text-orange-500",
  HOT: "text-red-500",
  EXTRA_HOT: "text-red-700",
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  const activeSession = useDiningStore((state) => state.activeSession);
  const addToOrder = useDiningStore((state) => state.addToOrder);

  const handleAddToOrder = () => {
    if (!activeSession) {
      toast.error("You need to be seated to order", {
        description: "Book a table and check in to start ordering",
        action: {
          label: "Book Table",
          onClick: () => window.location.href = `/restaurants/${item.restaurantId}/book`,
        },
      });
      return;
    }

    addToOrder({
      menuItemId: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      quantity,
      specialInstructions: specialInstructions || undefined,
    });

    toast.success(`${quantity}x ${item.name} added to your order`, {
      action: {
        label: "View Orders",
        onClick: () => window.location.href = '/dining',
      },
    });
    
    setIsOpen(false);
    setQuantity(1);
    setSpecialInstructions("");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <>
      <Card
        className={cn(
          "group flex gap-4 p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-border/50",
          !item.isAvailable && "opacity-60"
        )}
        onClick={() => item.isAvailable && setIsOpen(true)}
      >
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-foreground group-hover:text-wine transition-colors line-clamp-1">
              {item.name}
            </h3>
            <span className="font-semibold text-foreground flex-shrink-0">
              {formatPrice(item.price)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {item.description}
          </p>

          {/* Tags and info */}
          <div className="flex flex-wrap items-center gap-2">
            {item.isPopular && (
              <Badge className="bg-gold/20 text-gold-dark text-xs py-0">
                Popular
              </Badge>
            )}
            {item.isNew && (
              <Badge className="bg-green-100 text-green-700 text-xs py-0">
                New
              </Badge>
            )}
            {item.dietaryTags.includes("VEGETARIAN") && (
              <Badge variant="outline" className="text-green-600 border-green-300 text-xs py-0 gap-1">
                <Leaf className="h-3 w-3" />
                Veg
              </Badge>
            )}
            {item.dietaryTags.includes("VEGAN") && (
              <Badge variant="outline" className="text-green-600 border-green-300 text-xs py-0 gap-1">
                <Leaf className="h-3 w-3" />
                Vegan
              </Badge>
            )}
            {item.spiceLevel && (
              <span className={cn("flex items-center gap-1 text-xs", spiceLevelColors[item.spiceLevel])}>
                <Flame className="h-3 w-3" />
                {item.spiceLevel.toLowerCase()}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {item.prepTime} min
            </span>
          </div>

          {!item.isAvailable && (
            <Badge variant="secondary" className="mt-2 text-xs">
              Currently Unavailable
            </Badge>
          )}
        </div>

        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          {item.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
              <Button
                size="icon"
                className="h-8 w-8 bg-white text-foreground opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Detail dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <div className="relative aspect-video -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{item.name}</DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground">{item.description}</p>

          {/* Dietary info */}
          <div className="flex flex-wrap gap-2">
            {item.dietaryTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag.replace("_", " ")}
              </Badge>
            ))}
          </div>

          {/* Allergens warning */}
          {item.allergens.length > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Allergens</p>
                <p className="text-xs text-yellow-700">
                  Contains: {item.allergens.join(", ").toLowerCase()}
                </p>
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Any allergies or preferences..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>

          {/* Session status notice */}
          {!activeSession && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-wine/5 border border-wine/20">
              <UtensilsCrossed className="h-4 w-4 text-wine mt-0.5" />
              <div>
                <p className="text-sm font-medium text-wine">Dine-in Ordering</p>
                <p className="text-xs text-muted-foreground">
                  You need to be seated at a table to place orders. 
                  <Link href="/booking" className="text-wine hover:underline ml-1">
                    View your reservations
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* Quantity and add to order */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className={cn(
                "bg-wine hover:bg-wine/90",
                !activeSession && "opacity-75"
              )}
              onClick={handleAddToOrder}
            >
              {activeSession ? (
                <>Add to Order · {formatPrice(item.price * quantity)}</>
              ) : (
                <>Book Table to Order</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
