import connectMongoDB from "../../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose"; // For ObjectId validation
import bcrypt from "bcryptjs";

interface RouteParams {
    params: { id: string }; // Now expects MongoDB _id (string/ObjectId)
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const user = await User.findById(id); // Use findById instead of findOne
    return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { username, password, friends } = await request.json();
    
    await connectMongoDB();
  
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }
  
    try {
      const updateData: any = { username, friends };
      
      // Only hash password if it's being updated
      if (password) {
        updateData.password = await bcrypt.hash(password, 12);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      
      return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (e) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

