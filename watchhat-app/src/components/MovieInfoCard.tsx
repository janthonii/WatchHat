import Image from "next/image";

interface MovieInfoCardsProps {
    movie: {
        id: number;
        title: string;
        original_title?: string;
        overview?: string;
        release_date?: string;
        poster_path?: string;
    };
    genres: string[];
    actors: string[];
    actorPics?: string[];
    children?: React.ReactNode;
    }

    export default function MovieInfoCards({ movie, genres, actors, actorPics, children }: MovieInfoCardsProps) {
    const posterUrl = movie.poster_path
        ? movie.poster_path.startsWith('http')
        ? movie.poster_path
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/placeholder-poster.jpg';

    return (
        <div className="min-h-100 p-8">
            <div className="max-w-4xl mx-auto bg-[#665C5C] rounded-lg overflow-hidden shadow-lg">
                <div className="md:flex">

                    {/* Poster Column */}
                    <div className="md:w-1/3 p-4 flex justify-center">
                        <Image src={posterUrl} alt={`${movie.title} Poster`} width={300} height={450} className="object-cover rounded-lg" priority/>
                    </div>

                    {/* Info Column */}
                    <div className="md:w-2/3 p-6 text-[#FBE9D0]">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

                        {movie.original_title && movie.original_title !== movie.title && (
                            <p className="italic mb-2 pl-5">Original Title: {movie.original_title}</p>
                        )}

                        {movie.release_date && (
                            <p className="mb-2 pl-5">Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                        )}

                        {movie.overview && (
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                                <p className="ml-2">{movie.overview}</p>
                            </div>
                        )}

                        {/* Display Buttons */}
                        {children && <div className="mb-4">{children}</div>}

                        {/* Display Genres */}
                        {genres.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">Genres</h2>
                                <div className="flex flex-wrap gap-2">
                                    {genres.map((genre, index) => (
                                        <span key={index} className="bg-[#7A6E6E] hover:scale-[1.05] hover:rotate-[5deg] transition duration-200 px-3 py-1 rounded-full text-sm">{genre}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Display Actors */}
                        {actors && actors.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Starring</h2>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {actors.map((actor, index) => (
                                        <span key={index} className="bg-[#7A6E6E] hover:scale-[1.05] hover:rotate-[-5deg] transition duration-200 px-3 py-1 rounded-full text-sm">{actor}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
