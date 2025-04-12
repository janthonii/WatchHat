import mongoose, { Schema, Document, Model } from "mongoose";

interface MMovie extends Document {
    id: number;
    genre_ids?: number[];
    original_language?: string;
    original_title: string;
    overview?: string;
    title: string;
    release_date?: string;
    poster_path?: string;
    cast?: number[];
}

const movieSchema = new Schema<MMovie>({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    genre_ids: {
        type: [Number],
        required: true
    },
    original_language: {
        type: String,
        required: false,
    },
    original_title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: false
    },
    poster_path: {
        type: String,
        required: false
    },
    cast: {
        type: [Number],
        required: false
    }
});

const Movie: Model<MMovie> = mongoose.models.Movie || mongoose.model<MMovie>("Movie", movieSchema);
export default Movie;