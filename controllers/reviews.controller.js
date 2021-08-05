const Review = require("../models/Review.model");

module.exports.reviewsController = {
  addReviews: async (req, res) => {
    try {
      await Review.create({
        client: req.body.client,
        book: req.body.book,
        text: req.body.text,
      });
      res.json("Отзыв добавлен");
    } catch {
      res.json("Ошибка добавления отзыва");
    }
  },
  getReviews: async (req, res) => {
    try {
      const reviews = await Review.findById({ book: req.params.id });
      res.json(reviews);
    } catch {
      res.json("error");
    }
  },
};