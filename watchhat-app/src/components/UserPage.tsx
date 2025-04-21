'use client'
import {useState} from "react";
import Image from "next/image";

const userPage = () => {

    const handleSubmit = async (e: React.FormEvent) => {

    }

    return (
        <div className="grid grid-rows-2 flex flex-row p-10 content-around gap-4">
            <div className="grid grid-cols-2 flex flex-cols gap-4content-around justify-around gap-4">
                <div className="p-4 rounded-xl bg-warm-gray text-[20px] font-bold">
                    Profile
                </div>
                <div className="p-4 rounded-xl bg-warm-gray text-[20px] font-bold">
                    Add Friend
                    <form onSubmit={handleSubmit} className="relative w-full max-w-xl min-w-[200px]">
                        <input className="w-full bg-[#FFF8EE] text-md text-[#244855] font-bold border rounded-md pl-3 pr-28 py-2 focus:outline-[#E64833] hover:border-slate-300 shadow-sm focus:shadow" placeholder="Search for Users"></input>
                        <button className="absolute top-1 right-1 flex items-center rounded bg-custom-orange py-1 px-2.5 border border-transparent text-center text-md font-bold text-creamy-white shadow-sm hover:shadow hover:bg-[90AEAD] active:scale-90" type="submit">Add Friend</button>
                    </form>
                </div>
            </div>
            <div className="p-4 rounded-xl bg-warm-gray text-[20px] font-bold">
            Friends
            </div>
        </div>
    )
}

export default userPage;