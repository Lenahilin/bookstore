# bookstore

## Usage

```
$ npm install
$ npm run
```

or via Docker

```
$ docker build . -t bookstore
$ docker run -p 3000:3000 bookstore
```

## POST /books/add

### params

| param                | description                                                                      | mandatory? |
| -------------------- | -------------------------------------------------------------------------------- | ---------- |
| **isbn**             | a valid ISBN string                                                              | yes        |
| **name**             | any non-empty string                                                             | yes        |
| **author**           | a string containing only letters (a-zA-Z) and any of the following chars: [ -.,] | yes        |
| **publication_date** | a date in the YYYY-MM-DD format                                                  | yes        |
| **description**      | any string                                                                       | yes        |

### response

200 Saving the book succeeded

500 Saving the book failed

## GET /books/all

### params

None

### response

200 List of all books

404 No books found

500 Getting books failed

## PUT /books/update

### params

| param                | description                                                                        | mandatory? |
| -------------------- | ---------------------------------------------------------------------------------- | ---------- |
| **isbn**             | a valid ISBN string                                                                | yes        |
| **name**             | any non-empty string                                                               | no         |
| **author**           | any string containing only letters (a-zA-Z) and any of the following chars: [ -.,] | no         |
| **publication_date** | a date in the YYYY-MM-DD format                                                    | no         |
| **description**      | any string                                                                         | no         |

### response

200 The book was updated succesfully

404 No book to update

500 Updating the book failed

## DELETE /books/delete

### params

| param    | description         | mandatory? |
| -------- | ------------------- | ---------- |
| **isbn** | a valid ISBN string | yes        |

### response

200 The book was deleted succesfully

404 No book to delete

500 Deleting the book failed
