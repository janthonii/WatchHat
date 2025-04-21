import FindListUser from "./FindListUser";

/**
 * This function will get all non-shared lists of a user. It will then push all lists of the user into an array.
 * 
 * @param user the username of user we are relating the shared list to
 * @param updateArray the array to have the not shared lists objects pushed into
 */
export default async function FindNotShared (user : string, updateArray: any[]) {
    console.log("running FindNotShared");
    try {
      const temp = [];
      await FindListUser(user, temp);
      for (var i = 0; i < temp.length; i++){
        if (!temp[i].shared) {
            updateArray.push(temp[i]);
        }
      }
        console.log('Ending FindNotShared');
    } catch (error) {
      console.error('Error in FindNotShared!', error);
    }
  };