import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.message.deleteMany();
  await prisma.review.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.table.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.loyaltyPoint.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleaned existing data");

  // Create demo users
  const hashedPassword = await bcrypt.hash("demo123", 12);

  const customer = await prisma.user.create({
    data: {
      name: "Demo Customer",
      email: "demo@customer.com",
      password: hashedPassword,
      role: "CUSTOMER",
      loyaltyTier: "SILVER",
      loyaltyPoints: 1250,
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "John Manager",
      email: "demo@manager.com",
      password: hashedPassword,
      role: "MANAGER",
    },
  });

  const waiter = await prisma.user.create({
    data: {
      name: "Sarah Mitchell",
      email: "waiter@demo.com",
      password: hashedPassword,
      role: "WAITER",
    },
  });

  const chef = await prisma.user.create({
    data: {
      name: "Mike Rodriguez",
      email: "chef@demo.com",
      password: hashedPassword,
      role: "CHEF",
    },
  });

  const receptionist = await prisma.user.create({
    data: {
      name: "Emily Chen",
      email: "reception@demo.com",
      password: hashedPassword,
      role: "RECEPTIONIST",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@demo.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("👥 Created demo users");

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "La Bella Italia",
      slug: "la-bella-italia",
      description:
        "Experience the finest Italian cuisine in an elegant setting. Our chefs create authentic dishes using traditional recipes passed down through generations, featuring handmade pasta, wood-fired pizzas, and an extensive wine selection from Italy's best vineyards.",
      cuisine: "Italian,Mediterranean",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "+1 (555) 123-4567",
      email: "info@labellaitalia.com",
      website: "https://labellaitalia.com",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 324,
      priceRange: 3,
      features: "Outdoor Seating,Private Dining,Wine Bar,Wheelchair Accessible,Live Music",
      hours: JSON.stringify({
        monday: { open: "11:00", close: "22:00" },
        tuesday: { open: "11:00", close: "22:00" },
        wednesday: { open: "11:00", close: "22:00" },
        thursday: { open: "11:00", close: "23:00" },
        friday: { open: "11:00", close: "23:00" },
        saturday: { open: "12:00", close: "23:00" },
        sunday: { open: "12:00", close: "22:00" },
      }),
    },
  });

  console.log("🏪 Created restaurant");

  // Update users with restaurant
  await prisma.user.updateMany({
    where: { role: { not: "CUSTOMER" } },
    data: { restaurantId: restaurant.id },
  });

  // Create staff records
  await prisma.staff.createMany({
    data: [
      {
        userId: manager.id,
        restaurantId: restaurant.id,
        role: "MANAGER",
        bio: "Restaurant Manager with 10 years of hospitality experience",
        languages: "English,Italian",
        specialties: "Wine Selection,Customer Service",
        yearsExperience: 10,
        rating: 4.9,
        reviewCount: 156,
      },
      {
        userId: waiter.id,
        restaurantId: restaurant.id,
        role: "WAITER",
        bio: "Passionate about providing excellent dining experiences",
        languages: "English,Spanish",
        specialties: "Wine Pairing,Fine Dining Service",
        yearsExperience: 3,
        rating: 4.8,
        reviewCount: 89,
      },
      {
        userId: chef.id,
        restaurantId: restaurant.id,
        role: "CHEF",
        bio: "Executive Chef trained in traditional Italian cooking",
        languages: "English,Italian",
        specialties: "Pasta,Seafood,Traditional Italian",
        yearsExperience: 8,
        rating: 4.9,
        reviewCount: 0,
      },
      {
        userId: receptionist.id,
        restaurantId: restaurant.id,
        role: "RECEPTIONIST",
        bio: "Ensuring every guest feels welcome from the moment they arrive",
        languages: "English,Mandarin",
        specialties: "Guest Relations,Event Planning",
        yearsExperience: 4,
        rating: 4.9,
        reviewCount: 67,
      },
      {
        userId: admin.id,
        restaurantId: restaurant.id,
        role: "ADMIN",
        bio: "System administrator",
        languages: "English",
        specialties: "Operations",
        yearsExperience: 5,
        rating: 0,
        reviewCount: 0,
      },
    ],
  });

  console.log("👔 Created staff records");

  // Create menu categories
  const appetizers = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      name: "Appetizers",
      description: "Start your meal with our delicious starters",
      sortOrder: 1,
    },
  });

  const pasta = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      name: "Pasta",
      description: "Handmade fresh pasta daily",
      sortOrder: 2,
    },
  });

  const pizza = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      name: "Pizza",
      description: "Wood-fired Neapolitan pizzas",
      sortOrder: 3,
    },
  });

  const mains = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      name: "Main Courses",
      description: "Signature Italian entrees",
      sortOrder: 4,
    },
  });

  const desserts = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      name: "Desserts",
      description: "Sweet endings to your meal",
      sortOrder: 5,
    },
  });

  console.log("📋 Created menu categories");

  // Create menu items
  await prisma.menuItem.createMany({
    data: [
      // Appetizers
      {
        categoryId: appetizers.id,
        name: "Bruschetta al Pomodoro",
        description: "Grilled bread rubbed with garlic, topped with fresh tomatoes, basil, and extra virgin olive oil",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop",
        dietaryTags: "VEGETARIAN,VEGAN",
        allergens: "GLUTEN",
        prepTime: 10,
        isPopular: true,
      },
      {
        categoryId: appetizers.id,
        name: "Carpaccio di Manzo",
        description: "Thinly sliced raw beef with arugula, parmesan shavings, and truffle oil",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        dietaryTags: "GLUTEN_FREE",
        allergens: "MILK",
        prepTime: 10,
        isNew: true,
      },
      {
        categoryId: appetizers.id,
        name: "Calamari Fritti",
        description: "Crispy fried calamari served with marinara sauce and lemon",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
        dietaryTags: "",
        allergens: "GLUTEN,MOLLUSCS",
        prepTime: 15,
        isPopular: true,
      },
      // Pasta
      {
        categoryId: pasta.id,
        name: "Spaghetti Carbonara",
        description: "Classic Roman pasta with eggs, pecorino cheese, guanciale, and black pepper",
        price: 22.99,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
        dietaryTags: "",
        allergens: "GLUTEN,EGGS,MILK",
        prepTime: 20,
        isPopular: true,
      },
      {
        categoryId: pasta.id,
        name: "Penne all'Arrabbiata",
        description: "Penne pasta in spicy tomato sauce with garlic and red chili flakes",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
        dietaryTags: "VEGETARIAN,VEGAN",
        allergens: "GLUTEN",
        spiceLevel: "HOT",
        prepTime: 18,
      },
      {
        categoryId: pasta.id,
        name: "Fettuccine Alfredo",
        description: "Creamy fettuccine with butter, parmesan, and a touch of nutmeg",
        price: 20.99,
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop",
        dietaryTags: "VEGETARIAN",
        allergens: "GLUTEN,MILK",
        prepTime: 18,
        isPopular: true,
      },
      // Pizza
      {
        categoryId: pizza.id,
        name: "Margherita",
        description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil",
        price: 16.99,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
        dietaryTags: "VEGETARIAN",
        allergens: "GLUTEN,MILK",
        prepTime: 15,
        isPopular: true,
      },
      {
        categoryId: pizza.id,
        name: "Diavola",
        description: "Spicy salami, tomato sauce, mozzarella, and Calabrian chili",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
        dietaryTags: "",
        allergens: "GLUTEN,MILK",
        spiceLevel: "MEDIUM",
        prepTime: 15,
        isNew: true,
      },
      // Mains
      {
        categoryId: mains.id,
        name: "Osso Buco",
        description: "Braised veal shanks with gremolata, served with saffron risotto",
        price: 38.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        dietaryTags: "GLUTEN_FREE",
        allergens: "MILK",
        prepTime: 30,
        isPopular: true,
      },
      {
        categoryId: mains.id,
        name: "Branzino al Forno",
        description: "Whole roasted Mediterranean sea bass with lemon, capers, and herbs",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
        dietaryTags: "GLUTEN_FREE",
        allergens: "FISH",
        prepTime: 25,
      },
      // Desserts
      {
        categoryId: desserts.id,
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
        dietaryTags: "VEGETARIAN",
        allergens: "GLUTEN,EGGS,MILK",
        prepTime: 5,
        isPopular: true,
      },
      {
        categoryId: desserts.id,
        name: "Panna Cotta",
        description: "Silky vanilla cream with mixed berry compote",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
        dietaryTags: "VEGETARIAN,GLUTEN_FREE",
        allergens: "MILK",
        prepTime: 5,
      },
    ],
  });

  console.log("🍝 Created menu items");

  // Create tables
  await prisma.table.createMany({
    data: [
      { restaurantId: restaurant.id, number: "1", name: "Window Table 1", type: "STANDARD", capacity: 2, positionX: 50, positionY: 50 },
      { restaurantId: restaurant.id, number: "2", name: "Window Table 2", type: "STANDARD", capacity: 2, positionX: 130, positionY: 50 },
      { restaurantId: restaurant.id, number: "3", name: "Center Table 1", type: "STANDARD", capacity: 4, positionX: 90, positionY: 150 },
      { restaurantId: restaurant.id, number: "4", name: "Center Table 2", type: "STANDARD", capacity: 4, positionX: 200, positionY: 150 },
      { restaurantId: restaurant.id, number: "5", name: "Booth 1", type: "BOOTH", capacity: 6, positionX: 50, positionY: 260 },
      { restaurantId: restaurant.id, number: "6", name: "Booth 2", type: "BOOTH", capacity: 6, positionX: 180, positionY: 260 },
      { restaurantId: restaurant.id, number: "7", name: "Private Room", type: "PRIVATE", capacity: 8, positionX: 320, positionY: 100 },
      { restaurantId: restaurant.id, number: "8", name: "Bar Seating", type: "BAR", capacity: 4, positionX: 320, positionY: 250 },
    ],
  });

  console.log("🪑 Created tables");

  console.log("✅ Database seeded successfully!");
  console.log("\n📧 Demo Accounts:");
  console.log("   Customer:   demo@customer.com / demo123");
  console.log("   Manager:    demo@manager.com / demo123");
  console.log("   Waiter:     waiter@demo.com / demo123");
  console.log("   Chef:       chef@demo.com / demo123");
  console.log("   Reception:  reception@demo.com / demo123");
  console.log("   Admin:      admin@demo.com / demo123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
