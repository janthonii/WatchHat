import CheckParticipants from "./CheckParticipants";
import GetList from "./GetList";
import RefetchList from "./RefetchList";

/**
 * This function will add a user name to the participants inside a list object. 
 * 
 * @param id the id of list to update
 * @param user the user name to add to the array
 */
export default async function AddListUser (id: string, user: string) {
    console.log("running AddListUser");
    const url = `http://localhost:3000/api/lists/${id}`
    try {
      //get response to api url
      const list = await GetList(id);
      if (list) {
        let movies = list.movies;
        const adder = await CheckParticipants(list.participants, user);
        if (adder) {
            throw new Error(`${user} is already a part of this list`);
        }
        let participants = [...list.participants, user];
        let name = list.name;
        const response = await fetch(url, { method: 'PUT', body: JSON.stringify({name, participants, movies}) });
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      }
      let news = [];
      await RefetchList(news);
      console.log('Ending UpdateListMovie');
    } catch (error) {
      console.error('Error in UpdateListMovie!', error);
    }
  };