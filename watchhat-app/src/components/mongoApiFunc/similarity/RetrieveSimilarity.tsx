
/**
 * This function will use the movieID to place all related similarity objects, 
 * into an array.
 * 
 * @param id id of the movie to retrieve its similarities
 * @param updateArray array to have the similarity object pushed to
 */
export default async function RetrieveSimilarity (id : number, updateArray : any[]) {
  console.log("running RetrieveSimilarity");
  const url = `http://localhost:3000/api/similarities/${id}`
  try {
    //get response to api url
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
   //console.log(result);
    if (result.similarity) {
      //console.log(result.movie);
        for (var i = 0; i < result.similarity.length; i++ ) {
            updateArray.push(result.similarity[i]);
        }
     }
  console.log('Ending RetrieveSimilarity');
  } catch (error) {
    console.error('Error in RetrieveSimilarity!', error);
  }
  return false;
  };