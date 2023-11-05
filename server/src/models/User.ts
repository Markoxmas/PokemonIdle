import mongoose, { Document, Model } from "mongoose";

interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: String,
  password: String,
});

const User: Model<User> = mongoose.model<User>("User", userSchema);

export default User;
