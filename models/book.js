module.exports = class Book {
  constructor(isbn, name, author, publication_date, description) {
    this.isbn = isbn;
    this.name = name;
    this.author = author;
    this.publication_date = publication_date;
    this.description = description;
  }

  save() {
    var delay = Math.floor(Math.random() * 1000);
    return new Promise( (resolve, reject) => {
      if (Math.random() < 0.5) { // 50% success rate
        setTimeout(() => {
          reject('Saving the book failed, please try again');
          console.error(`Saving ISBN ${this.isbn} failed`);
        }, delay);
      } else {
        setTimeout(() => {
          resolve('The book was saved succesfully');
          console.log(`Saving ISBN ${this.isbn} succeeded`);
        }, delay);
      }
    });
  }
};