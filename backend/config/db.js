const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mingodbdatabase:myaetherai@myaether.hlvjp.mongodb.net/");
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
