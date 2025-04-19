import mongoose, { Schema, Document, Model } from "mongoose";

interface SSimilarity extends Document {
    score: number;
    movieOne: number;
    movieTwo: number;
}

const genreSchema = new Schema<SSimilarity>({
    score: {
        type: Number,
        required: true
    },
    movieOne: {
        type: Number,
        required: true
    },
    movieTwo: {
        type: Number,
        required: true
    }
});

const Similarity: Model<SSimilarity> = mongoose.models.Similarity || mongoose.model<SSimilarity>("Similarity", genreSchema);
export default Similarity;