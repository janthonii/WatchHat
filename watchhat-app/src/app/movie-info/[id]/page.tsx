import RetrieveMovie from "@/components/mongoApiFunc/movie/RetrieveMovie";
import GetGenreNameMovie from "@/components/mongoApiFunc/genre/GetGenreNameMovie";
import Image from "next/image";
import MovieInfoCards from "@/components/MovieInfoCard";
import MovieActions from "@/components/MovieActions";
import connectMongoDB from "../../../../config/mongodb";
import List from "@/models/listsSchema";

interface MovieDetails {
    id: number;
    genre_ids?: number[];
    original_language?: string;
    original_title: string;
    overview?: string;
    title: string;
    release_date?: string;
    poster_path?: string;
    cast?: number[];
}

export default async function MovieInfo({ params }: { params: { id: string } }) {
    const movieId = parseInt(params.id);
    const movieData: MovieDetails[] = [];
    const genreNames: string[] = [];

    await connectMongoDB();

    const lists: any[] = await List.find({}).lean();


    await RetrieveMovie(Number(movieId), movieData);
    if (movieData[0]?.genre_ids?.length) {
        await GetGenreNameMovie(movieId.toString(), genreNames);
    }

    if (movieData.length === 0 || !movieData[0]) {
        return (
            <div className="flex items-normal justify-center min-h-125 p-8">
                <div className="text-center bg-[#665C5C] min-w-225 rounded-lg p-6">
                    <h1 className="text-2xl font-bold">Movie Not Found</h1>
                    <p className="mt-2">No movie found with ID: {movieId}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-100 p-8">
            <MovieInfoCards movie={movieData[0]} genres={genreNames}>

            <MovieActions movieId={Number(movieId)} initialLists={JSON.parse(JSON.stringify(lists))} />
            </MovieInfoCards>
        </div>
    );
}