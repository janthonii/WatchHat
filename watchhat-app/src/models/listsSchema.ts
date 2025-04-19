import mongoose, { Schema, Document, Model } from "mongoose";

interface LList extends Document {
    name: string;
    participants: string[]; // Reference to Users
    movies?: number[];      // Reference to Movies
    shared: boolean;
}

const listSchema = new Schema<LList>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    participants: {
        type: [String],
        required: true
    },
    movies: {
        type: [Number],
    },
    shared: {
        type: Boolean
    }
});

const List: Model<LList> = mongoose.models.List || mongoose.model<LList>("List", listSchema);
export default List;