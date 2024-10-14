const HttpError = require("../errors/HttpError");

const uuid = require("uuid").v4;

let books = [
  { id: "1", title: "Bíblia", author: "Jesus", quantityAvailable: 10 },
  { id: "2", title: "Harry Potter", author: "Sla", quantityAvailable: 5 },
];

module.exports = {
  getAllBooks: () => books.map((book) => ({ id: book.id, title: book.title })),

  getBookById: (id) => books.find((book) => book.id === id),

  createBook: (title, author, quantityAvailable) => {
    const newBook = {
      id: uuid(),
      title,
      author,
      quantityAvailable,
    };
    books.push(newBook);
    return newBook;
  },

  updateBook: (id, updatedBook) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new HttpError(404, "Livro não encontrado");
    }
    books[bookIndex] = { ...books[bookIndex], ...updatedBook };
    return books[bookIndex];
  },

  deleteBook: (id) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new HttpError(404, "Livro não encontrado no sistema");
    }
    const deletedBook = books[bookIndex];
    books = books.filter((book) => book.id !== id);
    return deletedBook;
  },

  takeBook: (id) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new HttpError(404, "Livro não encontrado no sistema");
    }
    books[bookIndex].quantityAvailable -= 1;
  },

  returnBook: (id) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new HttpError(404, "Livro não encontrado no sistema");
    }
    books[bookIndex].quantityAvailable += 1;
  },
};
