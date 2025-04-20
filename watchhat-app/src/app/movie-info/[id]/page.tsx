import RetrieveMovie from "@/components/mongoApiFunc/movie/RetrieveMovie";
import GetGenreNameMovie from "@/components/mongoApiFunc/genre/GetGenreNameMovie";
import Image from "next/image";
import MovieInfoCards from "@/components/MovieInfoCard";
import MovieActions from "@/components/MovieActions";
import GetActorData from "@/components/movieApiFunc/actor/GetActorData";
import RetrieveActor from "@/components/mongoApiFunc/actor/RetrieveActor";


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

interface ActorDetails {
    name: string;
    original_name: string;
    profile_path?: string;
    id: number;
    popularity: number;
}

export default async function MovieInfo({ params }: { params: { id: string } }) {
    const movieId = parseInt(params.id);
    const movieData: MovieDetails[] = [];
    const genreNames: string[] = [];
    const actorData: ActorDetails[] = [];

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

    await GetActorData(movieId.toString());
    if (movieData[0]?.cast?.length) {
        const actorIds = movieData[0].cast.slice(0, 5);
        for (const actorId of actorIds) {
            await RetrieveActor(actorId, actorData);
        }
    }

    const actorNames = actorData.map(actor => actor.name).filter(name => name);

    return (
        <div className="min-h-100 p-8">
            <MovieInfoCards movie={movieData[0]} genres={genreNames} actors={actorNames}>

            <MovieActions movieId={Number(movieId)} />
            </MovieInfoCards>
        </div>
    );
}