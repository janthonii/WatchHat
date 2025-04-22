// Handles new user registration
// Returns a list of all users
import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    const { 
        username, 
        password,
        recommended,
        rated,
        compatibility 
    } = await request.json();
    
    await connectMongoDB();
    
    const userData: {
        username: string;
        password: string;
        friends: mongoose.Types.ObjectId[];
        recommended?: string;
        rated?: string;
        compatibility?: string;
    } = {
        username,
        password,
        friends: []
    };

    // only add the fields if they were provided
    if (recommended !== undefined) userData.recommended = recommended;
    if (rated !== undefined) userData.rated = rated;
    if (compatibility !== undefined) userData.compatibility = compatibility;

    await User.create(userData);
    
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
}