import connectMongoDB from "../../../../config/mongodb";
import RetrieveMovie from "@/components/mongoApiFunc/movie/RetrieveMovie";

/**
 * This function will upload all staff recommended movies
 * 
 */
export default async function RetrieveStaff (updateArray: any[]) {
    console.log("running RetrieveStaff");
    const getUrl = `http://localhost:3000/api/movies`;
    try {
      //get response to api url
      //let sResults = [];
      //Hailey's movies
      await RetrieveMovie(824, updateArray);
      await RetrieveMovie(4935, updateArray);
      await RetrieveMovie(993784, updateArray);
      //Jess's movies
      await RetrieveMovie(10494, updateArray);
      await RetrieveMovie(3933, updateArray);
      await RetrieveMovie(496243, updateArray);
      //Sky's movies
      await RetrieveMovie(77, updateArray);
      await RetrieveMovie(13885, updateArray);
      await RetrieveMovie(457335, updateArray);
      //Fidel's movies
      await RetrieveMovie(808, updateArray);
      await RetrieveMovie(696506, updateArray);
      await RetrieveMovie(950387, updateArray);
      console.log('Ending RetrieveStaff');
    } catch (error) {
      console.error('Error in RetrieceStaff!', error);
    }
  };