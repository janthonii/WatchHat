import Image from "next/image";
import Link from "next/link";
import MovieCard from "./MovieCard";

interface MovieItemProps {
    movieitem: {
        id: number;
        genre_ids?: number[];
        original_language?: string;
        original_title: string;
        overview?: string;
        title: string;
        release_date?: string;
        poster_path?: string;
        cast?: number[];
    };
}

const MovieItem = ({movieitem}:MovieItemProps) => {
    return (
        <div>
            <MovieCard className=" w-full max-w-[300px] flex flex-col items-center min-h-[300px]">
                <Image src={`${movieitem.poster_path}`} alt={`${movieitem.title} Movie Poster`} height={280} width ={175} className="object-cover rounded-md"></Image>
                <h1 className="text-center text-[#142024] font-bold text-lg mt-1 tracking-tighter">{movieitem.title}</h1>
            </MovieCard>
        </div>
    )
}

export default MovieItem;