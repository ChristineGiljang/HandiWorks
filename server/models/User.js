const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  displayName: { type: String },
  photoURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  userType: {
    type: String,
    enum: ["pro", "client"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
