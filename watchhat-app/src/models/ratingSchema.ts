import mongoose, { Schema, Document, Model } from "mongoose";

interface RRating extends Document {
    rating: number;
}

const ratingSchema = new Schema<RRating>({
    rating: {
        type: Number,
        required: true,
        min: 0,       // Minimum rating is 0
        max: 10        // Maximum rating is 10
    }
});

const Rating: Model<RRating> = mongoose.models.Rating || mongoose.model<RRating>("Rating", ratingSchema);
export default Rating;