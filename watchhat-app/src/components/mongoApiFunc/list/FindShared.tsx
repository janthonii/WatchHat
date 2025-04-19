import FindListUser from "./FindListUser";

/**
 * This function will get all shared lists of a user. It will then push all lists of the user into an array.
 * 
 * @param user the username of user we are relating the shared list to
 * @param updateArray the array to have the shared lists objects pushed into
 */
export default async function FindShared (user : string, updateArray: any[]) {
    console.log("running FindShared");
    try {
      const temp = [];
      await FindListUser(user, temp);
      for (var i = 0; i < temp.length; i++){
        if (temp[i].shared) {
            updateArray.push(temp[i]);
        }
      }
        console.log('Ending FindShared');
    } catch (error) {
      console.error('Error in FindShared!', error);
    }
  };