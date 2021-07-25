const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');


router.post(
  '/add',
  check('isbn')
    .isISBN()
    .withMessage('Invalid ISBN'),
  check('name')
    .not().isEmpty()
    .withMessage('Empty book name'),
  check('author')
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
    console.log(req.body);
    return res.status(200).send(req.body);
});

router.get('/all', (req, res) => {
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
    }];
    return res.status(200).send(books);
});


module.exports = router;
