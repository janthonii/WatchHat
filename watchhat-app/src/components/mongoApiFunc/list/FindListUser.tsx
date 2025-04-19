import connectMongoDB from "../../../../config/mongodb";
import List from "@/models/listsSchema";
import { NextResponse, NextRequest } from "next/server";

/**
 * This function will get all lists of a user. It will then push all lists of the user into an array.
 * 
 * @param user the username of user we are relating the list name to
 * @param updateArray the array to have the lists objects pushed into
 */
export default async function FindListUser (user : string, updateArray: any[]) {
    console.log("running FindListUser");
    try {
      await connectMongoDB();
      const lists = await List.find({ participants: user }).lean();
      for (var i = 0; i < lists.length; i++){
        updateArray.push(lists[i]);
      }
        console.log('Ending FindListUser');
    } catch (error) {
      console.error('Error in FindListUser!', error);
    }
  };