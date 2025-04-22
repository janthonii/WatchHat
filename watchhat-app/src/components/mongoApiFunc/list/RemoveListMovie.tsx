import CheckMovies from "./CheckMovies";
import GetList from "./GetList";
import RefetchList from "./RefetchList";

/**
 * This function will remove a movieId to the movies inside a list object. 
 * 
 * @param id the id of list to update
 * @param movieId the id of the movie to remove from the list
 */
export default async function RemoveListMovie (id: string, movieId: number) {
    console.log("running RemoveListMovie");
    const url = `http://localhost:3000/api/lists/${id}`
    try {
        //get response to api url
        const list = await GetList(id);
        if (list) {
          const adder = await CheckMovies(list.movies, movieId);
          if (!adder) {
              throw new Error(`movie with ${movieId} as id is not a part of this list`);
          }
          let movies = list.movies.filter(oldMovie => oldMovie != movieId);
          let participants = list.participants;
          let name = list.name;
          const response = await fetch(url, { method: 'PUT', body: JSON.stringify({name, participants, movies}) });
          if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        }
      let news = [];
      await RefetchList(news);
      console.log('Ending RemoveListMovies');
    } catch (error) {
      console.error('Error in RemoveListMovie!', error);
    }
  };