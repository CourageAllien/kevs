import { RestaurantCard } from "./restaurant-card";

// Demo restaurants data
const demoRestaurants = [
  {
    id: "1",
    name: "La Bella Italia",
    slug: "la-bella-italia",
    description: "Authentic Italian cuisine in a romantic setting with handmade pasta and wood-fired pizzas.",
    cuisine: ["Italian"],
    address: "123 Main Street, New York, NY 10001",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 324,
    priceRange: 3,
    isOpen: true,
    features: ["Outdoor Seating", "Private Dining", "Wine Bar"],
  },
  {
    id: "2",
    name: "Tokyo Ramen House",
    slug: "tokyo-ramen-house",
    description: "Traditional Japanese ramen with rich, flavorful broths simmered for 24 hours.",
    cuisine: ["Japanese", "Ramen"],
    address: "456 Oak Avenue, New York, NY 10002",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 189,
    priceRange: 2,
    isOpen: true,
    features: ["Quick Service", "Vegetarian Options"],
  },
  {
    id: "3",
    name: "El Mariachi",
    slug: "el-mariachi",
    description: "Vibrant Mexican flavors with street tacos, fresh guacamole, and premium tequilas.",
    cuisine: ["Mexican"],
    address: "789 Sunset Blvd, New York, NY 10003",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 267,
    priceRange: 2,
    isOpen: true,
    features: ["Live Music", "Happy Hour", "Patio"],
  },
  {
    id: "4",
    name: "Spice Garden",
    slug: "spice-garden",
    description: "Aromatic Indian dishes with authentic spices and traditional cooking methods.",
    cuisine: ["Indian"],
    address: "321 Curry Lane, New York, NY 10004",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 412,
    priceRange: 2,
    isOpen: false,
    features: ["Vegetarian Friendly", "Vegan Options", "Halal"],
  },
  {
    id: "5",
    name: "The French Quarter",
    slug: "the-french-quarter",
    description: "Elegant French bistro offering classic dishes with a modern twist.",
    cuisine: ["French"],
    address: "555 Bistro Street, New York, NY 10005",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    priceRange: 4,
    isOpen: true,
    features: ["Fine Dining", "Sommelier", "Tasting Menu"],
  },
  {
    id: "6",
    name: "Bangkok Street",
    slug: "bangkok-street",
    description: "Authentic Thai street food with bold flavors and fresh ingredients.",
    cuisine: ["Thai"],
    address: "888 Noodle Way, New York, NY 10006",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    rating: 4.4,
    reviewCount: 298,
    priceRange: 1,
    isOpen: true,
    features: ["Spicy Options", "Gluten-Free Available", "Takeout"],
  },
];

export async function RestaurantList() {
  // In production, this would fetch from the database
  // const restaurants = await prisma.restaurant.findMany({...})
  
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {demoRestaurants.map((restaurant, index) => (
        <RestaurantCard 
          key={restaurant.id} 
          restaurant={restaurant} 
          index={index}
        />
      ))}
    </div>
  );
}
