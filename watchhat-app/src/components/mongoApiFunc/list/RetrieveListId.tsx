/**
 * This function will add a list id to an array. 
 * 
 * @param list the list object to get its id
 * @param updateArray the array object to add the id to
 */
export default async function RetrieveListId (list : any, updateArray: any[]) {
    console.log("running RetrieveListId");
    try {
        if (list){
            updateArray.push(list._id.toString());
        }
        console.log('Ending RetrieveListId');
    } catch (error) {
      console.error('Error in RetrieveListId!', error);
    }
  };