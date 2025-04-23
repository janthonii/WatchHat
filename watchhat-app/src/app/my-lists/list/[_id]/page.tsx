import GetList from '@/components/mongoApiFunc/list/GetList';
import RetrieveMovie from '@/components/mongoApiFunc/movie/RetrieveMovie';
import RetrieveUga from '@/components/mongoApiFunc/movie/RetrieveUga';
import MovieItemsGrid from '@/components/MovieItemsGrid';
import List from "@/models/listsSchema";
import mongoose from 'mongoose';

export default async function ListPage({ params }: { params: { _id: string } }) {

    /* if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI!);
    }

    const list = await List.findById(params._id).lean();*/
    

    const list = await GetList(params._id);
    if (!list) {
        return <h1 className="text-center text-3xl font-bold text-red-600">List not found</h1>;
    }

    const movieIds = list.movies;

    const movieData = await Promise.all(
        movieIds.map((id: number) =>
            fetch(`http://localhost:3000/api/movies/${id}`).then(res => res.json())
        .then(data => data.movie))
        )

    /* let movieData: any[] = [];
    movieIds.map(async (id: number) => {
        await RetrieveMovie(id, movieData);
    }) */

    return (
    <div className=" flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">{list.name}</h1>
        <div className="p-8 pt-0">
            <div className="bg-[#665C5C] rounded-lg p-6">
                <MovieItemsGrid initialMovies={movieData} listId={list._id}/>
            </div>
        </div>
    </div>
    );
}