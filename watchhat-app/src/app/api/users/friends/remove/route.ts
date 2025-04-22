// Remove friend
// How to use: 
// DELETE /api/users/friends/remove
// Body: { currentUserId: "123", friendId: "456" }
import connectMongoDB from "../../../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    await connectMongoDB();
    const { currentUserId, friendId } = await request.json();
    
    if (!currentUserId || !friendId) {
        return NextResponse.json(
            { error: "Both currentUserId and friendId are required" },
            { status: 400 }
        );
    }

    try {
        const currentUser = await User.findById(currentUserId);
        const friendUser = await User.findById(friendId);
        
        if (!currentUser || !friendUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Remove friend relationship (two-way)
        currentUser.friends = currentUser.friends.filter(
            id => !id.equals(friendUser._id)
        );
        friendUser.friends = friendUser.friends.filter(
            id => !id.equals(currentUser._id)
        );
        
        await currentUser.save();
        await friendUser.save();

        return NextResponse.json(
            { message: "Friend removed successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}