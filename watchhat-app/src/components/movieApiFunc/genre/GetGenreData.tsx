import connectMongoDB from "../../../../config/mongodb";
import FindGenre from "@/components/mongoApiFunc/genre/FindGenre";
import AddGenre from "@/components/mongoApiFunc/genre/AddGenre";


/**
 * This function will pull genre data from the TMDB and try to insert them
 * to mongo if it does not already exist in the database.
 */
export default async function GetGenreData () {
    console.log("running getGenreData");
      const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?&api_key=b0c1f3d72e73bca8ae733af1f8e9e5b3`;
      try {
        //get response to api url
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        const genreData = results.genres;
        for (var i = 0; i < genreData.length; i++) {
          const genreId = genreData[i].id;
          const genreExists = await FindGenre(genreId);
          //checks if genre already exists in database
          if (!genreExists) {
            await AddGenre(genreData[i]);
          }
        }
      console.log('Ending getGenre');
      } catch (error) {
        console.error('Error in getGenreData!', error);
      }
  };