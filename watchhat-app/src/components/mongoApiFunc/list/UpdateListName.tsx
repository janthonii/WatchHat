import GetList from "./GetList";
import FindListUser from "./FindListUser";
import RefetchList from "./RefetchList";

/**
 * This function will update the list name inside a list object. 
 * 
 * @param id the id of list to update
 * @param name the new name to be inserted in the list
 */
export default async function UpdateListName (id: string, name: string) {
    console.log("running UpdateListMovie");
    const url = `http://localhost:3000/api/lists/${id}`
    try {
      //get response to api url
      const list = await GetList(id);
      if (list) {
        const existing = [];
        await FindListUser(user, existing);
        for (var i = 0; i < existing.length; i++) {
          if (!existing[i].shared && !shared) {
              if (name === existing[i].name) {
                  throw new Error("Another list has this name already");
              }
          }
        }
        let movies = list.movies;
        let participants = list.participants;
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