import mongoose from "mongoose";
export interface UserType extends mongoose.Document {
  discordId: number;
  name: string;
  current: boolean;
  vc: "String" | undefined;
}

const UserSchema = new mongoose.Schema({
  discordId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  joined:{
    type:Date,
    required:true,
    default:Date.now(),
  },
  current: {
    type: Boolean,
    required: true,
  },
  vc: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model<UserType>("User", UserSchema);
export default User;
