'use client'
import Link from "next/link";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";

interface Movie {
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

interface MovieItemsProps {
    initialMovies?: Movie[];
}

export default function MovieItems({ initialMovies = [] }: MovieItemsProps) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);

    useEffect(() => {
        if (initialMovies.length === 0) {
            const fetchMovies = async () => {
            try {const response = await fetch('api/movies');
                if(!response.ok) {
                    throw new Error('Response Not OK');
                }
                const data = await response.json();
                setMovies(data.movies)
            } catch (error) {
                console.error('Error fetching movies: ', error)
            }
        };
        fetchMovies();
        }
    }, [initialMovies]);

    return (
        <div className="w-full">
            {movies.length === 0 ? (
                <p className="text-centered">No movies listed...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <MovieItem key={movie.id} movieitem={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}