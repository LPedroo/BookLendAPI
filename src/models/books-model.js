const HttpError = require("../errors/HttpError");

const uuid = require("uuid").v4;

let books = [
  { id: "1", title: "Bíblia", author: "Desconhecido", quantityAvailable: 10 },
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
    // Se o livro for encontrado, ele será atualizado. Esse código usa o spread operator (...) para combinar o livro original (books[bookIndex]) com os valores do objeto updatedBook.
    // As propriedades de updatedBook sobrescrevem as do livro original onde houver coincidências.
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
