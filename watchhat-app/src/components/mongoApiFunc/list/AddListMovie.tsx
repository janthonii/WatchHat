import FindListUser from "./FindListUser";
import GetList from "./GetList";

/**
 * This function will add a movieId to the movies inside a list object. 
 * 
 * @param id the id of list to update
 * @param movieId the id of the movie to add to the list
 */
export default async function AddListMovie (id: string, movieId: number) {
    console.log("running UpdateListMovie");
    const url = `http://localhost:3000/api/lists/${id}`
    try {
      //get response to api url
      const temp = [];
      await GetList(id, temp);
      if (temp.length > 0) {
        let movies = [...temp[0].movies, movieId];
        let participants = temp[0].participants;
        let name = temp[0].name;
        const response = await fetch(url, { method: 'PUT', body: JSON.stringify({name, participants, movies}) });
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      }
      console.log('Ending UpdateListMovie');
    } catch (error) {
      console.error('Error in UpdateListMovie!', error);
    }
  };