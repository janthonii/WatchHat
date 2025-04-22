import FindListUser from "./FindListUser";
import RefetchList from "./RefetchList";

/**
 * This function will add a list to the mongodb based on the username and the list name.
 * 
 * @param user the user to be added to a participants array
 * @param name the name for this list name
 * @param shared the status if the list is to be shared or not
 */
export default async function AddList (name: string, user: string, shared: boolean) {
    console.log("running AddList");
    const url = `http://localhost:3000/api/lists`
    try {
      //get response to api url
      if (!name) {
        throw new Error("List name must not be null");
      }
      const participants : String[] = [];
      const existing = [];
      await FindListUser(user, existing);
      for (var i = 0; i < existing.length; i++) {
        if (!existing[i].shared && !shared) {
            if (name === existing[i].name) {
                throw new Error("Another list has this name already");
            }
        }
      }
      participants.push(user);  
      const list = { name, participants, shared};
      const response = await fetch(url, { method: 'POST', body: JSON.stringify(list) });
      if (!response.ok) {
        throw new Error('Network response for add list was not ok');
      }
      const result = await response.json();
      let temp = [];
      await RefetchList(temp);
      //console.log(result);
      console.log('Ending AddList');
    } catch (error) {
      console.error('Error in AddList!', error);
    }
  };