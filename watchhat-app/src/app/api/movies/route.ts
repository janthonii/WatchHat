import connectMongoDB from "../../../../config/mongodb";
import Movie from "@/models/movieSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const posterUrl = `https://image.tmdb.org/t/p/original`;
    let { genre_ids, id, original_language, original_title, overview, poster_path, release_date, title
    } = await request.json();
    await connectMongoDB();
    poster_path = posterUrl.concat(poster_path);
    await Movie.create({ genre_ids, id, original_language, original_title, overview, poster_path, release_date, title});
    return NextResponse.json({ message: "Movie added successfully" }, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const movies = await Movie.find();
    return NextResponse.json({ movies }, {status: 200});
}