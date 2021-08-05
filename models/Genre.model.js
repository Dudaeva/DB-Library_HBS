const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  genreName: String,
},
{timestamps:true});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
