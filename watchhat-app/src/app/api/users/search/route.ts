// For user searches: Find user by username
// How to use: GET /api/users/search?username=janedoe
import connectMongoDB from "../../../../../config/mongodb";
import User from "@/models/usersSchema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (!username) {
        return NextResponse.json(
            { error: "Username parameter is required" },
            { status: 400 }
        );
    }

    try {
        const user = await User.findOne({ username })
            .select('_id username');
        
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json({
            id: user._id,
            username: user.username
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}