import RetrieveMovie from "./RetrieveMovie";


/**
 * This function will pull Movie data based on the movieIds from an inputed
 * array. It will add any matched movie objects to the outputArray. 
 * 
 * @param updateArray the array to have its componenets pushed to
 * @param inputArray the array of integers to look up to in database.
 */
export default async function MatchSearchResult (inputArray: any[], outputArray: any[]) {
    console.log("running MatchSearchResult");
    try {
        for (var i = 0; i < inputArray.length; i++){
            await RetrieveMovie(inputArray[i], outputArray);
        }
    } catch (error) {
        console.error('Error in MatchSearchResult!', error);
    }
      console.log('Ending MatchSearchResult');
  };