const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGOLOCAL, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Hello YELP CAMP");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
