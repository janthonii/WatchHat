'use client'
import Link from "next/link";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import RemoveListMovie from "./mongoApiFunc/list/RemoveListMovie";


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
    listId?: string;
}

export default function MovieItems({ initialMovies = [], listId }: MovieItemsProps) {
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

    const handleDeleteMovie = async (movieId: number) => {
        if (!listId) return;
        try {
            await RemoveListMovie(listId, movieId);
            setMovies(prev => prev.filter(movie => movie.id !== movieId));
        } catch (err) {
            console.error("Failed to delete movie:", err);
        }
    };

    return (
        <div className="w-full">
            {movies.length === 0 ? (
                <p className="text-centered">No movies added yet...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <MovieItem key={movie.id} movieitem={movie} onDelete={listId ? () => handleDeleteMovie(movie.id) : undefined}/>
                    ))}
                </div>
            )}
        </div>
    );
}