'use client'
import {useState} from "react";
import Image from "next/image";
import logo from '@/assets/A-HAT_Logo_Big.svg';
import MovieItems from "@/components/MovieItems";
import GetMovieSearch from '@/components/movieApiFunc/movie/GetMovieSearch';
import MatchSearchResult from '@/components/mongoApiFunc/movie/MatchSearchResult';

interface HomeContentProps {
    staffMovies?: any[];
    ugaMovies?: any[];
}

const HomeContent = ({ staffMovies = [], ugaMovies = [] }: HomeContentProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [activeSearch, setActiveSearch] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(searchQuery.trim()) {
            setIsSearching(true);
            setActiveSearch(searchQuery);

            try {
                // Step 1: Get movie IDs from search
                const movieIds: any[] = [];
                await GetMovieSearch(movieIds, searchQuery);

                // Step 2: Get complete movie data for each ID
                const completeMovies: any[] = [];
                await MatchSearchResult(movieIds, completeMovies);

                setSearchResults(completeMovies);
                console.log("Complete search results:", completeMovies);
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

    return(
        <div className="min-h-screen px-4 overflow-x-hidden">
            <div className="flex flex-col items-center space-y-4 py-10">
                <div className="flex items-center justify-center gap-x-5">
                    <Image src={logo} alt="WatchHat logo" height={170} />
                    <div className="text-[50px] text-center bg-gradient-to-r from-darkdeep-green via-transition-green to-creamy-white text-transparent bg-clip-text font-bold">
                        WatchHat
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="relative w-full max-w-xl min-w-[200px]">
                    <input className="w-full bg-white text-md text-[#244855] font-bold border rounded-md pl-3 pr-28 py-2 focus:outline-[#E64833] hover:border-slate-300 shadow-sm focus:shadow" placeholder="Search for Titles" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button className="absolute top-1 right-1 flex items-center rounded bg-[#90AEAD] py-1 px-2.5 border border-transparent text-center text-md font-bold text-[#244855] shadow-sm hover:shadow hover:bg-[90AEAD] active:scale-90" type="submit" disabled={isSearching}>{isSearching ? "Searching..." : "Search"}</button>
                </form>
            </div>
        {!activeSearch && (
            <>
                <div className="w-full">
                    <h2 className="text-xl">Staff Picks</h2>
                    <MovieItems initialMovies={staffMovies} />
                </div>
                <div className="w-full mt-8">
                    <h2 className="text-xl">Showing in April @ UGA</h2>
                    <MovieItems initialMovies={ugaMovies} />
                </div>
            </>
        )}

        {activeSearch && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Search Results for "{activeSearch}"</h2>
                    </div>

                    {isSearching ? (<h3 className="text-center py-8">Loading results...</h3>)
                    : searchResults.length > 0 ? (<MovieItems initialMovies={searchResults} />)
                    : (<h3 className="text-center py-8">No results found...</h3>)
                    }
                </div>
            )}
        </div>
    );
}

export default HomeContent;