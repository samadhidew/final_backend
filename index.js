const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const timeRoute = require("./routes/time");
const cors = require('cors');
const path = require('path');

dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB")
});

//middleware
app.use(cors());
app.use(express.json());



app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/time", timeRoute);


app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});


