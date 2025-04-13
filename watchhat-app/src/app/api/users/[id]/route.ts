import connectMongoDB from "../../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: number };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ userId: id });
    return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { username, password, friends } = await request.json();
    await connectMongoDB();
    await User.findOneAndUpdate(
        { userId: id },
        { username, password, friends },
        { new: true }
    );
    return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    await User.findOneAndDelete({ userId: id });
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}