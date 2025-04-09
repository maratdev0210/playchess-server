import express from "express";
import { User } from "./models/User.ts"; // Ensure this import path is correct
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["GET", "POST"], // Allowed methods
  })
);

app.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received request:", req.body); // Add this line to log the request

  try {
    // Example logic
    const user = await User.create(username, password);
    res.status(201).json({ username: user.username, id: user.id });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});
