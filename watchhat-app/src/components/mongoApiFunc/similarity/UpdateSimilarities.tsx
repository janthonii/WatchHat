import connectMongoDB from "../../../../config/mongodb";
import AddSimilarity from "./AddSimilarity";
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
      // 379
      
      for (var i = 0; i < 20; i++) {
        for (var k = i + 1; k < result.movies.length; k++) {
            const score = await FindScore(result.movies[i], result.movies[k]);
            console.log(score);
            if (score > 0) {
                AddSimilarity(score, result.movies[i].id, result.movies[k].id);
            }
        }
      }
       console.log('Ending UpdateSimilarities');
    } catch (error) {
      console.error('Error in UpdateSimilarities!', error);
    }
  };