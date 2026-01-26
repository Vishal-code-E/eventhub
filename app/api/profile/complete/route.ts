/**
 * API Route: Complete User Profile
 * Handles additional user information after Google OAuth
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * POST: Update user profile with additional details
 */
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in first" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { firstName, lastName, phoneNumber, rollNumber } = body;

    // Validate required fields
    if (!firstName || !lastName || !phoneNumber || !rollNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Phone number must be exactly 10 digits" },
        { status: 400 }
      );
    }

    // Validate roll number is not empty
    if (rollNumber.trim().length === 0) {
      return NextResponse.json(
        { error: "Roll number cannot be empty" },
        { status: 400 }
      );
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        phoneNumber: phoneNumber.trim(),
        rollNumber: rollNumber.trim(),
        isProfileComplete: true,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        rollNumber: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile completed successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phoneNumber: updatedUser.phoneNumber,
        rollNumber: updatedUser.rollNumber,
      },
    });

  } catch (error) {
    console.error("Error completing profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
