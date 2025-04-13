import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will use the actorID to place an actor object, if it exists, 
 * into an array.
 * 
 * @param id id of the actor to retrieve
 * @param updateArray array to have the actor object pushed to
 */
export default async function RetrieveActor (id : number, updateArray : any[]) {
    console.log("running RetrieveActor");
    const url = `http://localhost:3000/api/actors/${id}`
    try {
      //get response to api url
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.actor) {
        //console.log(result.actor);
        //console.log('Actor already exist new');
        updateArray.push(result.actor);
       }
    console.log('Ending RetrieveActor');
    } catch (error) {
      console.error('Error in RetrieveActor!', error);
    }
    return false;
  };