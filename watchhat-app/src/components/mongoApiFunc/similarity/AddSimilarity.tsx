import connectMongoDB from "../../../../config/mongodb";


/**
 * This function will add a Similarity to the mongodb based on the two movie ids and
 * the score inserted. 
 * 
 * @param score the score for this new similarity object
 * @param movieOne the movieId to be put as movieOne
 * @param movieTwo the movieId to be put as movieTwo
 */
export default async function AddSimilarity (score: number, movieOne: number, movieTwo: number) {
    console.log("running addSimilarity");
    const url = `http://localhost:3000/api/similarities`
    try {
      //get response to api url
      const similarity = { score, movieOne, movieTwo};
      const response = await fetch(url, { method: 'POST', body: JSON.stringify(similarity) });
      if (!response.ok) {
        throw new Error('Network response for add movie was not ok');
      }
      const result = await response.json();
      console.log(result);
      console.log('Ending addSimilarity');
    } catch (error) {
      console.error('Error in addSimilarity!', error);
    }
  };