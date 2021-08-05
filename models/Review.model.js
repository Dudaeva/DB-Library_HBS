const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  text: String,
},
{timestamps:true});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
