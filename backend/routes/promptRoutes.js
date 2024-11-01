const express = require("express");
const router = express.Router();
const PromptModel = require("../models/PromptModel");

// Save user prompt
router.post("/userprompt", async (req, res) => {
    try {
        const prompt = new PromptModel({
            prompt: req.body.prompt,
            userId: req.session.userId,
        });
        await prompt.save();
        res.status(201).send("Prompt saved successfully.");
    } catch (err) {
        res.status(500).send("Error occurred while saving prompt.");
        console.error(err);
    }
});

// Fetch all prompts of the authenticated user
router.get("/userprompt/input", async (req, res) => {
    try {
        const prompts = await PromptModel.find({ userId: req.session.userId });
        res.status(200).json(prompts);
    } catch (err) {
        res.status(500).send("Error occurred while fetching prompts.");
        console.error(err);
    }
});

module.exports = router;
