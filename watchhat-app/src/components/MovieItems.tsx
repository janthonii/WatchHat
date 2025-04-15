'use client'
import Link from "next/link";
import {useState, useEffect} from 'react';
import MovieItem from "./MovieItem";
import MoviesHorizontalScroll from "./MoviesHorizontalScroll"; 

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

export default function MovieItems() {
    const[movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
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
    }, []);

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