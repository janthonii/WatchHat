import mongoose, { Schema, Document, Model } from "mongoose";

interface UUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    password: string;
    friends: mongoose.Types.ObjectId[]; // Reference to other Users - a string array of the friend's ids
    recommended?: string;
    rated?: string;
    compatibility?: string;
}

const userSchema = new Schema<UUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    friends: [{
        type: Schema.Types.ObjectId,  // an array of friend's user ids
        ref: "User"
      }],
    recommended: {
        type: String,
        default: ""
    },
    rated: {
        type: String,
        default: ""
    },
    compatibility: {
        type: String,
        default: ""
    }
});

const User: Model<UUser> = mongoose.models.User || mongoose.model<UUser>("User", userSchema);
export default User;