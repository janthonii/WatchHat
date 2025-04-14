import FindMovie from "@/components/mongoApiFunc/movie/FindMovie";
import AddMovie from "@/components/mongoApiFunc/movie/AddMovie";


/**
 * This function will pull Movie data based on the first three two of a selected
 * page of the Url. Pushes the results into an array. 
 * 
 * @param updateArray the array to have its componenets pushed to
 * @param searchTerm the string of a search term to look up
 */
export default async function GetMovieSearch (updateArray: any[], searchTerm: string) {
    console.log("running getMovieData");
    for (var page = 1; page < 3; page++){
      const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}&&api_key=b0c1f3d72e73bca8ae733af1f8e9e5b3`;
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
          updateArray.push(movieData[i]);
        }
      console.log('Ending getMovies');
      } catch (error) {
        console.error('Error in getMovieData!', error);
      }
    }
  };