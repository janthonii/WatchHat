import connectMongoDB from "../../../../config/mongodb";
import GetActorData from "@/components/movieApiFunc/actor/GetActorData";


/**
 * This function will update the mongodb to add all cast data for all movies.
 * This will run the GetActorData function on every movie in the mongo database. 
 */
export default async function UpdateCast () {
    console.log("running updateCast");
    const url = `http://localhost:3000/api/movies`
    try {
      //get response to api url
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response for update cast was not ok');
      }
      const result = await response.json();
      //console.log(result.movies.length);
      for (var i = 0; i < result.movies.length; i++) {
        //console.log(result.movies[i]);
        const movieId = result.movies[i].id;
        await GetActorData(movieId);
      }
      console.log('Ending updateCast');
    } catch (error) {
      console.error('Error in updateCast!', error);
    }
  };