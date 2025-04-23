import Image from "next/image";
import Link from "next/link";
import MovieCard from "./MovieCard";
import { MouseEvent } from "react";

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
    onDelete?: () => void;
}

const MovieItem = ({ movieitem, onDelete }: MovieItemProps) => {
    // calculate font size based on title length
    const getTitleSize = (title: string) => {
        const baseSize = 16; // base font size 
        const maxLength = 25; // characters before scaling starts
        const minSize = 12; // binimum font size 
        
        const length = title ? title.length : 0;
        if (length <= maxLength) return `${baseSize}px`;
        
        // Scale down proportionally
        const scaledSize = baseSize * (maxLength / length);
        return `${Math.max(scaledSize, minSize)}px`;
    };

    const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete?.();
    };

    return (
        <div className="relative w-[175px] h-[320px] m-3">
            {/* Delete button */}
            {onDelete && (
                <button
                    onClick={handleDeleteClick}
                    className="absolute z-20 top-1 right-0 translate-5 translate-y-[-5px] text-2xl rounded-full hover:text-red-500 text-bold"
                    aria-label="Remove movie"
                >X
                </button>
            )}
            <Link href={`/movie-info/${movieitem.id}`}>
                <MovieCard>
                    {/* Image (fixed height) */}
                    <div className="relative w-[175px] h-[280px] mb-2 overflow-hidden rounded-md">
                        {movieitem.poster_path && (
                            <Image 
                                src={movieitem.poster_path} 
                                alt={`${movieitem.title} Poster`}
                                fill
                                className="object-cover"
                                sizes="180px"
                            />
                        )}
                    </div>

                    {/* Title (dynamic font sizing) */}
                    <div className="flex-1 flex items-center justify-center px-1">
                        <h1 
                            className="text-[#FBE9D0] font-bold text-center line-clamp-2 break-words"
                            style={{
                                fontSize: getTitleSize(movieitem.title),
                                lineHeight: '1.2'
                            }}
                        >
                            {movieitem.title}
                        </h1>
                    </div>
                </MovieCard>
            </Link>
        </div>
    );
};

export default MovieItem;