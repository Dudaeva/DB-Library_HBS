const Genre = require("../models/Genre.model");

module.exports.genresController = {
  getGenres: async (req, res) => {
    try {
      const data = await Genre.find();
      res.json(data);
    } catch {
      res.json({ error: "Тимлид, Мансур допустил ошибку, убей его!" });
    }
  },
  addGenre: async (req, res) => {
    try {
      await Genre.create({
        genreName: req.body.genreName,
      });
      res.send("Жанр успешно внесён в библиотеку");
    } catch {
      res.json({ error: "Тимлид, Мансур допустил ошибку, убей его!" });
    }
  },
  editGenre: async (req, res) => {
    try {
      await Genre.findByIdAndUpdate(req.params.genreId, req.body);
      res.send("Жанр успешно изменён");
    } catch {
      res.json({ error: "Тимлид, Мансур допустил ошибку, убей его!" });
    }
  },
  removeGenre: async (req, res) => {
    try {
      await Genre.findByIdAndDelete(req.params.genreId);
      res.send("Жанр успешно удалён");
    } catch {
      res.json({ error: "Тимлид, Мансур допустил ошибку, убей его!" });
    }
  },
};
