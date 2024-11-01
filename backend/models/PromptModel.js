const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
    prompt: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const PromptModel = mongoose.model("Prompt", promptSchema);
module.exports = PromptModel;
