const express = require("express");
const booksControllers = require("../controllers/books-controllers");
const loansControllers = require("../controllers/loans-controllers");
const { ensureAuth } = require("../middlewares/auth-middleware");
const apiRouter = express.Router();

apiRouter.get("/books", booksControllers.index);
apiRouter.get("/books/:id", booksControllers.show);

apiRouter.post("/books", booksControllers.save);
apiRouter.put("/books/:id", booksControllers.update);
apiRouter.delete("/books/:id", booksControllers.delete);

apiRouter.get("/loans", loansControllers.index);
apiRouter.get("/loans/:id", loansControllers.show);
apiRouter.post("/loans", ensureAuth, loansControllers.save);
apiRouter.post("/loans/:id/return", loansControllers.return);
module.exports = apiRouter;
