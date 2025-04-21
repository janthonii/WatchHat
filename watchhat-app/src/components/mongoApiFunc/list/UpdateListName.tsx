import GetList from "./GetList";

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
      const temp = [];
      await GetList(id, temp);
      if (temp.length > 0) {
        /*if (name === temp[0].name) {
            throw new Error("Another list has this name already");
        }*/
        let movies = temp[0].movies;
        let participants = temp[0].participants;
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