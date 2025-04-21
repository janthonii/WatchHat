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
      let temp = [];
      await GetList(id, temp);
      if (temp.length > 0) {
        let movies = temp[0].movies;
        const adder = await CheckParticipants(temp[0].participants, user);
        if (adder) {
            throw new Error(`${user} is already a part of this list`);
        }
        let participants = [...temp[0].participants, user];
        let name = temp[0].name;
        const response = await fetch(url, { method: 'PUT', body: JSON.stringify({name, participants, movies}) });
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      }
      temp = [];
      await RefetchList(temp);
      console.log('Ending UpdateListMovie');
    } catch (error) {
      console.error('Error in UpdateListMovie!', error);
    }
  };