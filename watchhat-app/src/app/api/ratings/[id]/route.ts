import connectMongoDB from "../../../../../config/mongodb";
import Rating from "@/models/ratingSchema";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  await connectMongoDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid rating ID" }, { status: 400 });
  }

  const rating = await Rating.findById(id).populate('user').populate('movie');
  if (!rating) {
    return NextResponse.json({ error: "Rating not found" }, { status: 404 });
  }

  return NextResponse.json({ rating }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  const { rating, userId, movieId } = await request.json();
  await connectMongoDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid rating ID" }, { status: 400 });
  }

  const updatedRating = await Rating.findByIdAndUpdate(
    id,
    { rating, user: userId, movie: movieId },
    { new: true }
  ).populate('user').populate('movie');

  if (!updatedRating) {
    return NextResponse.json({ error: "Rating not found" }, { status: 404 });
  }

  return NextResponse.json({ rating: updatedRating }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = params;
  await connectMongoDB();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid rating ID" }, { status: 400 });
  }

  const deletedRating = await Rating.findByIdAndDelete(id);
  if (!deletedRating) {
    return NextResponse.json({ error: "Rating not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Rating deleted" }, { status: 200 });
}