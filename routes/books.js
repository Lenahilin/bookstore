const express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const Book = require("../models/book");
const { getAllBooks, findBook, deleteBook } = require("../models/bookstore");

router.post(
  "/add",
  check("isbn").isISBN().withMessage("Invalid ISBN"),
  check("name").not().isEmpty().withMessage("Empty book name"),
  check("author")
    .isAlpha("en-US", { ignore: " -.," }),
  check("publication_date")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Publication date must be in the YYYY-MM-DD format"),
  check("description").not().isEmpty().withMessage("Empty description"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const book = new Book(
      req.body["isbn"],
      req.body["name"],
      req.body["author"],
      req.body["publication_date"],
      req.body["description"]
    );

    try {
      const msg = await book.save();
      res.status(200).send(msg);
    } catch (err) {
        res.status(500).send(err);
    }
  }
);

router.get("/all", (req, res) => {
  getAllBooks()
    .then((books) => {
      if (books.length === 0) {
        res.status(404).send("There are no books yet. You can add them by using the /books/add endpoint.");
      } else {
        res.status(200).send(books);
      }
    })
    .catch((err) => res.status(500).send(err));
});

router.put(
  "/update",
  check("isbn").isISBN().withMessage("Invalid ISBN"),
  check("name") // can be undefined, but not null or an empty string
    .if(check("name").exists())
    .not()
    .isEmpty(),
  check("author")
    .if(check("author").exists())
    .isAlpha("en-US", { ignore: " -.," }),
  check("publication_date")
    .if(check("publication_date").exists())
    .isDate({ format: "YYYY-MM-DD" }),
  check("description") // can be undefined, but not null or an empty string
    .if(check("description").exists())
    .not()
    .isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = {
      isbn: req.body["isbn"],
      name: req.body["name"],
      author: req.body["author"],
      publication_date: req.body["publication_date"],
      description: req.body["description"],
    };
    findBook(data["isbn"])
      .then((book) => book.update(data))
      .then((msg) => res.status(200).send(msg)) //TODO: figure out what the response should look like (empty/generic message/the updated value etc.?)
      .catch((err) => res.status(500).send(err));
  }
);

router.delete(
  "/delete",
  check("isbn").isISBN().withMessage("Invalid ISBN"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const msg = await deleteBook(req.body["isbn"]);
      res.status(204).send(msg);
    } catch (err) {
        res.status(err.status).send(err.msg);
    }
  }
);

module.exports = router;
