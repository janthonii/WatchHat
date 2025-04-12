import connectMongoDB from "../../../../config/mongodb";
import FindActor from "@/components/mongoApiFunc/actor/FindActor";
import AddActor from "@/components/mongoApiFunc/actor/AddActor";
import UpdateMovie from "@/components/mongoApiFunc/movie/UpdateMovie";


/**
 * This function will pull Actor data based on an inserted movie Id
 * from the TMDB and try to insert them to mongo if it does not already exist
 * in the database.
 * 
 * @param id a string version of a movieid to have the actor id added to mongo
 */
export default async function GetActorData (id: string) {
    console.log("running getActorData");
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=b0c1f3d72e73bca8ae733af1f8e9e5b3`;
    try {
      //get response to api url
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const results = await response.json();
      const actorData = results.cast;
      for (var i = 0; (i < actorData.length) && (i < 5) ; i++) {
        //console.log(actorData[i].id);
        await UpdateMovie(id, actorData[i].id);
        const actorId = actorData[i].id;
        const actorExists = await FindActor(actorId);
        if (!actorExists) {
          console.log('got back false');
          await AddActor(actorData[i]);
        }
      }

    console.log('Ending getActorData');
    } catch (error) {
      console.error('Error in getActorData!', error);
    }
  };