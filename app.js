const express = require("express");
require("dotenv").config();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Campground = require("./models/campground.model.js");
const methodiOverride = require("method-override");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodiOverride("_method"));

mongoose.connect(process.env.MONGOLOCAL, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Takes us to the Home Page
app.get("/", (req, res) => {
  res.render("home");
});
// Takes us to the Campgrounds Index Page
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});
// Takes us to the New Campground Form
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});
// Create us  the new Campground based on the form submitted
app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});
// Takes us to the Show Page of a specific Campground
app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});
app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});
app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});
app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
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
