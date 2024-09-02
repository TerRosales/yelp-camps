// Seeding index.js
const mongoose = require("mongoose");
require("dotenv").config();
const Campground = require("../models/campground.model.js");
const cities = require("./cities.js");
const { places, descriptors } = require("./seedHelpers.js");

mongoose.connect(process.env.MONGOLOCAL, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  //    ADDS 1

  //   const c = new Campground({ title: "Purple Tities" });
  //   await c.save();
  //   console.log(`${c} has been saved`);

  //   ADDS 50

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  console.log("Database has been seeded, closing connection");
  mongoose.connection.close();
});
