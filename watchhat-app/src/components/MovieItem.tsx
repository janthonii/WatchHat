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
        <MovieCard>
            <div className="flex items-center justify-center text-xl font-bold">
                <Image src={`${movieitem.poster_path}`} alt={`${movieitem.title} Movie Poster`} height={175} width ={60}></Image>
                <h1 style={{color: "#142024"}}>{movieitem.title}</h1>
            </div>
        </MovieCard>
    )
}

export default MovieItem;