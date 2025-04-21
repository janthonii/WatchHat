import HomeClient from '@/components/HomeContent';
import RetrieveStaff from '@/components/mongoApiFunc/movie/RetrieveStaff';
import RetrieveUga from '@/components/mongoApiFunc/movie/RetrieveUga';

export default async function Home() {
    const staffMovies: any[] = [];
    const ugaMovies: any[] = [];

    await RetrieveStaff(staffMovies);
    await RetrieveUga(ugaMovies);

    return (
        <HomeClient
        staffMovies={staffMovies}
        ugaMovies={ugaMovies}
        />
    );
}