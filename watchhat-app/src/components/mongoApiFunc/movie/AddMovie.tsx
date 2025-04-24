import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will add a Movie to the mongodb based on the movie object inserted.
 * 
 * @param movie the movie object to be added to the database
 */
export default async function AddMovie (movie:any) {
    console.log("running addMovie");
    const url = `http://localhost:3000/api/movies`
    try {
      //get response to api url
      const response = await fetch(url, { method: 'POST', body: JSON.stringify(movie) });
      if (!response.ok) {
        throw new Error('Network response for add movie was not ok');
      }
      const result = await response.json();
      //console.log(result);
      console.log('Ending addMovie');
    } catch (error) {
      console.error('Error in addMovie!', error);
    }
  };