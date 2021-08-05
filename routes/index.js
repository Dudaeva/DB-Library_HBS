const { Router } = require("express");

const router = Router();

router.use(require("../routes/genres.route"));
router.use(require("../routes/books.route"));
router.use(require("../routes/clients.route"));
router.use(require("../routes/reviews.route"));

module.exports = router;