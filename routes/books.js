const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const Book = require('../models/book');
const { getAllBooks, deleteBook, findBook } = require('../models/bookstore');


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
    book.save()
      .then(msg => res.status(200).send(msg))
      .catch(err => res.status(500).send(err));
});

router.get('/all', (req, res) => {
  getAllBooks()
  .then(books => books.length == 0 ? res.status(404).send('There are no books yet. You can add them by using the /books/add endpoint.') : res.status(200).send(books))
  .catch(err => res.status(500).send(err));
});

/* NOTE: a book is not actually getting updated here, changes are not propagated to the test data array as per the task */
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

    let data = {
      "isbn": req.body['isbn'],
      "name": req.body['name'],
      "author": req.body['author'],
      "publication_date": req.body['publication_date'],
      "description": req.body['description']
    };
    // let book = books.find(b => b['isbn'] === data['isbn']);
    // if (book == undefined) {
    //   return res.status(404).send('There is no book to update');
    // } else {
    //     book.update(data)
    //     .then(msg => res.status(200).send(msg)) 
    //     .catch(err => res.status(500).send(err));
    // }

    findBook(data['isbn'])
    .then(book => book.update(data))
    .then(msg => res.status(200).send(msg)) //TODO: figure out what the response should look like (empty/generic message/the updated value etc.?)
    .catch(err => res.status(500).send(err));

});

/* In a real case both searching & deleting the book should be handled asynchronously */
router.delete('/delete', 
  check('isbn')
  .isISBN()
  .withMessage('Invalid ISBN'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    deleteBook(req.body['isbn'])
    .then(msg => res.status(204).send(msg))
    .catch(err => res.status(404).send(err));
});

module.exports = router;
