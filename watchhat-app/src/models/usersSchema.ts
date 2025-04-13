import mongoose, { Schema, Document, Model } from "mongoose";

interface UUser extends Document {
    username: string;
    password: string;
    friends: String[]; // Reference to other Users - a string array of the friend's ids
}

const userSchema = new Schema<UUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    friends: [{
        type: [String],
        ref: "User"
    }]
});

const User: Model<UUser> = mongoose.models.User || mongoose.model<UUser>("User", userSchema);
export default User;