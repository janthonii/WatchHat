'use client'
import {useState} from "react";
import Image from "next/image";
import logo from '@/assets/A-HAT_Logo_Big.svg';
import MovieItems from "@/components/MovieItems";

interface HomeContentProps {
    staffMovies?: any[];
    ugaMovies?: any[];
}

const HomeContent = ({ staffMovies = [], ugaMovies = [] }: HomeContentProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for: ", searchQuery);
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

            <div className="relative w-full max-w-xl min-w-[200px]">
                <input className="w-full bg-white text-md text-[#244855] font-bold border rounded-md pl-3 pr-28 py-2 focus:outline-[#E64833] hover:border-slate-300 shadow-sm focus:shadow" placeholder="Search for Titles" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button className="absolute top-1 right-1 flex items-center rounded bg-[#90AEAD] py-1 px-2.5 border border-transparent text-center text-md font-bold text-[#244855] shadow-sm hover:shadow hover:bg-[90AEAD] active:scale-90" type="button" onClick={handleSearch}>Search</button>
            </div>
        </div>

            <div className="w-full">
                <h1 className="text-xl">Staff Picks</h1>
                <MovieItems initialMovies={staffMovies} />
            </div>

            <div className="w-full mt-8">
                <h1 className="text-xl">Showing in April @ UGA</h1>
                <MovieItems initialMovies={ugaMovies} />
            </div>
        </div>
    );
}

export default HomeContent;