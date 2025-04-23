'use client';

import { useSession } from 'next-auth/react';

export default function MovieActions({ movieId }: { movieId: number }) {
    const { data: session } = useSession();

    const handleAddToList = (listType: string) => {
        // list stuff here eventually
        console.log(`Adding ${movieId} to ${listType} list`);
    };

    if (!session) {
        return null; // Don't render anything if not logged in
    }

    return (
        <div className="flex gap-3 mb-4">
            <button 
                onClick={() => handleAddToList('watchlist')} 
                className="flex items-center bg-custom-orange transition duration-150 hover:bg-[#e95a47] hover:scale-[1.1] rounded-lg px-4 py-2 font-bold"
            >
                Add to List ▾
            </button>
            <button 
                onClick={() => handleAddToList('favorites')}
                className="flex items-center bg-custom-orange transition duration-150 hover:bg-[#e95a47] hover:scale-[1.1] rounded-lg px-4 py-2 font-bold"
            >
                Rate Movie
            </button>
        </div>
    );
}