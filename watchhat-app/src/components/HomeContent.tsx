'use client'
import {useState} from "react";
import Image from "next/image";
import logo from '@/assets/A-HAT_Logo_Big.svg';
import MovieItems from "@/components/MovieItems";
import GetMovieSearch from '@/components/movieApiFunc/movie/GetMovieSearch';
import MatchSearchResult from '@/components/mongoApiFunc/movie/MatchSearchResult';
import { useRouter } from 'next/navigation';
import MoviesHorizontalScroll from "./MoviesHorizontalScroll";

interface HomeContentProps {
    staffMovies?: any[];
    ugaMovies?: any[];
}

// Define showtimes for UGA movies with location
const UGA_SHOWTIMES: Record<number, Array<{ date: string; time: string; location: string }>> = {
    426063: [
        { date: "4/4/2025", time: "7:00pm", location: "Tate Theater" },
        { date: "4/6/2025", time: "7:00pm", location: "Tate Theater" }
    ],
    809: [
        { date: "4/10/2025", time: "19:30", location: "Myers Quad" }
    ],
    313369: [
        { date: "4/11/2025", time: "7:00pm", location: "Tate Theater" },
        { date: "4/13/2025", time: "7:00pm", location: "Tate Theater" }
    ],
    73723: [
        { date: "4/25/2025", time: "7:00pm", location: "Tate Theater" }
    ],
    10681: [
        { date: "4/27/2025", time: "7:00pm", location: "Tate Theater" }
    ],
};

const HomeContent = ({ staffMovies = [], ugaMovies = [] }: HomeContentProps) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [activeSearch, setActiveSearch] = useState("");

    // Add showtimes to UGA movies
    const ugaMoviesWithShowtimes = ugaMovies.map(movie => ({
        ...movie,
        showtimes: UGA_SHOWTIMES[movie.id] || []
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(searchQuery.trim()) {
            setIsSearching(true);
            setActiveSearch(searchQuery);

            try {
                const movieIds: any[] = [];
                await GetMovieSearch(movieIds, searchQuery);

                const completeMovies: any[] = [];
                await MatchSearchResult(movieIds, completeMovies);

                setSearchResults(completeMovies);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            } finally {setIsSearching(false);}
        } else {
            handleClearSearch();
        }
    };

    const handleClearSearch = () => {
        setActiveSearch("");
        setSearchResults([]);
    };

    const handleMovieClick = (movieId: number) => {
        router.push(`/movie-info/${movieId}`);
    };

    // Optimized UGA movie card renderer
    const renderUgaMovie = (movie: any) => (
        <div 
            key={movie.id}
            className="shadow-md hover:shadow-[#E64833] rounded-lg p-3 bg-[#874F41] flex flex-col w-[200px] h-[390px] cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
        >
            <div className="h-[225px] flex items-center justify-center">
                <Image 
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                    alt={movie.title} 
                    width={150} 
                    height={225}
                    className="rounded-lg max-h-full object-contain"
                />
            </div>
            
            <h3 className="text-center font-bold line-clamp-2 min-h-[44px] flex items-center justify-center">
                {movie.title}
            </h3>
            
            {movie.showtimes?.length > 0 && (
                <div className="text-xs">
                    <div className="font-bold mb-1">Showtimes:</div>
                    {movie.showtimes.map((show: any, index: number) => (
                        <div key={`${movie.id}-showtime-${index}`} className="mb-1 last:mb-0">
                            <div>
                                {new Date(show.date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                })} at {show.time}
                            </div>
                            <div className="text-[#90AEAD] font-medium translate-x-2">@ {show.location}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return(
        <div className="min-h-screen px-4 overflow-x-hidden">
            <div className="flex flex-col items-center space-y-4 py-10">
                <div className="flex flex-row mr-10 items-center justify-evenly gap-x-6">
                    <Image src={logo} alt="WatchHat logo" height={170} />
                    <div className="text-[50px] pt-8 text-center bg-gradient-to-r from-darkdeep-green via-transition-green to-creamy-white text-transparent bg-clip-text font-bold">
                        WatchHat
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="relative w-full max-w-xl min-w-[200px]">
                    <input 
                        className="w-full bg-white text-md text-[#244855] font-bold border rounded-md pl-3 pr-28 py-2 focus:outline-[#E64833] hover:border-slate-300 shadow-sm focus:shadow" 
                        placeholder="Search for Titles" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                        className="absolute top-1 right-1 flex items-center rounded bg-[#90AEAD] py-1 px-2.5 border border-transparent text-center text-md font-bold text-[#244855] shadow-sm hover:shadow hover:bg-[90AEAD] active:scale-90" 
                        type="submit" 
                        disabled={isSearching}
                    >
                        {isSearching ? "Searching..." : "Search"}
                    </button>
                </form>
            </div>

            {!activeSearch && (
                <>
                    <div className="w-full">
                        <h2 className="text-xl mt-8">Showing in April @ UGA</h2>
                        <div className="m-3 p-4 flex flex-wrap gap-7 py-4">
                            <MoviesHorizontalScroll className="translate-x-1">
                                {...ugaMoviesWithShowtimes.map(movie => <div className="px-2">{renderUgaMovie(movie)}</div>)}
                            </MoviesHorizontalScroll>
                        </div>
                    </div>
                    <div className="w-full mt-8">
                        <h2 className="text-xl">Staff Picks</h2>
                        <MovieItems initialMovies={staffMovies} />
                    </div>
                </>
            )}

            {activeSearch && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Search Results for "{activeSearch}"</h2>
                    </div>

                    {isSearching ? (
                        <h3 className="text-center py-8">Loading results...</h3>
                    ) : searchResults.length > 0 ? (
                        <MovieItems initialMovies={searchResults} />
                    ) : (
                        <h3 className="text-center py-8">No results found...</h3>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomeContent;