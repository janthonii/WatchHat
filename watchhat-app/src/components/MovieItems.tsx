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
        <div className="px-4 py-6">
            <div className="container-xl m-auto px-4 py-6">
                {
                    movies.length ===0 ? ( <p>No movies listed...</p>) :
                    (<div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {movies.map((movie, k) => (<MovieItem movieitem={movie} key={movie.id} />))}
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}