import connectMongoDB from "../../../../../config/mongodb";
import List from "@/models/listsSchema";
import { NextResponse, NextRequest } from "next/server";
import { Types, ObjectId } from "mongoose";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } =  await params;
  await connectMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid list ID" }, { status: 400 });
  }

  const list = await List.findById(id);
  if (!list) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }
  return NextResponse.json({ list }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const { name, participants, movies } = await request.json();
  await connectMongoDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid list ID" }, { status: 400 });
  }

  const updatedList = await List.findByIdAndUpdate(
    id,
    { name, participants, movies },
    { new: true }
  );

  if (!updatedList) {
    return NextResponse.json({ error: "List not found" }, { status: 404 });
  }

  return NextResponse.json({ list: updatedList }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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