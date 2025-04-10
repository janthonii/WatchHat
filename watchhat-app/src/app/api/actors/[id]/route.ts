import connectMongoDB from "../../../../../config/mongodb";
import Actor from "@/models/actorSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: number};
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const actor = await Actor.findOne({ id: id });
    return NextResponse.json({ actor }, {status: 200});
}