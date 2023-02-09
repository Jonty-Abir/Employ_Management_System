import mongoose, { model, models } from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Required*"],
    },
    email: {
      type: String,
      required: [true, "Required*"],
      unique: [true ,"Email allready used"],
    },
    lastname: {
      type: String,
      required: [true, "Required*"],
    },
    avatar: String,
    email: {
      type: String,
      required: [true, "Required*"],
    },
    sallery: {
      type: Number,
      required: [true, "Required*"],
    },
    date: {
      type: String,
      required: [true, "Required*"],
    },
    status: {
      type: String,
      required: [true, "Required*"],
    },
  },
  { timestamps: true }
);

const Users = models.developer || model("developer", userSchema);

export default Users;
