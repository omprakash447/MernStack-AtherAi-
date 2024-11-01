require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./config/db"); // Assuming connectDB is defined
const sessionConfig = require("./config/sessionconfig"); // Import session config

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const promptRoutes = require("./routes/promptRoutes");

const server = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
connectDB();

// Middleware setup
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(bodyParser.json());
server.use(sessionConfig); // Use session config as middleware

// Routes
server.use(authRoutes);
server.use(userRoutes);
server.use(promptRoutes);

// Serve static files and client-side routing
const buildPath = path.join(__dirname, "../../googlegemeni/build");
server.use(express.static(buildPath));
server.get("*", (_req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
