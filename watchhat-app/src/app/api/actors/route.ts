import connectMongoDB from "../../../../config/mongodb";
import Actor from "@/models/actorSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const posterUrl = `https://image.tmdb.org/t/p/original`;
    let { name, original_name, profile_path, id, popularity} = await request.json();
    await connectMongoDB();
    profile_path = posterUrl.concat(profile_path);
    await Actor.create({ name, original_name, profile_path, id, popularity});
    return NextResponse.json({ message: "Actor added successfully" }, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const actors = await Actor.find();
    return NextResponse.json({ actors }, {status: 200});
}