const Client = require("../models/Client.model");
const Book = require("../models/Book.model");

module.exports.clientsController = {
  getClients: async (req, res) => {
    try {
      const data = await Client.find().populate("rentedBooks").lean();
      res.render("admin", {
        data,
      });
    } catch {
      res.json({ error: "Не удалось найти клиентов" });
    }
  },
  getClientById: async (req, res) => {
    try {
      const data = await Client.findById.populate("rentedBooks").lean();
      const books = await Book.find({ rentedBooks: req.params.id }).lean();
      res.render("singleClient", {
        data,
        books,
      });
    } catch {
      res.json({
        error: "Ошибка",
      });
    }
  },

  addClient: async (req, res) => {
    try {
      await Client.create({ clientName: req.body.clientName });
      res.send("Клиент успешно добавлен");
    } catch {
      res.json({ error: "Не удалось добавить клиента" });
    }
  },

  banClientAndTakeAwayBook: async (req, res) => {
    try {
      await Client.findByIdAndUpdate(req.params.clientId, {
        isBlocked: true,
        $pull: { rentedBooks: req.params.bookId },
      });
      await Book.findByIdAndUpdate(req.params.bookId, { rentedId: null });

      //res.send("Клиент был успешно заблокирован, а его книга была возвращена в библиотеку");
      res.redirect("");
    } catch {
      res.json({
        error: "Не удалось заблокировать клиента и отобрать у него книгу",
      });
    }
  },

  unbanClient: async (req, res) => {
    try {
      await Client.findByIdAndUpdate(req.params.clientId, { isBlocked: false });
      res.send("Клиент успешно разблокирован");
    } catch {
      res.json({ error: "Не удалось разблокировать клиента" });
    }
  },

  rentBook: async (req, res) => {
    try {
      const rentedId = await Client.findById(req.params.bookId, "rentedId");
      const isBlocked = await Client.findById(req.params.clientId, "isBlocked");
      const rentedBooks = await Client.findById(
        req.params.clientId,
        "rentedBooks"
      );

      if (isBlocked) {
        //Если клиент заблокирован
        res.json({
          error: "Не удалось арендовать книгу, т.к Вы заблокированы!",
        });
      } else if (rentedBooks.length >= 3) {
        //Если у клиента уже более 3 арендованных книг
        res.json({ error: "Нельзя арендовать более 3-х книг одновременно" });
      } else if (rentedId.length > 1) {
        //Если книга уже кем-то арендована
        res.json({
          error: "Не удалось арендовать книгу, т.к она уже арендована",
        });
      } else {
        const rented = await Client.findByIdAndUpdate(req.params.clientId, {
          $push: { rentedBooks: req.params.bookId },
        });
        const rentBook = await Book.findByIdAndUpdate(req.params.bookId, {
          rentedId: req.params.clientId,
        });

        res.redirect("localhost:3000/users/books{{_id}}", {
          rentBook,
          rented,
        });
      }
      //alert ("Книга успешно арендована")
    } catch {
      res.json({ error: "Не удалось арендовать книгу" });
    }
  },

  returnBook: async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.bookId, { rentedId: "" });
      await Client.findByIdAndUpdate(req.params.clientId, {
        $pull: { rentedBooks: req.params.bookId },
      });

      //res.send("Книга успешно возвращена");
      res.redirect("localhost:3000/users/books{{_id}}");
    } catch {
      res.json({ error: "Не удалось вернуть книгу" });
    }
  },
};
