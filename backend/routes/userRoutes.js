const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

// Fetch all users
router.get("/gemeni/user", async (_req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send("Error occurred while fetching users.");
        console.error(err);
    }
});

// Get authenticated user
router.get("/gemeni/Authenticateduser", async (req, res) => {
    if (!req.session.userId) return res.status(400).send("User ID not found in session.");
    try {
        const user = await UserModel.findById(req.session.userId).select("-password");
        if (!user) return res.status(404).send("User not found.");
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred.");
    }
});

module.exports = router;
