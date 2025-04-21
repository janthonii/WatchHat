import connectMongoDB from "../../../../config/mongodb";
import RetrieveMovie from "@/components/mongoApiFunc/movie/RetrieveMovie";

/**
 * This function will upload all movies showing at uga for the specific month
 * 
 */
export default async function RetrieveUga (updateArray: any[]) {
    console.log("running RetrieveUga");
    try {
      //get response to api url
      //Uga movies
      //nosferatu
      await RetrieveMovie(426063, updateArray);
      //shrek 2
      await RetrieveMovie(809, updateArray);
      //la la land
      await RetrieveMovie(313369, updateArray);
      //the lorax
      await RetrieveMovie(73723, updateArray);
      //Wall-E
      await RetrieveMovie(10681, updateArray);
      console.log('Ending RetrieveUga');
    } catch (error) {
      console.error('Error in RetriveUga!', error);
    }
  };