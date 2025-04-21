
/**
 * This function will get all movies from the database. It pushes in infromation just
 * related to cast ids, genre ids, and movie id. 
 * 
 * @param updateArray the array to have the data pushed to.
 */
export default async function RetrieveMovieSim (updateArray: any[]) {
    console.log("running RetrieveMovieSim");
    const url = `http://localhost:3000/api/movies`
    try {
      //get response to api url
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response for update cast was not ok');
      }
      const result = await response.json();
      let {id, original_language, genre_ids, cast}= result.movies[0];
      const temp = result.movies.map((movie: any) => {
        const { id,original_language, genre_ids, cast } = movie;
        return { id,original_language, genre_ids, cast };
      });
      updateArray.push(...temp);
      console.log('Ending RetrieveMovieSim');
    } catch (error) {
      console.error('Error in RetrieveMovieSim!', error);
    }
  };