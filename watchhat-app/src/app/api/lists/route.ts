import connectMongoDB from "../../../../config/mongodb";
import List from "@/models/listsSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { name, participants, movies, shared } = await request.json();
    await connectMongoDB();
    await List.create({ name, participants, movies, shared });
    return NextResponse.json({ message: "List created successfully" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const lists = await List.find();
    return NextResponse.json({ lists }, { status: 200 });
}