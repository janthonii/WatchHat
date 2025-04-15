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

const MovieItem = ({ movieitem }: MovieItemProps) => {
    // Calculate font size based on title length
    const getTitleSize = (title: string) => {
        const baseSize = 16; // Base font size (px)
        const maxLength = 25; // Characters before scaling starts
        const minSize = 12; // Minimum font size (px)
        
        const length = title.length;
        if (length <= maxLength) return `${baseSize}px`;
        
        // Scale down proportionally
        const scaledSize = baseSize * (maxLength / length);
        return `${Math.max(scaledSize, minSize)}px`;
    };

    return (
        <MovieCard>
            {/* Image (fixed height) */}
            <div className="relative w-full w-[175px] h-[280px] mb-2 overflow-hidden rounded-md">
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

            {/* Title (dynamic font size) */}
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
    );
};

export default MovieItem;