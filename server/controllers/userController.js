const User = require("../models/User");

const googleSignIn = async (req, res) => {
  try {
    const { name, email, photo, uid, userType } = req.body;

    // Validate data
    if (!name || !email || !uid | !userType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      photo,
      uid,
      userType,
    });

    await newUser.save();
    return res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.error("Error in Google sign-in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const emailSignUp = async (req, res) => {
  try {
    const { email, name, uid, photo, userType } = req.body;

    // Validate incoming data
    if (!email || !name || !uid || !userType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists in the DB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      email,
      name,
      uid,
      photo,
      userType,
    });

    await newUser.save();
    return res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.error("Error in email sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  googleSignIn,
  emailSignUp,
};
