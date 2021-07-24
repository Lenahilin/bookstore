const express = require('express');
const morgan = require('morgan');
const router = require('./routes/book');

const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use('/', router);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('🎉 app is listening on port ' + listener.address().port + ' 🎉')
});