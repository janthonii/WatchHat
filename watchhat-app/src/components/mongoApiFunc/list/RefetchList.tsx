
/**
 * This function will refetch list to ensure no errors. It will then push the list data into an array.
 * 
 * @param updateArray the array to have the lists objects pushed into
 */
export default async function RefetchList (updateArray: any[]) {
    console.log("running RefetchList");
    const url = `http://localhost:3000/api/lists`
    try {
       //get response to api url
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const result = await response.json();
       for (var i = 0; i < result.length; i++) {
        updateArray.push(result[i]);
       }
       //console.log(result);
        console.log('Ending RefetchList');
    } catch (error) {
      console.error('Error in RefetchList!', error);
    }
  };