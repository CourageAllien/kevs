import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuSection } from "@/components/customer/menu-section";
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Calendar,
  ChevronLeft,
  Share2,
  Heart
} from "lucide-react";

// Demo restaurants with full data
const demoRestaurants: Record<string, {
  id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: number;
  features: string[];
  openingHours: { dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }[];
}> = {
  "la-bella-italia": {
    id: "1",
    name: "La Bella Italia",
    slug: "la-bella-italia",
    description: "Experience the finest Italian cuisine in an elegant setting. Our chefs create authentic dishes using traditional recipes passed down through generations, featuring handmade pasta, wood-fired pizzas, and an extensive wine selection from Italy's best vineyards.",
    cuisine: ["Italian", "Mediterranean"],
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 (555) 123-4567",
    website: "https://labellaitalia.com",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 324,
    priceRange: 3,
    features: ["Outdoor Seating", "Private Dining", "Wine Bar", "Wheelchair Accessible", "Live Music"],
    openingHours: [
      { dayOfWeek: 0, openTime: "12:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 1, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 2, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 3, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 4, openTime: "11:00", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 5, openTime: "11:00", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 6, openTime: "12:00", closeTime: "22:00", isClosed: false },
    ],
  },
  "tokyo-ramen-house": {
    id: "2",
    name: "Tokyo Ramen House",
    slug: "tokyo-ramen-house",
    description: "Traditional Japanese ramen with rich, flavorful broths simmered for 24 hours. Experience authentic Tokyo-style ramen made with the finest ingredients imported directly from Japan.",
    cuisine: ["Japanese", "Ramen"],
    address: "456 Oak Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    phone: "+1 (555) 234-5678",
    website: "https://tokyoramenhouse.com",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 189,
    priceRange: 2,
    features: ["Quick Service", "Vegetarian Options", "Counter Seating"],
    openingHours: [
      { dayOfWeek: 0, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 1, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 2, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 3, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 4, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 5, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 6, openTime: "12:00", closeTime: "21:00", isClosed: false },
    ],
  },
  "el-mariachi": {
    id: "3",
    name: "El Mariachi",
    slug: "el-mariachi",
    description: "Vibrant Mexican flavors with street tacos, fresh guacamole, and premium tequilas. Live mariachi music on weekends brings the authentic spirit of Mexico to every meal.",
    cuisine: ["Mexican"],
    address: "789 Sunset Blvd",
    city: "New York",
    state: "NY",
    zipCode: "10003",
    phone: "+1 (555) 345-6789",
    website: "https://elmariachi.com",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 267,
    priceRange: 2,
    features: ["Live Music", "Happy Hour", "Patio", "Full Bar"],
    openingHours: [
      { dayOfWeek: 0, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 1, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 2, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 3, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 4, openTime: "11:00", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 5, openTime: "11:00", closeTime: "00:00", isClosed: false },
      { dayOfWeek: 6, openTime: "10:00", closeTime: "22:00", isClosed: false },
    ],
  },
  "spice-garden": {
    id: "4",
    name: "Spice Garden",
    slug: "spice-garden",
    description: "Aromatic Indian dishes with authentic spices and traditional cooking methods. From creamy butter chicken to fiery vindaloo, experience the diverse flavors of the Indian subcontinent.",
    cuisine: ["Indian"],
    address: "321 Curry Lane",
    city: "New York",
    state: "NY",
    zipCode: "10004",
    phone: "+1 (555) 456-7890",
    website: "https://spicegarden.com",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 412,
    priceRange: 2,
    features: ["Vegetarian Friendly", "Vegan Options", "Halal", "Catering"],
    openingHours: [
      { dayOfWeek: 0, openTime: "12:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 1, openTime: "11:30", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 2, openTime: "11:30", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 3, openTime: "11:30", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 4, openTime: "11:30", closeTime: "22:30", isClosed: false },
      { dayOfWeek: 5, openTime: "11:30", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 6, openTime: "12:00", closeTime: "22:00", isClosed: false },
    ],
  },
  "the-french-quarter": {
    id: "5",
    name: "The French Quarter",
    slug: "the-french-quarter",
    description: "Elegant French bistro offering classic dishes with a modern twist. Our sommelier-curated wine list perfectly complements the refined cuisine created by our Parisian-trained chefs.",
    cuisine: ["French"],
    address: "555 Bistro Street",
    city: "New York",
    state: "NY",
    zipCode: "10005",
    phone: "+1 (555) 567-8901",
    website: "https://thefrenchquarter.com",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 156,
    priceRange: 4,
    features: ["Fine Dining", "Sommelier", "Tasting Menu", "Private Dining"],
    openingHours: [
      { dayOfWeek: 0, openTime: "17:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 1, openTime: "00:00", closeTime: "00:00", isClosed: true },
      { dayOfWeek: 2, openTime: "17:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 3, openTime: "17:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 4, openTime: "17:00", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 5, openTime: "17:00", closeTime: "23:00", isClosed: false },
      { dayOfWeek: 6, openTime: "17:00", closeTime: "22:00", isClosed: false },
    ],
  },
  "bangkok-street": {
    id: "6",
    name: "Bangkok Street",
    slug: "bangkok-street",
    description: "Authentic Thai street food with bold flavors and fresh ingredients. From pad thai to green curry, experience the vibrant tastes of Bangkok's legendary street vendors.",
    cuisine: ["Thai"],
    address: "888 Noodle Way",
    city: "New York",
    state: "NY",
    zipCode: "10006",
    phone: "+1 (555) 678-9012",
    website: "https://bangkokstreet.com",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=600&fit=crop",
    rating: 4.4,
    reviewCount: 298,
    priceRange: 1,
    features: ["Spicy Options", "Gluten-Free Available", "Takeout", "Delivery"],
    openingHours: [
      { dayOfWeek: 0, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 1, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 2, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 3, openTime: "11:00", closeTime: "21:00", isClosed: false },
      { dayOfWeek: 4, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 5, openTime: "11:00", closeTime: "22:00", isClosed: false },
      { dayOfWeek: 6, openTime: "12:00", closeTime: "21:00", isClosed: false },
    ],
  },
};

// Menu categories per restaurant type
const menusByRestaurant: Record<string, {
  id: string;
  name: string;
  description?: string;
  items: {
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
  }[];
}[]> = {
  "la-bella-italia": [
    {
      id: "appetizers",
      name: "Appetizers",
      description: "Start your meal with our delicious starters",
      items: [
        { id: "1", restaurantId: "1", categoryId: "appetizers", name: "Bruschetta al Pomodoro", description: "Grilled bread with fresh tomatoes, basil, and olive oil", price: 12.99, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "VEGAN"], allergens: ["GLUTEN"], prepTime: 10, isAvailable: true, isPopular: true, isNew: false },
        { id: "2", restaurantId: "1", categoryId: "appetizers", name: "Carpaccio di Manzo", description: "Thinly sliced raw beef with arugula and truffle oil", price: 18.99, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["MILK"], prepTime: 10, isAvailable: true, isPopular: false, isNew: true },
        { id: "3", restaurantId: "1", categoryId: "appetizers", name: "Calamari Fritti", description: "Crispy fried calamari with marinara sauce", price: 15.99, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "MOLLUSCS"], prepTime: 15, isAvailable: true, isPopular: true, isNew: false },
      ],
    },
    {
      id: "pasta",
      name: "Pasta",
      description: "Handmade fresh pasta daily",
      items: [
        { id: "4", restaurantId: "1", categoryId: "pasta", name: "Spaghetti Carbonara", description: "Classic Roman pasta with eggs, pecorino, and guanciale", price: 22.99, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "EGGS", "MILK"], prepTime: 20, isAvailable: true, isPopular: true, isNew: false },
        { id: "5", restaurantId: "1", categoryId: "pasta", name: "Penne all'Arrabbiata", description: "Spicy tomato sauce with garlic and chili flakes", price: 18.99, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "VEGAN"], allergens: ["GLUTEN"], spiceLevel: "HOT", prepTime: 18, isAvailable: true, isPopular: false, isNew: false },
        { id: "6", restaurantId: "1", categoryId: "pasta", name: "Fettuccine Alfredo", description: "Creamy butter and parmesan sauce", price: 20.99, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN"], allergens: ["GLUTEN", "MILK"], prepTime: 18, isAvailable: true, isPopular: true, isNew: false },
      ],
    },
    {
      id: "pizza",
      name: "Pizza",
      description: "Wood-fired Neapolitan pizzas",
      items: [
        { id: "7", restaurantId: "1", categoryId: "pizza", name: "Margherita", description: "San Marzano tomatoes, mozzarella, and fresh basil", price: 16.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN"], allergens: ["GLUTEN", "MILK"], prepTime: 15, isAvailable: true, isPopular: true, isNew: false },
        { id: "8", restaurantId: "1", categoryId: "pizza", name: "Diavola", description: "Spicy salami with Calabrian chili", price: 19.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "MILK"], spiceLevel: "MEDIUM", prepTime: 15, isAvailable: true, isPopular: false, isNew: true },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Sweet endings to your meal",
      items: [
        { id: "12", restaurantId: "1", categoryId: "desserts", name: "Tiramisu", description: "Espresso-soaked ladyfingers with mascarpone cream", price: 10.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN"], allergens: ["GLUTEN", "EGGS", "MILK"], prepTime: 5, isAvailable: true, isPopular: true, isNew: false },
        { id: "13", restaurantId: "1", categoryId: "desserts", name: "Panna Cotta", description: "Vanilla cream with berry compote", price: 9.99, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "GLUTEN_FREE"], allergens: ["MILK"], prepTime: 5, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
  ],
  "tokyo-ramen-house": [
    {
      id: "ramen",
      name: "Signature Ramen",
      description: "Our famous 24-hour broth ramen bowls",
      items: [
        { id: "r1", restaurantId: "2", categoryId: "ramen", name: "Tonkotsu Ramen", description: "Rich pork bone broth with chashu, soft egg, and green onions", price: 16.99, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "EGGS", "SOY"], prepTime: 10, isAvailable: true, isPopular: true, isNew: false },
        { id: "r2", restaurantId: "2", categoryId: "ramen", name: "Miso Ramen", description: "Savory miso broth with corn, butter, and bean sprouts", price: 15.99, image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "SOY"], prepTime: 10, isAvailable: true, isPopular: true, isNew: false },
        { id: "r3", restaurantId: "2", categoryId: "ramen", name: "Shoyu Ramen", description: "Light soy sauce broth with bamboo shoots and nori", price: 14.99, image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "SOY", "FISH"], prepTime: 10, isAvailable: true, isPopular: false, isNew: false },
        { id: "r4", restaurantId: "2", categoryId: "ramen", name: "Spicy Tantanmen", description: "Sesame chili broth with minced pork and bok choy", price: 17.99, image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "SOY", "SESAME"], spiceLevel: "HOT", prepTime: 12, isAvailable: true, isPopular: false, isNew: true },
      ],
    },
    {
      id: "sides",
      name: "Sides & Appetizers",
      items: [
        { id: "r5", restaurantId: "2", categoryId: "sides", name: "Gyoza (6 pcs)", description: "Pan-fried pork dumplings", price: 8.99, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "SOY"], prepTime: 8, isAvailable: true, isPopular: true, isNew: false },
        { id: "r6", restaurantId: "2", categoryId: "sides", name: "Karaage", description: "Japanese fried chicken with mayo", price: 9.99, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN", "EGGS", "SOY"], prepTime: 10, isAvailable: true, isPopular: false, isNew: false },
        { id: "r7", restaurantId: "2", categoryId: "sides", name: "Edamame", description: "Steamed soybeans with sea salt", price: 5.99, image: "https://images.unsplash.com/photo-1564894809611-1742fc40ed80?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "VEGAN", "GLUTEN_FREE"], allergens: ["SOY"], prepTime: 5, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
  ],
  "el-mariachi": [
    {
      id: "tacos",
      name: "Tacos",
      description: "Authentic street tacos on corn tortillas",
      items: [
        { id: "m1", restaurantId: "3", categoryId: "tacos", name: "Carne Asada Tacos (3)", description: "Grilled steak with onions, cilantro, and salsa verde", price: 14.99, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], prepTime: 12, isAvailable: true, isPopular: true, isNew: false },
        { id: "m2", restaurantId: "3", categoryId: "tacos", name: "Al Pastor Tacos (3)", description: "Marinated pork with pineapple and onions", price: 13.99, image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], prepTime: 12, isAvailable: true, isPopular: true, isNew: false },
        { id: "m3", restaurantId: "3", categoryId: "tacos", name: "Fish Tacos (3)", description: "Beer-battered fish with chipotle crema", price: 15.99, image: "https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["FISH", "GLUTEN"], prepTime: 15, isAvailable: true, isPopular: false, isNew: true },
      ],
    },
    {
      id: "mains",
      name: "Main Plates",
      items: [
        { id: "m4", restaurantId: "3", categoryId: "mains", name: "Burrito Grande", description: "Large flour tortilla with rice, beans, and your choice of protein", price: 16.99, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN"], prepTime: 15, isAvailable: true, isPopular: true, isNew: false },
        { id: "m5", restaurantId: "3", categoryId: "mains", name: "Enchiladas Verdes", description: "Three corn tortillas filled with chicken in green tomatillo sauce", price: 17.99, image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["MILK"], prepTime: 18, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
    {
      id: "sides",
      name: "Sides & Starters",
      items: [
        { id: "m6", restaurantId: "3", categoryId: "sides", name: "Guacamole & Chips", description: "Fresh made tableside guacamole", price: 11.99, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "VEGAN", "GLUTEN_FREE"], allergens: [], prepTime: 8, isAvailable: true, isPopular: true, isNew: false },
        { id: "m7", restaurantId: "3", categoryId: "sides", name: "Queso Fundido", description: "Melted cheese with chorizo", price: 10.99, image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["MILK"], prepTime: 10, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
  ],
  "spice-garden": [
    {
      id: "starters",
      name: "Starters",
      items: [
        { id: "s1", restaurantId: "4", categoryId: "starters", name: "Samosas (4)", description: "Crispy pastry filled with spiced potatoes and peas", price: 8.99, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "VEGAN"], allergens: ["GLUTEN"], prepTime: 10, isAvailable: true, isPopular: true, isNew: false },
        { id: "s2", restaurantId: "4", categoryId: "starters", name: "Chicken Tikka", description: "Tandoor-grilled marinated chicken pieces", price: 12.99, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], prepTime: 15, isAvailable: true, isPopular: true, isNew: false },
      ],
    },
    {
      id: "curries",
      name: "Curry Dishes",
      description: "Served with basmati rice",
      items: [
        { id: "s3", restaurantId: "4", categoryId: "curries", name: "Butter Chicken", description: "Tender chicken in creamy tomato sauce", price: 18.99, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["MILK"], prepTime: 20, isAvailable: true, isPopular: true, isNew: false },
        { id: "s4", restaurantId: "4", categoryId: "curries", name: "Lamb Rogan Josh", description: "Slow-cooked lamb in aromatic Kashmiri spices", price: 22.99, image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], prepTime: 25, isAvailable: true, isPopular: false, isNew: false },
        { id: "s5", restaurantId: "4", categoryId: "curries", name: "Palak Paneer", description: "Cottage cheese in creamy spinach sauce", price: 16.99, image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "GLUTEN_FREE"], allergens: ["MILK"], prepTime: 18, isAvailable: true, isPopular: true, isNew: false },
        { id: "s6", restaurantId: "4", categoryId: "curries", name: "Chicken Vindaloo", description: "Fiery Goan curry with potatoes", price: 19.99, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], spiceLevel: "HOT", prepTime: 22, isAvailable: true, isPopular: false, isNew: true },
      ],
    },
    {
      id: "breads",
      name: "Breads",
      items: [
        { id: "s7", restaurantId: "4", categoryId: "breads", name: "Garlic Naan", description: "Soft bread with garlic butter", price: 4.99, image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN"], allergens: ["GLUTEN", "MILK"], prepTime: 8, isAvailable: true, isPopular: true, isNew: false },
        { id: "s8", restaurantId: "4", categoryId: "breads", name: "Peshwari Naan", description: "Sweet naan with coconut and raisins", price: 5.99, image: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN"], allergens: ["GLUTEN", "MILK", "NUTS"], prepTime: 8, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
  ],
  "the-french-quarter": [
    {
      id: "starters",
      name: "Les Entrées",
      description: "Classic French starters",
      items: [
        { id: "f1", restaurantId: "5", categoryId: "starters", name: "French Onion Soup", description: "Caramelized onions in rich beef broth with gruyère crouton", price: 14.99, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN"], allergens: ["GLUTEN", "MILK"], prepTime: 12, isAvailable: true, isPopular: true, isNew: false },
        { id: "f2", restaurantId: "5", categoryId: "starters", name: "Escargots de Bourgogne", description: "Snails in garlic herb butter", price: 18.99, image: "https://images.unsplash.com/photo-1608039829572-2f8ff606a4a0?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["MILK", "MOLLUSCS"], prepTime: 15, isAvailable: true, isPopular: false, isNew: false },
        { id: "f3", restaurantId: "5", categoryId: "starters", name: "Foie Gras Terrine", description: "Duck liver terrine with brioche and fig compote", price: 28.99, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["GLUTEN"], prepTime: 10, isAvailable: true, isPopular: false, isNew: true },
      ],
    },
    {
      id: "mains",
      name: "Plats Principaux",
      description: "Main courses",
      items: [
        { id: "f4", restaurantId: "5", categoryId: "mains", name: "Coq au Vin", description: "Braised chicken in Burgundy wine with mushrooms", price: 34.99, image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], prepTime: 30, isAvailable: true, isPopular: true, isNew: false },
        { id: "f5", restaurantId: "5", categoryId: "mains", name: "Boeuf Bourguignon", description: "Beef stew in red wine with vegetables", price: 38.99, image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], prepTime: 35, isAvailable: true, isPopular: true, isNew: false },
        { id: "f6", restaurantId: "5", categoryId: "mains", name: "Duck Confit", description: "Slow-cooked duck leg with roasted potatoes", price: 36.99, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: [], prepTime: 25, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        { id: "f7", restaurantId: "5", categoryId: "desserts", name: "Crème Brûlée", description: "Vanilla custard with caramelized sugar", price: 12.99, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "GLUTEN_FREE"], allergens: ["EGGS", "MILK"], prepTime: 8, isAvailable: true, isPopular: true, isNew: false },
        { id: "f8", restaurantId: "5", categoryId: "desserts", name: "Tarte Tatin", description: "Upside-down caramelized apple tart", price: 14.99, image: "https://images.unsplash.com/photo-1562007908-17c67e878c88?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN"], allergens: ["GLUTEN", "MILK", "EGGS"], prepTime: 10, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
  ],
  "bangkok-street": [
    {
      id: "noodles",
      name: "Noodles & Rice",
      items: [
        { id: "t1", restaurantId: "6", categoryId: "noodles", name: "Pad Thai", description: "Rice noodles with shrimp, tofu, peanuts, and tamarind sauce", price: 14.99, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["SHELLFISH", "PEANUTS", "SOY", "EGGS"], prepTime: 12, isAvailable: true, isPopular: true, isNew: false },
        { id: "t2", restaurantId: "6", categoryId: "noodles", name: "Pad See Ew", description: "Wide rice noodles with Chinese broccoli in sweet soy", price: 13.99, image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["SOY", "EGGS"], prepTime: 12, isAvailable: true, isPopular: false, isNew: false },
        { id: "t3", restaurantId: "6", categoryId: "noodles", name: "Thai Fried Rice", description: "Jasmine rice with egg, vegetables, and your choice of protein", price: 12.99, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop", dietaryTags: [], allergens: ["SOY", "EGGS"], prepTime: 10, isAvailable: true, isPopular: true, isNew: false },
      ],
    },
    {
      id: "curries",
      name: "Thai Curries",
      description: "Served with jasmine rice",
      items: [
        { id: "t4", restaurantId: "6", categoryId: "curries", name: "Green Curry", description: "Creamy coconut curry with Thai basil and vegetables", price: 15.99, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["SHELLFISH"], spiceLevel: "MEDIUM", prepTime: 15, isAvailable: true, isPopular: true, isNew: false },
        { id: "t5", restaurantId: "6", categoryId: "curries", name: "Red Curry", description: "Rich red curry with bamboo shoots and bell peppers", price: 15.99, image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["SHELLFISH"], spiceLevel: "MEDIUM", prepTime: 15, isAvailable: true, isPopular: false, isNew: false },
        { id: "t6", restaurantId: "6", categoryId: "curries", name: "Massaman Curry", description: "Mild curry with potatoes and peanuts", price: 16.99, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["PEANUTS"], prepTime: 18, isAvailable: true, isPopular: false, isNew: true },
      ],
    },
    {
      id: "starters",
      name: "Appetizers",
      items: [
        { id: "t7", restaurantId: "6", categoryId: "starters", name: "Spring Rolls (4)", description: "Crispy vegetable spring rolls with sweet chili sauce", price: 7.99, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", dietaryTags: ["VEGETARIAN", "VEGAN"], allergens: ["GLUTEN"], prepTime: 8, isAvailable: true, isPopular: true, isNew: false },
        { id: "t8", restaurantId: "6", categoryId: "starters", name: "Tom Yum Soup", description: "Hot and sour soup with shrimp and mushrooms", price: 9.99, image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["SHELLFISH"], spiceLevel: "HOT", prepTime: 10, isAvailable: true, isPopular: true, isNew: false },
        { id: "t9", restaurantId: "6", categoryId: "starters", name: "Satay Chicken (4)", description: "Grilled chicken skewers with peanut sauce", price: 10.99, image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400&h=300&fit=crop", dietaryTags: ["GLUTEN_FREE"], allergens: ["PEANUTS"], prepTime: 12, isAvailable: true, isPopular: false, isNew: false },
      ],
    },
  ],
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const restaurant = demoRestaurants[slug];
  const menuCategories = menusByRestaurant[slug] || [];
  
  if (!restaurant) {
    notFound();
  }

  const priceLabel = "$".repeat(restaurant.priceRange);
  const currentDay = new Date().getDay();
  const todayHours = restaurant.openingHours.find(h => h.dayOfWeek === currentDay);
  const isCurrentlyOpen = todayHours && !todayHours.isClosed;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Link href="/restaurants">
            <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="icon" className="bg-white/90 backdrop-blur">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="bg-white/90 backdrop-blur">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Restaurant info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {restaurant.cuisine.map((c) => (
                <Badge key={c} className="bg-white/90 text-foreground">{c}</Badge>
              ))}
              <Badge variant="secondary" className="bg-white/90 text-foreground">
                {priceLabel}
              </Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="text-white/70">({restaurant.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className={isCurrentlyOpen ? "text-green-400" : "text-red-400"}>
                  {isCurrentlyOpen ? "Open" : "Closed"}
                </span>
                {todayHours && !todayHours.isClosed && (
                  <span className="text-white/70">
                    · Until {todayHours.closeTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-muted/50">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="menu" className="mt-0">
                {/* Category navigation */}
                <div className="sticky top-16 z-10 bg-background py-3 mb-6 border-b">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {menuCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`#${category.id}`}
                        className="flex-shrink-0"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          {category.name}
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Menu items */}
                <div className="space-y-12">
                  {menuCategories.map((category) => (
                    <MenuSection
                      key={category.id}
                      category={category}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="info" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">About</h3>
                    <p className="text-muted-foreground">{restaurant.description}</p>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.features.map((feature) => (
                        <Badge key={feature} variant="secondary">{feature}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">Hours</h3>
                    <div className="space-y-2">
                      {restaurant.openingHours.map((hours) => (
                        <div
                          key={hours.dayOfWeek}
                          className={`flex justify-between py-2 px-3 rounded ${
                            hours.dayOfWeek === currentDay
                              ? "bg-wine/10 text-wine"
                              : ""
                          }`}
                        >
                          <span className="font-medium">{dayNames[hours.dayOfWeek]}</span>
                          <span>
                            {hours.isClosed
                              ? "Closed"
                              : `${hours.openTime} - ${hours.closeTime}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="text-center py-12 text-muted-foreground">
                  <p>Reviews coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick info card */}
              <div className="bg-card rounded-xl border p-6 space-y-4">
                <h3 className="font-serif text-lg font-semibold">Restaurant Info</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p>{restaurant.address}</p>
                      <p>{restaurant.city}, {restaurant.state} {restaurant.zipCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${restaurant.phone}`} className="hover:text-wine">
                      {restaurant.phone}
                    </a>
                  </div>
                  
                  {restaurant.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <a 
                        href={restaurant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-wine"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-3">
                  <Link href={`/restaurants/${restaurant.slug}/book`} className="block">
                    <Button className="w-full bg-wine hover:bg-wine/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book a Table
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart sheet */}
    </div>
  );
}
