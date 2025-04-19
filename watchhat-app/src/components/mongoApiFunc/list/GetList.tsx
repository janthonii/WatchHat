import connectMongoDB from "../../../../config/mongodb";
import List from "@/models/listsSchema";
import { ObjectId } from "mongoose";

/**
 * This function will get a specific list. It will then push that list into an array.
 * 
 * @param id the string id of the list we are looking for 
 * @param updateArray the array to have the lists objects pushed into
 */
export default async function GetList (id : string, updateArray: any[]) {
    console.log("running GetList");
    const url = `http://localhost:3000/api/lists/${id}`
    try {
       //get response to api url
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       const result = await response.json();
       //console.log(result);
       if (result.list) {
         updateArray.push(result.list);
        }
        console.log('Ending GetList');
    } catch (error) {
      console.error('Error in GetList!', error);
    }
  };