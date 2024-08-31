const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground.model.js");

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
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Seeding Route
// app.get("/makeCampgrounds", async (req, res) => {
//   const camp = new Campground({ title: "my ass", desc: "free booty" });
//   await camp.save();
//   res.send(camp);
// });
