const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    firstName: { type: String }, // Optional field
    lastName: { type: String }, // Optional field
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
