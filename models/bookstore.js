const Book = require("./book");

var books = [
  new Book(
    "0425198685",
    "Pattern recognition",
    "William Gibson",
    "2003-03-02",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam, turpis vel tincidunt tempus, massa nunc eleifend lorem, id viverra"
  ),
  new Book(
    "9780765312181",
    "Blindsight",
    "Peter Watts",
    "2006-10-03",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl nibh, commodo tincidunt nisi eu, aliquet maximus elit. Aliquam porttitor orci quam. Duis urna ex."
  ),
  new Book(
    "978-1-59780-158-4",
    "The Windup Girl",
    "Paolo Bacigalupi",
    "2009-09-01",
    "...no description..."
  ),
];

getAllBooks = () => {
  const delay = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.1) {
      console.error("Getting books failed");
      reject("Getting books failed, please try again");
    } else {
      setTimeout(() => {
        resolve(books);
      }, delay);
    }
  });
};

findBook = (isbn) => {
  return new Promise((resolve, reject) => {
    const book = books.find((b) => b["isbn"] === isbn);
    if (book === undefined) {
      reject("No such book");
    } else {
      resolve(book);
    }
  });
};

deleteBook = (isbn) => {
  const delay = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    const index = books.findIndex((book) => book["isbn"] === isbn);
    if (index == -1) {
      console.error(`Deleting ISBN ${isbn} failed: no such book`);
      reject({ status: 404, msg: "No such book" });
    } else {
      books.splice(index, 1);
      if (Math.random() < 0.05) {
        console.log(`Deleting ISBN ${isbn} failed`);
        reject({ status: 500, msg: "Something went wrong" });
      } else {
        console.log(`Deleting ISBN ${isbn} succeeded`);
        setTimeout(() => {
          resolve(`ISBN ${isbn} deleted successfully`);
        }, delay);
      }
    }
  });
};

module.exports = { getAllBooks, findBook, deleteBook };
