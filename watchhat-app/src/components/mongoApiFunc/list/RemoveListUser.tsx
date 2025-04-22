import CheckParticipants from "./CheckParticipants";
import DeleteList from "./DeleteList";
import GetList from "./GetList";
import RefetchList from "./RefetchList";

/**
 * This function will remove a user name to the participants inside a list object. 
 * 
 * @param id the id of list to update
 * @param user the user name to remove to the array
 */
export default async function RemoveListUser (id: string, user: string) {
    console.log("running RemoveListUser");
    const url = `http://localhost:3000/api/lists/${id}`
    try {
      //get response to api url
      const list = await GetList(id);
      if (list) {
        let movies = list.movies;
        const adder = await CheckParticipants(list.participants, user);
        if (!adder) {
            throw new Error(`${user} is not a part of this list`);
        }
        //add any user not equal to user to remove
        let participants = list.participants.filter(oldUser => oldUser !== user);
        let name = list.name;
        //check for possible deletion
        if (participants.length > 0) {
            const response = await fetch(url, { method: 'PUT', body: JSON.stringify({name, participants, movies}) });
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        } else {
            await DeleteList(list._id.toString());
        }
      }
      let news = [];
      await RefetchList(news);
      console.log('Ending RemoveListUser');
    } catch (error) {
      console.error('Error in RemoveListUser!', error);
    }
  };