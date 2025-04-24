'use client'
import Link from "next/link";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import MoviesHorizontalScroll from "./MoviesHorizontalScroll";
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

export default function MovieItems({ initialMovies = [], listId}: MovieItemsProps) {
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
            await RemoveListMovie(listId, movieId); // API call to delete movie from list
            setMovies(prev => prev.filter(m => m.id !== movieId));
        } catch (err) {
            console.error("Error deleting movie:", err);
        }
    };

    return (
        <div className="">
            <div className="container-xl m-auto px-4 py-6">
                {
                    movies.length ===0 ? ( <p>No movies listed...</p>) :
                    (<div>
                        <MoviesHorizontalScroll>
                        {movies.map((movie) => (
                            <div key={movie.id} className="flex-shrink-0 px-2">
                                <MovieItem movieitem={movie} />
                            </div>
                        ))}
                        </MoviesHorizontalScroll>
                    </div>)
                }
            </div>
        </div>
    )
}