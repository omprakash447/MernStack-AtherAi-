const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

// User Registration
router.post("/gemeni/user", async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        req.session.userId = user._id;
        res.status(201).send("User registered successfully!");
    } catch (err) {
        res.status(500).send("Error occurred while registering user.");
        console.error(err);
    }
});

// User Login
router.post("/login/user", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || user.password !== password) return res.status(404).send("Invalid credentials.");
        req.session.userId = user._id;
        res.send("Login successful.");
    } catch (err) {
        res.status(500).send("Error occurred during login.");
        console.error(err);
    }
});

// User Logout
router.post("/gemeni/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(404).send("Error logging out.");
        res.clearCookie("connect.sid");
        res.send("Logout successful.");
    });
});

module.exports = router;
