import connectMongoDB from "../../../../config/mongodb";
import GetActorData from "@/components/movieApiFunc/actor/GetActorData";
import FindScore from "./FindScore";


/**
 * This function will update the mongodb to add all similarity.
 * This will run the AddSimilarity function on any two movies whose 
 * similarity score is higher than 0. 
 */
export default async function UpdateSimilarities () {
    console.log("running UpdateSimilarities");
    const url = `http://localhost:3000/api/movies`
    try {
      //get response to api url
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response for update similarities was not ok');
      }
      const result = await response.json();
      //console.log(result.movies.length);
      /*
      for (var i = 0; i < result.movies.length; i++) {
        //console.log(result.movies[i]);
        const movieId = result.movies[i].id;
        await GetActorData(movieId);
      }
        */
       //console.log(result.movies[9]);
       //console.log(result.movies[13]);
       const score = await FindScore(result.movies[9], result.movies[13]);
       console.log(score);
      console.log('Ending UpdateSimilarities');
    } catch (error) {
      console.error('Error in UpdateSimilarities!', error);
    }
  };