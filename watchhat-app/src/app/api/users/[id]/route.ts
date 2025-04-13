import connectMongoDB from "../../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose"; // For ObjectId validation

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

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, password, friends },
        { new: true } // Returns the updated document
    );
    return NextResponse.json({ user: updatedUser }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();

    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
}