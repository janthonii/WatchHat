import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will search if a genre exists using the genre number
 * This function will return a boolean to represent if the genre was found 
 * in mongo.
 * 
 * @param id id of the movie, in number form, to find the genre object
 * @returns true if the genre was found
 */
export default async function FindGenre (id : number) {
    console.log("running FindGenre");
    const url = `http://localhost:3000/api/genres/${id}`
    try {
      //get response to api url
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.genre != null) {
        //console.log(result.genre);
        console.log('Genre already exist');
        return true;
       }
        console.log('Ending findGenre');
    } catch (error) {
      console.error('Error in findGenre!', error);
    }
    return false;
  };