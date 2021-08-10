const { Router } = require("express");
const { booksController } = require("../controllers/books.controller");

const router = Router();

router.post("/admin/books", booksController.addBook);
router.post("/admin/books/:id", booksController.addImages);
router.patch("/admin/books/:id", booksController.editBook);
router.delete("/admin/books/:id", booksController.removeBook);

//router.get("/clients/books", booksController.getBooks);
router.get("/clients/610a829b9bd0ffe408c62352/books", booksController.getBooks);
router.get("/clients/books/:id", booksController.getBookById);
router.get("/books/genres/:id", booksController.getBooksByGenre);

module.exports = router;
