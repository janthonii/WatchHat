import mongoose, { Schema, Document, Model } from "mongoose";

interface LList extends Document {
    name: string;
    participants: String[]; // Reference to Users
    movies: String[];      // Reference to Movies
}

const listSchema = new Schema<LList>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    participants: [{
        type: [String],
        ref: "User"
    }],
    movies: [{
        type: Schema.Types.ObjectId,
        ref: "Movie"
    }]
});

const List: Model<LList> = mongoose.models.List || mongoose.model<LList>("List", listSchema);
export default List;