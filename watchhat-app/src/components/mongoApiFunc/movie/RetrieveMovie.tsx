import connectMongoDB from "../../../../config/mongodb";

/**
 * This function will use the movieID to place a movie object, if it exists, 
 * into an array.
 * 
 * @param id id of the movie to retrieve
 * @param updateArray array to have the movie object pushed to
 */
export default async function RetrieveMovie (id : number, updateArray : any[]) {
  console.log("running RetrieveMovie");
  const url = `http://localhost:3000/api/movies/${id}`
  try {
    //get response to api url
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    if (result.movie != null) {
      //console.log(result.movie);
      //console.log('Movie already exist');
      updateArray.push(result.movie);
     }
  console.log('Ending RetrieveMovie');
  } catch (error) {
    console.error('Error in RetrieveMovie!', error);
  }
  return false;
  };