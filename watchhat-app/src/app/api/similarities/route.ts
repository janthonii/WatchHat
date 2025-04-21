import connectMongoDB from "../../../../config/mongodb";
import Similarity from "@/models/similaritySchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
    await connectMongoDB();
    const similarities = await Similarity.find();
    return NextResponse.json({ similarities }, {status: 200});
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const body = await request.json();
        
        if (!body) {
            throw new Error("No data provided");
        }

        let result;
        if (Array.isArray(body)) {
            result = await Similarity.insertMany(body);
        } else {
            result = await Similarity.create(body);
        }
        
        return NextResponse.json(
            { 
                message: "Similarity added successfully",
                insertedCount: Array.isArray(body) ? body.length : 1 
            }, 
            { status: 201 }
        );
    } catch (error) {
        let errorMessage = "Failed to add similarity";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = String(error.message);
        }

        console.error("Insert error:", error);
        return NextResponse.json(
            { 
                message: "Error adding similarity",
                error: errorMessage 
            },
            { status: 500 }
        );
    }
}