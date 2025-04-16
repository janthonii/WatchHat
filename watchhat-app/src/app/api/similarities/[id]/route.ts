import connectMongoDB from "../../../../../config/mongodb";
import Similarity from "@/models/similaritySchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { idOne: number, idTwo: number};
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { idOne, idTwo } = await params;
    await connectMongoDB();
    const possibilityOne = await Similarity.findOne({ movieOne: idOne, movieTwo: idTwo });
    const possibilityTwo = await Similarity.findOne({ movieOne: idTwo, movieTwo: idOne});
    let similarity = {};
    if (possibilityOne) similarity = possibilityOne;
    if (possibilityTwo) similarity = possibilityTwo;
    return NextResponse.json({ similarity }, {status: 200});
}