const Book = require("../models/Book.model");
const Genre = require("../models/Genre.model");
const path = require("path");

module.exports.booksController = {
  addBook: async (req, res) => {
    try {
      await Book.create({
        nameBook: req.body.nameBook,
        genre: req.body.genre,
        text: req.body.text,
        years: req.body.years,
      });
      res.json("Книга добавлена");
    } catch {
      res.json({
        error: "Ошибка при добавлении новой книги",
      });
    }
  },
  removeBook: async (req, res) => {
    try {
      await Book.findByIdAndRemove(req.params.id);
      res.json("книга удалена");
    } catch {
      res.json({
        error: "Ошибка при удалении книги",
      });
    }
  },
  editBook: async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id, req.body);
      res.json("книга изменена");
    } catch {
      res.json({
        error: "Ошибка при изменении",
      });
    }
  },
  addImages: async (req, res) => {
    try {
      const { image } = req.files;
      const newFile = `/images/${Math.random() * 10000}${path.extname(
        image.name
      )}`;

      image.mv(`./public${newFile}`, async (err) => {
        if (err) {
          console.log(err);
        } else {
          const book = await Book.findById(req.params.id);
          book.pathToImage = newFile;
          await book.save();
          res.json("Файл загружен");
        }
      });
    } catch (err) {
      res.json(err);
    }
  },
  getBooks: async (req, res) => {
    try {
      const { page = 1, limit = 3 } = req.body;
      const books = await Book.find({})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const genres = await Genre.find().lean();
      res.render("home", {
        books,
        genres,
      });
    } catch {
      res.json({
        error: "Ошибка",
      });
    }
  },
  getBookById: async (req, res) => {
    try {
      const books = await Book.findById(req.params.id).lean();
      const genres = await Genre.find().lean();
      res.render("user", {
        books,
        genres,
      });
    } catch {
      res.json({
        error: "Ошибка",
      });
    }
  },
  getBooksByGenre: async (req, res) => {
    try {
      const books = await Book.find({ genre: req.params.id }).lean();
      const genres = await Genre.find().lean();
      res.render("menu", {
        books,
        genres,
      });
    } catch {
      res.json({
        error: "Ошибка",
      });
    }
  },
};
