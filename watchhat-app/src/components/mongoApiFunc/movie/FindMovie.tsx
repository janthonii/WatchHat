import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will search if a movie exists in the mongodb using the movie id.
 * This function will return a boolean to represent if the movie was found 
 * in mongo.
 * 
 * @param id id of the movie to find
 * @returns true if the movie was found
 */
export default async function FindMovie (id : number) {
  console.log("running findMovie");
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
      return true;
     }
  console.log('Ending findMovie');
  } catch (error) {
    console.error('Error in findMovie!', error);
  }
  return false;
  };