import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will push genre names onto a desired array.
 * The function takes in a movie id to find the desired movie.
 * 
 * @param id id of the movie, in string form to get genre names from
 * @param updateArray array to have the names of the genre pushed to
 */
export default async function GetGenreNameMovie (id : string, updateArray : any[]) {
    console.log("running getGenreDataMovie");
    const url = `http://localhost:3000/api/movies/${id}`;
    try {
      //get movie based on id
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const results = await response.json();
      //checks if valid movie returned
      if (results.movie) {
        console.log("Inside GetGenreNameMovie: this should not run")
        const genreData = results.movie.genre_ids;
        for (var i = 0; (i < genreData.length); i++) {
            const genreUrl = `http://localhost:3000/api/genres/${genreData[i]}`;
            const genreResponse = await fetch(genreUrl);
            if (!genreResponse.ok) {
            throw new Error('Network response was not ok');
            }
        const genreResult = await genreResponse.json();
        const genre = genreResult.genre;
        updateArray.push(genre.name);
        }
      }
    } catch (error) {
      console.error('Error in getGenreNameMovie!', error);
    }
  };