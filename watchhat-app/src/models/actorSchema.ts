import mongoose, { Schema, Document, Model } from "mongoose";

interface AActor extends Document {
    name: string;
    original_name: string;
    profile_path?: string;
    id: number;
    popularity: number;
}

const actorSchema = new Schema<AActor>({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true,
    },
    popularity: {
        type: Number,
        required: true
    },
    profile_path: {
        type: String,
        required: false
    }
});

const Actor: Model<AActor> = mongoose.models.Actor || mongoose.model<AActor>("Actor", actorSchema);
export default Actor;