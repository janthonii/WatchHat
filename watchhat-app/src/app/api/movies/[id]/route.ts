import connectMongoDB from "../../../../../config/mongodb";
import Movie from "@/models/movieSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: number};
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const movie = await Movie.findOne({ id: id });
    return NextResponse.json({ movie }, {status: 200});
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    let { id } = await params;
    let { actorId } = await request.json();
    //console.log('Inside put');
    //console.log(id);
    //console.log(actorId);
    await connectMongoDB();
    const movie = await Movie.findOne({ id: id });
    const objectId = movie?._id;
    await Movie.findByIdAndUpdate(objectId, { $addToSet: { cast: actorId} });
    return NextResponse.json({ message: "Item updated"}, { status: 200});
}