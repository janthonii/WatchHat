import mongoose, { Schema, Document, Model } from "mongoose";

interface RRating extends Document {
    rating: number;
    movie: number;
    user: string;
}

const ratingSchema = new Schema<RRating>({
    rating: {
        type: Number,
        required: true,
        min: 0,       // Minimum rating is 0
        max: 10        // Maximum rating is 10
    },
    movie: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const Rating: Model<RRating> = mongoose.models.Rating || mongoose.model<RRating>("Rating", ratingSchema);
export default Rating;