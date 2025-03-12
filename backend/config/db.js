const mongoose = require("mongoose");
// require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://anuragsinghisgood:AJzVYI5aDvZpaJ3N@task-manger.3p9ap.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manger"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
// await mongoose.connect(process.env.MONGO_URI);
