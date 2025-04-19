import connectMongoDB from "../../../../../config/mongodb";
import Similarity from "@/models/similaritySchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: number};
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const possibilityOne = await Similarity.find({ movieOne: id });
    const possibilityTwo = await Similarity.find({ movieTwo: id});
    const similarity = [...possibilityOne, ...possibilityTwo];
    return NextResponse.json({ similarity }, {status: 200});
}