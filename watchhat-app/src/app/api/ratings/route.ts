import connectMongoDB from "../../../../config/mongodb";
import Rating from "@/models/ratingSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { rating, userId, movieId } = await request.json();
    await connectMongoDB();
    await Rating.create({ rating, userId, movieId });
    return NextResponse.json({ message: "Rating added successfully" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const ratings = await Rating.find();
    return NextResponse.json({ ratings }, { status: 200 });
}