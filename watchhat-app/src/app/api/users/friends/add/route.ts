// Add friend
// How to use: 
//    POST /api/users/friends/add
//    Body: { currentUserId: "123", friendUsername: "janedoe" }
import connectMongoDB from "../../../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await connectMongoDB();
    const { currentUserId, friendUsername } = await request.json();
    
    // Validate inputs
    if (!currentUserId || !friendUsername) {
        return NextResponse.json(
            { error: "Both currentUserId and friendUsername are required" },
            { status: 400 }
        );
    }

    try {
        // Check if users exist
        const currentUser = await User.findById(currentUserId);
        const friendUser = await User.findOne({ username: friendUsername });
        
        if (!currentUser || !friendUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Check if trying to add self
        if (currentUser._id.equals(friendUser._id)) {
            return NextResponse.json(
                { error: "Cannot add yourself as a friend" },
                { status: 400 }
            );
        }

        // Check if already friends
        if (currentUser.friends.some(id => id.equals(friendUser._id))) {
            return NextResponse.json(
                { error: "User is already a friend" },
                { status: 409 }
            );
        }

        // Add friend relationship (two-way)
        currentUser.friends.push(friendUser._id);
        friendUser.friends.push(currentUser._id);
        
        await currentUser.save();
        await friendUser.save();

        return NextResponse.json(
            { message: "Friend added successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}