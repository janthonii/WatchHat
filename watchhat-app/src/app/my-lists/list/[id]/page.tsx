import RetrieveUga from '@/components/mongoApiFunc/movie/RetrieveUga';
import MovieItemsGrid from '@/components/MovieItemsGrid';

export default async function List({ params }: { params: { id: string } }) {
    const ugaMovies: any[] = [];
    await RetrieveUga(ugaMovies);

    return (
    <div className=" flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">List</h1>
        <div className="p-8 pt-0">
            <div className="bg-[#665C5C] rounded-lg p-6">
                <MovieItemsGrid initialMovies={ugaMovies} />
            </div>
        </div>
    </div>
    );
}