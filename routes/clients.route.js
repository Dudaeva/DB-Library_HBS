const { Router } = require("express");
const { clientsController } = require("../controllers/clients.controller");

const router = Router();

router.get("/admin/clients/:id", clientsController.getClientById);
router.get("/admin/clients", clientsController.getClients); //Получение списка клиентов
router.post("/clients", clientsController.addClient); //Добавление клиента

router.get("/",clientsController.getLogin)
router.get("/admin/clients/:clientId/takeAwayBook/",clientsController.banClientAndTakeAwayBook); //Отобрать книгу и заблокировать клиента
router.get("/admin/clients/:clientId/unban", clientsController.unbanClient); //Разблокировать клиента
router.get("/clients/:clientId/books/:bookId/rent", clientsController.rentBook); //Арендовать книгу
router.get("/clients/:clientId/return", clientsController.returnBook); //Вернуть книгу

module.exports = router;
