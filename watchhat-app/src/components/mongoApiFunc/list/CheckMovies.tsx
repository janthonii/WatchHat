import GetList from "./GetList";

/**
 * This function will check if a movie is already added to the list. 
 * 
 * @param movies the array housing the movies of a list
 * @param movie the movie id to look for
 * @returns true if a movieId is found in the participants
 */
export default async function CheckMovies (movies: number[], movie: number) {
    console.log("running CheckMovies");
    try {
      //get response to api url
      for (var i = 0; i < movies.length; i++) {
        if (movies[i] === movie) {
            return true;
        }
      }
      console.log('Ending CheckMovies');
    } catch (error) {
      console.error('Error in CheckMovies!', error);
    }
    return false;
  };