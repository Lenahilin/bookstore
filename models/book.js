module.exports = class Book {
  constructor(isbn, name, author, publication_date, description) {
    this.isbn = isbn;
    this.name = name;
    this.author = author;
    this.publication_date = publication_date;
    this.description = description;
  }

  save() {
    const delay = Math.floor(Math.random() * 1000);
    return new Promise((resolve, reject) => {
      if (Math.random() < 0.5) { // 50% success rate
        setTimeout(() => {
          reject("Saving the book failed, please try again");
          console.error(`Saving ISBN ${this.isbn} failed`);
        }, delay);
      } else {
        setTimeout(() => {
          resolve("The book was saved succesfully");
          console.log(`Saving ISBN ${this.isbn} succeeded`);
        }, delay);
      }
    });
  }

  update(data) {
    const delay = Math.floor(Math.random() * 1000);
    return new Promise((resolve, reject) => {
      if (Math.random() < 0.2) { // simulating a lower error rate here && rejecting immediately
        reject({ status: 500, msg: "Updating the book failed, please try again" })
        console.error(`Updating ISBN ${this.isbn} failed`);
      } else {
        for (const property in data) {
          if (
            data[property] !== undefined &&
            this[property] !== data[property]
          ) {
            console.log(`Updating ${property} of ISBN ${this.isbn}`);
            // this[property] = data[property];
          }
        }
        setTimeout(() => {
          resolve("The book was updated succesfully");
          console.log(`Updating ISBN ${this.isbn} succeeded`);
        }, delay);
      }
    });
  }
};
