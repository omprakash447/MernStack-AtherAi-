// config/sessionConfig.js
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config(); // Load environment variables

const sessionConfig = session({
    secret: process.env.SESSION_SECRET || "defaultSecret", // Uses the secret from .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,  // MongoDB URI from .env file
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  // 1 day
        httpOnly: true,
        secure: false,
    },
});

module.exports = sessionConfig;
