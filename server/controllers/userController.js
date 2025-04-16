const User = require("../models/User"); // Assuming you have a User model

// Function to handle saving a user based on the request type
const saveUser = async (req, res) => {
  try {
    const { email, name, uid, photo, userType } = req.body;

    // Check if it's a Google signup (check for the presence of Google-specific fields)
    if (uid && name && photo) {
      // Google sign-up logic
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const newUser = new User({
        email,
        name,
        uid,
        photo,
        userType: userType || "client", // Default to "client" if not provided
      });

      await newUser.save();
      return res.status(200).json(newUser);
    }

    // Email/password signup logic (for cases where only email is provided)
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const newUser = new User({ email, userType });

      await newUser.save();
      return res.status(200).json(newUser);
    }

    // If neither email nor Google-specific fields are present
    return res.status(400).json({ error: "Invalid user data" });
  } catch (error) {
    console.error("Error saving user:", error);
    return res
      .status(500)
      .json({ error: "Failed to save user data to backend" });
  }
};

module.exports = {
  saveUser,
};
