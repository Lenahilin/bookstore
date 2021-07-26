const express = require("express");
const morgan = require("morgan");
var books_router = require("./routes/books");

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use("/books", books_router);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("🎉 app is listening on port " + listener.address().port + " 🎉");
});
