const { Router } = require("express");
const { genresController } = require("../controllers/genres.controller");

const router = Router();

router.get("/admin/genres", genresController.getGenres); //Получение всех жанров админом
router.post("/admin/genres", genresController.addGenre); //Добавление жанра админом
router.patch("/admin/genres/:genreId", genresController.editGenre); //Изменение жанра админом
router.delete("/admin/genres/:genreId", genresController.removeGenre); //Удаление жанра админом

module.exports = router;
