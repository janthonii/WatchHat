
/**
 * This function will delete a specific list.
 * 
 * @param id the string id of the list we are looking to delete 
 */
export default async function DeleteList (id : string) {
    console.log("running DeleteList");
    const url = `http://localhost:3000/api/lists/${id}`
    try {
       //get response to api url
       const response = await fetch(url, { method: 'DELETE'});
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const result = await response.json();
       console.log(result);
       console.log('Ending DeleteList');
    } catch (error) {
      console.error('Error in DeleteList!', error);
    }
  };