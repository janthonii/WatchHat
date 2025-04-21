import { NextResponse } from 'next/server';
import RetrieveMovieSim from '@/components/mongoApiFunc/movie/RetrieveMovieSim';

export async function GET() {
  try {
    const movieData: any[] = [];
    await RetrieveMovieSim(movieData);
    return NextResponse.json(movieData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}