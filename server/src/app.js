const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const auth = require("./midleware/auth");

//.env
const config = require("../config");

//routes
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

//public data
app.use(express.static("./src/public"));

//routes11
app.use("/users", userRoutes);
app.use("/recipes", auth, recipeRoutes);
app.use("/uploads", express.static("uploads"));

//base connection
mongoose
  .connect(config.mongo)
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  })
  .catch((err) => {
    console.log(err);
  });
