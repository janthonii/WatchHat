import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will update the movie data with the top 5 most popular actors 
 * (in number form), who featured in the movie.
 * 
 * @param movieId the movie id to recognize which movie will be updated
 * @param actorId the actor id to be pushed into the movie data
 */
export default async function UpdateMovie (movieId, actorId) {
    console.log("running updateMovie new");
    const movieUrl = `http://localhost:3000/api/movies/${movieId}`
    try {
      //get response to api url
      const response = await fetch(movieUrl, { method: 'PUT', body: JSON.stringify({actorId}) });
      if (!response.ok) {
        throw new Error('Network response for update movie was not ok');
      }
      await response.json();
      //console.log(result);
      console.log('Ending updateMovie');
    } catch (error) {
      console.error('Error in updateMovie!', error);
    }
  };