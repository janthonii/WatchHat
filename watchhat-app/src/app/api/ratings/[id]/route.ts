import connectMongoDB from "../../../../../config/mongodb";
import Rating from "@/models/ratingSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: number };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    const rating = await Rating.findOne({ ratingId: id });
    return NextResponse.json({ rating }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { rating, userId, movieId } = await request.json();
    await connectMongoDB();
    await Rating.findOneAndUpdate(
        { ratingId: id },
        { rating, userId, movieId },
        { new: true }
    );
    return NextResponse.json({ message: "Rating updated successfully" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    await Rating.findOneAndDelete({ ratingId: id });
    return NextResponse.json({ message: "Rating deleted successfully" }, { status: 200 });
}