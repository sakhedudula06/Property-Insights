import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      maxlength: 30
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

    }
  },
  {
    timestamps: true
  }
)

userSchema.pre("save", async () => {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async () => {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("user", userSchema);