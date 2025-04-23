'use client'

import Image from "next/image";
import { useSession, signOut } from 'next-auth/react';
import usrIMG from '@/assets/defaultImg.png';


const userPage = () => {
    
    const { data: session } = useSession();
    
    return (
        <div className="grid grid-rows-2 flex flex-row p-10 content-around gap-4">
            <div className="grid grid-cols-2 flex flex-cols gap-4 content-around justify-around">
                <div className="p-4 rounded-xl bg-warm-gray text-[25px] font-bold gap-6">
                    Profile
                    <div className="flex flex-cols gap-4">
                    <Image src={usrIMG} alt="WatchHat logo" height={150} />
                    <div className="text-center content-center text-[30px] p-3">
                    {session?.user.name}
                    </div>
                    </div>
                </div>
            </div>
            
            <div className="p-4 rounded-xl bg-warm-gray text-[25px] font-bold">
            Friends
            <div className="flex flex-row outline-3 outline-black bg-[#C2AD96] rounded-xl w-[400px] h-[100px] items-center content-center text-center text-black justify-center">
                Your Mom
            </div>
            </div>
        </div>
    );
}

export default userPage;