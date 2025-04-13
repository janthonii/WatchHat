import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();
    await connectMongoDB();
    await User.create({ username, password, friends: [] });
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
}