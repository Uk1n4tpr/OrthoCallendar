const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const PORT = 8000;
const session = require("express-session");
const path = require("path");
const cors = require("cors");

const app = express();

//Mongoose conection

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cors config
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", //replace with actual url
  })
);

//Routes
app.use("/", require("./routes/auth"));

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
