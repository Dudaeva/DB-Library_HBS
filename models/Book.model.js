const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  nameBook: String,
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  text:String,
  years:String,
  rentedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  pathToImage:String
},
 {timestamps:true});


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
