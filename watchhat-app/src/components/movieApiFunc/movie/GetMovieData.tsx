import connectMongoDB from "../../../../config/mongodb";
import FindMovie from "@/components/mongoApiFunc/movie/FindMovie";
import AddMovie from "@/components/mongoApiFunc/movie/AddMovie";


/**
 * This function will pull Movie data based on the first three pages of a selected
 * page of the Url. Adds the data to the database and avoids duplicates.
 * 
 * discover limit: 6
 * trending - week - by release date limit: 6
 * now playing - by release date limit: 6
 * upcoming - by release date limit: 11
 * popular limit: 11
 * top rate limit: 16
 */
export default async function GetMovieData () {
    console.log("running getMovieData");
    for (var page = 11; page < 16; page++){
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=b0c1f3d72e73bca8ae733af1f8e9e5b3&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      try {
        //get response to api url
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        const movieData = results.results
        for (var i = 0; i < movieData.length; i++) {
          //console.log(movieData[i]);
          const movieId = movieData[i].id;
          const movieExists = await FindMovie(movieId);
          if (!movieExists) {
            console.log('got back false');
            const adder = await AddMovie(movieData[i]);
          }
        }
      } catch (error) {
        console.error('Error in getMovieData!', error);
      }
    }
    console.log('Ending getMovies');
  };