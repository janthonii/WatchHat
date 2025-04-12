import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will add an Actor to the mongodb based on the actor object inserted.
 * 
 * @param actor the actor object to be added to the database
 */
export default async function AddActor (actor) {
    console.log("running addActor");
    const url = `http://localhost:3000/api/actors`
    try {
      //get response to api url
      const response = await fetch(url, { method: 'POST', body: JSON.stringify(actor) });
      if (!response.ok) {
        throw new Error('Network response for add movie was not ok');
      }
      const result = await response.json();
      //console.log(result);
      console.log('Ending addActor');
    } catch (error) {
      console.error('Error in addActor!', error);
    }
  };