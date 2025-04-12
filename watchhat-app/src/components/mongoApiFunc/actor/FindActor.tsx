import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will search if a actor already exists in the database.
 * This function will return a boolean to represent if the actor was found 
 * in mongo.
 * 
 * @param id id of the actor to find
 * @returns true if the actor was found
 */
export default async function FindActor (id : number) {
    console.log("running findActor");
    const url = `http://localhost:3000/api/actors/${id}`
    try {
      //get response to api url
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      //console.log(result);
      if (result.actor) {
        //console.log('Actor already exist new');
        return true;
       }
    console.log('Ending findActor');
    } catch (error) {
      console.error('Error in findActor!', error);
    }
    return false;
  };