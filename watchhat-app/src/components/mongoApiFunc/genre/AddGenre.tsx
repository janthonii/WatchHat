import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will add a Genre to the mongodb based on the genre object inserted.
 * 
 * @param genre the genre object to be added to the database
 */
export default async function AddGenre (genre) {
    console.log("running addGenre");
    const url = `http://localhost:3000/api/genres`
    try {
      //get response to api url
      const response = await fetch(url, { method: 'POST', body: JSON.stringify(genre) });
      if (!response.ok) {
        throw new Error('Network response for add genre was not ok');
      }
      const result = await response.json();
      //console.log(result);
      console.log('Ending addGenre');
    } catch (error) {
      console.error('Error in addGenre!', error);
    }
  };