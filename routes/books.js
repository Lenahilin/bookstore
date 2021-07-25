const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Book = require('../models/book');

var books = [
  {
    "isbn": "0425198685",
    "name": "Pattern recognition",
    "author": "William Gibson",
    "publication_date": "2003-03-02",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam, turpis vel tincidunt tempus, massa nunc eleifend lorem, id viverra"
  }, 
  {
    "isbn": "9780765312181",
    "name": "Blindsight",
    "author": "Peter Watts",
    "publication_date": "2006-10-03",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl nibh, commodo tincidunt nisi eu, aliquet maximus elit. Aliquam porttitor orci quam. Duis urna ex."
  }
];

router.post(
  '/add',
  check('isbn')
    .isISBN()
    .withMessage('Invalid ISBN'),
  check('name')
    .not().isEmpty()
    .withMessage('Empty book name'),
  check('author') // TODO: add regex validation   .isAlpha('en-US', {ignore: ' -.,'}),
    .not().isEmpty()
    .withMessage('Empty author'),
  check('publication_date')
    .isDate({format: 'YYYY-MM-DD'})
    .withMessage('Publication date must be in the YYYY-MM-DD format'),
  check('description')
    .not().isEmpty()
    .withMessage('Empty description'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let book = new Book(req.body['isbn'], req.body['name'], req.body['author'], req.body['publication_date'], req.body['description']);
    console.log (`Saving ISBN ${book.isbn}, please wait...`);
    book.save()
      .then(msg => res.status(200).send(msg))
      .catch(err => res.status(500).send(err));
});

router.get('/all', (req, res) => {
  if (books.length == 0) {
    return res.status(200).send('There are no books yet. You can add them by using the /books/add endpoint.');
  }
  return res.status(200).send(books);
});

router.put('/update', 
  check('isbn')
  .isISBN()
  .withMessage('Invalid ISBN'),
  check('name') // can be undefined, but not null or an empty string
  .if(check('name').exists()) 
  .not().isEmpty(),
  check('author')
  .if(check('author').exists())
  .isAlpha('en-US', {ignore: ' -.,'}),
  check('publication_date')
  .if(check('publication_date').exists())
  .isDate({format: 'YYYY-MM-DD'}),
  check('description') // can be undefined, but not null or an empty string
  .if(check('description').exists())
  .not().isEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var book = {
      "isbn": "978-1-59780-158-4",
      "name": "The Windup Girl",
      "author": "Paolo Bacigalupi",
      "publication_date": "2009-09-01",
      "description": "...no description..."
    };
    for (const property in req.body) { //TODO: prevent creating new properties
      if (req.body[property] !== book[property]) {
        console.log(`updating ${property}`);
        book[property] = req.body[property];
      }
    }
    res.send(book);
});

router.delete('/delete', 
  check('isbn')
  .isISBN()
  .withMessage('Invalid ISBN'),
  (req, res) => {
    let index = books.findIndex(book => book['isbn'] === req.body['isbn']);
    console.log(index);
    if (index > -1) {
      books.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send('No such book');
    }
});


module.exports = router;
