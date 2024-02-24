const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connected");
});

connection.on("error", (error) => {
  console.log("Error in connecting to database", error);
});

module.exports = mongoose;