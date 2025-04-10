import connectMongoDB from "../../../../config/mongodb";
import Genre from "@/models/genreSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {id, name} = await request.json();
    await connectMongoDB();
    await Genre.create({ id, name });
    return NextResponse.json({ message: "Genre added successfully" }, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const genres = await Genre.find();
    return NextResponse.json({ genres }, {status: 200});
}