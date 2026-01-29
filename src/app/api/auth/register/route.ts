import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  accountType: z.enum(["customer", "restaurant"]),
  restaurantName: z.string().optional(),
  restaurantAddress: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);
    
    // Determine user role based on account type
    const role = validatedData.accountType === "restaurant" ? "ADMIN" : "CUSTOMER";
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        password: hashedPassword,
        role: role,
      },
    });
    
    // If restaurant account, create the restaurant
    if (validatedData.accountType === "restaurant" && validatedData.restaurantName) {
      const slug = validatedData.restaurantName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      
      // Check for unique slug
      let uniqueSlug = slug;
      let counter = 1;
      while (await prisma.restaurant.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }
      
      const restaurant = await prisma.restaurant.create({
        data: {
          name: validatedData.restaurantName,
          slug: uniqueSlug,
          description: `Welcome to ${validatedData.restaurantName}`,
          address: validatedData.restaurantAddress || "",
          city: "",
          state: "",
          zipCode: "",
          phone: validatedData.phone || "",
          email: validatedData.email,
          cuisine: [],
          features: [],
          // Create default opening hours
          openingHours: {
            create: [
              { dayOfWeek: 0, openTime: "10:00", closeTime: "22:00", isClosed: false },
              { dayOfWeek: 1, openTime: "10:00", closeTime: "22:00", isClosed: false },
              { dayOfWeek: 2, openTime: "10:00", closeTime: "22:00", isClosed: false },
              { dayOfWeek: 3, openTime: "10:00", closeTime: "22:00", isClosed: false },
              { dayOfWeek: 4, openTime: "10:00", closeTime: "22:00", isClosed: false },
              { dayOfWeek: 5, openTime: "10:00", closeTime: "23:00", isClosed: false },
              { dayOfWeek: 6, openTime: "10:00", closeTime: "23:00", isClosed: false },
            ],
          },
        },
      });
      
      // Create staff record for the admin
      await prisma.staff.create({
        data: {
          userId: user.id,
          restaurantId: restaurant.id,
          bio: "Restaurant Owner",
          languages: ["English"],
          specialties: [],
          yearsExperience: 0,
        },
      });
    }
    
    return NextResponse.json(
      { 
        message: "Account created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
