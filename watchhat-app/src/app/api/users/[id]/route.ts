// Existing user CRUD operations
import connectMongoDB from "../../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

interface RouteParams {
    params: { id: string };
}

interface UpdateData {
    username?: string;
    password?: string;
    friends?: Types.ObjectId[];
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    
    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { 
        username, 
        password  
    } = await request.json();
    
    await connectMongoDB();
  
    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }
  
    try {
        const updateData: UpdateData = {};
        
        if (username) updateData.username = username;
        
        // Only hash password if it's being updated
        if (password) {
            updateData.password = await bcrypt.hash(password, 12);
        }
  
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("duplicate key error")) {
                return NextResponse.json(
                    { error: "Username already exists" },
                    { status: 409 }
                );
            }
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}