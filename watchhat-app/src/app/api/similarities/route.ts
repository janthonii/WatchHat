import connectMongoDB from "../../../../config/mongodb";
import Similarity from "@/models/similaritySchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {score, movieOne, movieTwo} = await request.json();
    await connectMongoDB();
    await Similarity.create({ score, movieOne, movieTwo});
    return NextResponse.json({ message: "Similarity added successfully" }, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const similarities = await Similarity.find();
    return NextResponse.json({ similarities }, {status: 200});
}