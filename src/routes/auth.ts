//@ts-nocheck

import express from "express";
import { User } from "../models/User.ts";
import jwt from "jsonwebtoken";

const router = express.Router();
const jWT_SECRET = process.env.JWT_SECRET;

router.post("/auth", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if username exists (for example)
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Create the user (for example)
    const newUser = await User.create(username, password);

    // Respond with success
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "An error occurred while signing up" });
  }
});

export default router;
