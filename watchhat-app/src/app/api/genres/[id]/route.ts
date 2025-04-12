import connectMongoDB from "../../../../../config/mongodb";
import Genre from "@/models/genreSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: number};
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const genre = await Genre.findOne({ id: id });
    return NextResponse.json({ genre }, {status: 200});
}