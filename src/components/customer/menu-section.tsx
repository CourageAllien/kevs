"use client";

import { MenuItemCard } from "./menu-item-card";

interface MenuItem {
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
}

interface MenuSectionProps {
  category: {
    id: string;
    name: string;
    description?: string;
    items: MenuItem[];
  };
}

export function MenuSection({ category }: MenuSectionProps) {
  return (
    <section id={category.id} className="scroll-mt-32">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          {category.name}
        </h2>
        {category.description && (
          <p className="text-muted-foreground mt-1">{category.description}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
