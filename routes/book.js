const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


router.post(
  '/book/add',
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


module.exports = router;
