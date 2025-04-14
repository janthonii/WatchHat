'use client'
import MovieCard from "@/components/MovieCard";
import {useState} from "react";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for: ", searchQuery);
    };

    return(
        <div className="w-screen h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-xl min-w-[200px]">
                <div className="relative w-full">
                    <input className="w-full bg-transparent bg-white text-md text-[#244855] font-bold border rounded-md pl-3 pr-28 py-2 focus:outline-[#E64833] hover:border-slate-300 shadow-sm focus:shadow" placeholder="Search for Titles" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button className="absolute top-1 right-1 flex items-center rounded bg-[#90AEAD] py-1 px-2.5 border border-transparent text-center text-md font-bold text-[#244855] shadow-sm hover:shadow hover:bg-[90AEAD] active:scale-90" type="button" onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div>
            <MovieCard>for movie cards</MovieCard>
            </div>
        </div>
    );
}

export default Home;