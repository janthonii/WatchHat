import GetList from "./GetList";

/**
 * This function will check if a particapnt is already added to the list. 
 * 
 * @param participants the array housing the participants of a list
 * @param user the user name to look for
 * @returns true if a username is found in the participants
 */
export default async function CheckParticipants (participants: string[], user: string) {
    console.log("running CheckParticipant");
    try {
      //get response to api url
      for (var i = 0; i < participants.length; i++) {
        if (participants[i] === user) {
            return true;
        }
      }
      console.log('Ending CheckParticipants');
    } catch (error) {
      console.error('Error in CheckParticipants!', error);
    }
    return false;
  };