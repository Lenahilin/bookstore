const Book = require('./book');

var books = [
  new Book("0425198685", "Pattern recognition", "William Gibson", "2003-03-02", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam, turpis vel tincidunt tempus, massa nunc eleifend lorem, id viverra"),
  new Book("9780765312181", "Blindsight", "Peter Watts", "2006-10-03", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl nibh, commodo tincidunt nisi eu, aliquet maximus elit. Aliquam porttitor orci quam. Duis urna ex."),
  new Book("978-1-59780-158-4", "The Windup Girl", "Paolo Bacigalupi", "2009-09-01", "...no description...")
];

getAllBooks = () => {
  var delay = Math.floor(Math.random() * 1000);
  return new Promise( (resolve, reject) => {
    if (Math.random() < 0.1) {
      console.error('Getting books failed, please try again');
      reject('Getting books failed, please try again');
    } else {
      setTimeout(() => {
        resolve(books);
      }, delay);
    }
  });
}

findBook = (isbn) => {
  return new Promise((resolve, reject) => {
    let book = books.find(b => b['isbn'] === isbn);
    if (book == undefined) {
      reject('No such book');
    } else {
      resolve(book);
    }
  });
}

deleteBook = (isbn) => {
  let index = books.findIndex(book => book['isbn'] === isbn);
  return new Promise ( (resolve, reject) => {
    if (index == -1) {
      console.error(`Deleting ISBN ${req.body['isbn']} failed: no such book`);
      reject('No such book');
    } else {
      books.splice(index, 1);
      console.log(`Deleting ISBN ${req.body['isbn']} succeeded`);
      resolve(`ISBN ${isbn} deleted successfully`);
    }
  });
}

module.exports = {getAllBooks, deleteBook, findBook};