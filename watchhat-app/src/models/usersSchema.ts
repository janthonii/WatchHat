import mongoose, { Schema, Document, Model } from "mongoose";

interface UUser extends Document {
    username: string;
    password: string;
    friends: mongoose.Types.ObjectId[]; // Reference to other Users - a string array of the friend's ids
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
      }]
});

const User: Model<UUser> = mongoose.models.User || mongoose.model<UUser>("User", userSchema);
export default User;