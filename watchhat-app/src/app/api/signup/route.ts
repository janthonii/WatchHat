import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const { username, password } = await request.json();

    // Input Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (username.length < 5) {
      return NextResponse.json(
        { error: "Username must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        { error: "Username can only contain letters, numbers and underscores" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    await User.create({
      username,
      password: hashedPassword,
      friends: []
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Signup error:", errorMessage);
    return NextResponse.json(
      { error: "Internal server error" }, // Generic message for security
      { status: 500 }
    );
  }
};