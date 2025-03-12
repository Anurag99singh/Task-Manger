const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
