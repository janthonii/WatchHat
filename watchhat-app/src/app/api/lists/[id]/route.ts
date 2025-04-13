import connectMongoDB from "../../../../../config/mongodb";
import List from "@/models/listsSchema";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  await connectMongoDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid list ID" }, { status: 400 });
  }

  const list = await List.findById(id).populate('participants').populate('movies');
  if (!list) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json({ list }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  const { name, participants, movies } = await request.json();
  await connectMongoDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid list ID" }, { status: 400 });
  }

  const updatedList = await List.findByIdAndUpdate(
    id,
    { name, participants, movies },
    { new: true }
  ).populate('participants').populate('movies');

  if (!updatedList) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json({ list: updatedList }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  await connectMongoDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid list ID" }, { status: 400 });
  }

  const deletedList = await List.findByIdAndDelete(id);
  if (!deletedList) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "List deleted" }, { status: 200 });
}