'use client'
import {useState} from "react";
import Image from "next/image";
import logo from '@/assets/A-HAT_Logo_Big.svg';
import MovieItems from "@/components/MovieItems";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for: ", searchQuery);
    };

    return(
        <div className="w-screen h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-xl min-w-[200px]">

                <div className="grid grid-cols-2 justify-center items-center m-5">
                    <Image src={logo} alt="WatchHat logo" height={170} />
                    <div className="pt-10 wrap-break-word text-[50px] bg-gradient-to-r from-darkdeep-green via-transition-green to-creamy-white text-transparent bg-clip-text font-bold">
                                WatchHat
                    </div>
                </div>

                <div className="relative w-full">
                    <input className="w-full bg-transparent bg-white text-md text-[#244855] font-bold border rounded-md pl-3 pr-28 py-2 focus:outline-[#E64833] hover:border-slate-300 shadow-sm focus:shadow" placeholder="Search for Titles" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button className="absolute top-1 right-1 flex items-center rounded bg-[#90AEAD] py-1 px-2.5 border border-transparent text-center text-md font-bold text-[#244855] shadow-sm hover:shadow hover:bg-[90AEAD] active:scale-90" type="button" onClick={handleSearch}>Search</button>
                </div>

                <div className="flex mt-10">
                    <MovieItems></MovieItems>
                </div>

            </div>
        </div>
    );
}

export default Home;