import connectMongoDB from "../../../../../config/mongodb";
import List from "@/models/listsSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: number };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    const list = await List.findOne({ listId: id });
    return NextResponse.json({ list }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { name, participants, movies } = await request.json();
    await connectMongoDB();
    await List.findOneAndUpdate(
        { listId: id },
        { name, participants, movies },
        { new: true }
    );
    return NextResponse.json({ message: "List updated successfully" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    await List.findOneAndDelete({ listId: id });
    return NextResponse.json({ message: "List deleted successfully" }, { status: 200 });
}