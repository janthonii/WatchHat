'use client';
import { useEffect, useState } from "react";
import AddListMovie from "./mongoApiFunc/list/AddListMovie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface List {
    _id: string;
    name: string;
    participants: string[];
}

interface Props {
    movieId: number;
    initialLists: List[];
}

export default function MovieActions({ movieId, initialLists }: Props) {
    const { data: session } = useSession();
    const username = session?.user?.name;
    const router = useRouter();

    const [userLists, setUserLists] = useState<List[]>([]);

    useEffect(() => {
        if (!username) return;

        const filtered = initialLists.filter(list =>
            list.participants.includes(username)
        );
        setUserLists(filtered);
    }, [username, initialLists]);

    const handleAddToList = async (listId: string) => {
        await AddListMovie(listId, movieId);
        router.push(`/my-lists/list/${listId}`);
    };

    return (
        <div className="relative inline-block text-left mb-4 group">
            <button
                className="flex items-center bg-custom-orange hover:bg-[#e95a47] hover:scale-[1.1] rounded-lg px-4 py-2 font-bold transition duration-150"
            >
                Add to List ▾
            </button>
            <div className="absolute bg-custom-orange border rounded-md shadow-lg w-48 z-10 hidden group-hover:block">
                {userLists.length === 0 ? (
                    <p className="p-2 text-sm text-center">No lists found</p>
                ) : (
                    userLists.map((list) => (
                        <button key={list._id} onClick={() => handleAddToList(list._id)} className="block w-full text-left px-4 py-2 text-sm text-center hover:bg-[#e95a47] hover:rounded">
                            {list.name}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
