const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(
  cors({
    origin: "*", // Temporary, remove later
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB error:", err);
  });

app.get("/", (req, res) => {
  res.send("HandiWorks backend is running!");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
