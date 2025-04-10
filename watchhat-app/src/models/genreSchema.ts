import mongoose, { Schema, Document, Model } from "mongoose";

interface GGenre extends Document {
    id: number;
    name: string;
}

const genreSchema = new Schema<GGenre>({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

const Genre: Model<GGenre> = mongoose.models.Genre || mongoose.model<GGenre>("Genre", genreSchema);
export default Genre;