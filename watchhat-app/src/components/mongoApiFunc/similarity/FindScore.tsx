import connectMongoDB from "../../../../config/mongodb";

/**
 * This function will find the similarity score from two movies.
 * 
 * @param movieOne the first movie object
 * @param movieTwo the second movie object
 */
export default async function FindScore (movieOne, movieTwo) {
    console.log("running FindScore");
    let score = 0;
    try {
        //update based on genreids
        for (var i = 0; i < movieOne.genre_ids.length; i++) {
            for (var k = 0; k < movieTwo.genre_ids.length; k++) {
                if (movieOne.genre_ids[i] == movieTwo.genre_ids[k]) {
                    score++;
                    break;
                }
            }
        }

        //update based on cast ids
        for (var i = 0; i < movieOne.cast.length; i++) {
            for (var k = 0; k < movieTwo.cast.length; k++) {
                if (movieOne.cast[i] == movieTwo.cast[k]) {
                    score++;
                    break;
                }
            }
        }
      console.log('Ending FindScore');
    } catch (error) {
      console.error('Error in FindScore!', error);
    }
    return score;
  };