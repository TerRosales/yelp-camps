const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore officiis laudantium in placeat deserunt architecto facere nihil neque voluptate dolor.",
  },
  image: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Campground", CampgroundSchema);
