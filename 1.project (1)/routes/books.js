const express = require("express");
const router = express.Router();

let library = {
  bookList: ['Tulasidas Ramayana','Dummy Book'],
};
let startTime = 0;
let finalObject = {};

/**
 * Get all the list of books in a library
 */
router.get("/bookList", async (req, res) => {
  try {
    let list = await getBookList();
    res.send(list);
  } catch (error) {
    res.send(error);
  }
});

/**
 * Get particular books through index of an array
 */
router.get("/bookList/:index", async (req, res) => {
  try {
    let index = req.params.index || "";
    let individualBook = await getBookList(index);
    res.send(individualBook);
  } catch (error) {
    res.send(error);
  }
});

/**
 * To insert new book into an array
 */
router.post("/bookList", async (req, res) => {
  try {
    let bookName = req.body.book;
    let insertBook = await insertingBook(bookName);
    let response = {
      message: insertBook,
      data: library
    }
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

/**
 * To update exsisting book name with new name
 */
router.patch("/bookList", async (req, res) => {
  try {
    let originalBook = req.body.original_book || "";
    let newBook = req.body.new_book || "";
    let insertBook = await updatedBook(originalBook, newBook);
    res.send(insertBook);
  } catch (error) {
    res.send(error);
  }
});

/**
 * To delete a particular book through book name
 */
router.delete("/bookList", async (req, res) => {
  try {
    let bookName = req.body.book;
    let deletedBook = await deleteBook(bookName);
    let response = {
      message: deletedBook,
      data: bookName
    }
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

/**
 * Put Method
 */
router.put("/bookList", async (req, res) => {
  try {
    startTime = new Date().getTime();
    if (library.bookList.length > 0) {
      for (let i = 0; i < library.bookList.length; i++) {
        let bookname = library.bookList[i];
        await saveItemOnDataBase(bookname, getElapsedTime);
        if (i == library.bookList.length - 1) {
          res.send(finalObject);
        }
      }
    } else {
      res.send(
        `No books are available in an book list to perform PUT operation`
      );
    }
  } catch (error) {
    res.send(error);
  }
});

/**
 * @author Nithin
 * @param {*} index index of the the book inside the array as optional paramter
 * @returns book name of particular index if index is available otherwise entire array
 */
async function getBookList(index = "nothing") {
  try {
    return new Promise((resolve, reject) => {
      if (index != "nothing") {
        if (index < library.bookList.length) {
          resolve(library.bookList[index]);
        } else {
          reject(`There is no book under ${index} index`);
        }
      } else {
        resolve(library);
      }
    });
  } catch (err) {
    res.error("something went wrong inside getBookList function", err);
  }
}

/**
 * @author Nithin
 * @param {*} book consist of book name which needs to pass into an array
 * @returns
 */
async function insertingBook(book) {
  try {
    return new Promise(async (resolve, reject) => {
      if (book && book.length > 0 && !Array.isArray(book)) {
        let isMatch = await checkBookList(book);
        if (isMatch) {
          reject(`Library already consist of a book with '${book}' name`);
        } else {
          library.bookList.push(book);
          resolve(`Successfully '${book}' book is inserted to book list`);
        }
      } else {
        reject(`There is no proper data to insert in an book list ${book}`);
      }
    });
  } catch (err) {
    res.error("something went wrong inside insertingBook function", err);
  }
}

/**
 * @author Nithin
 * @param {*} originalBook consist of name of a book which needs to be replaced
 * @param {*} newBook consist of name of a book which will replace the original book
 * @returns
 */
async function updatedBook(originalBook, newBook) {
  try {
    return new Promise(async (resolve, reject) => {
      if (originalBook && newBook) {
        let books = library.bookList;
        let isMatch = await checkBookList(originalBook);
        if (isMatch) {
          books.splice(books.indexOf(originalBook), 1, newBook);
          resolve(`'${originalBook}' book name is replace with '${newBook}' book name`);
        } else {
          reject(`'${originalBook}' book name is not at all present inside the book list`);
        }
      } else {
        reject(`Either Original book name or New book name are missing`);
      }
    });
  } catch (err) {
    res.error("something went wrong inside insertingBook function", err);
  }
}

/**
 * @author Nithin
 * @param {*} book consit of name of the book which needs to be deleted
 * @returns
 */
async function deleteBook(book) {
  try {
    return new Promise(async (resolve, reject) => {
      let bookLst = library.bookList;
      let isMatch = await checkBookList(book);
      if (isMatch) {
        bookLst.splice(bookLst.indexOf(book), 1);
        resolve(`${book} book has been deleted from an book list`);
      } else {
        reject(`${book} book is not at all present in an book list to delete`);
      }
    });
  } catch (err) {
    res.error("something went wrong inside insertingBook function", err);
  }
}

/**
 * @author Nithin
 * @param {*} name of the each book is passed from book list
 * @param {*} myCallback function helps us to calculate elapsedTime
 * @returns
 */
async function saveItemOnDataBase(name, myCallback) {
  try {
    return new Promise(async (resolve, reject) => {
      let num = Math.random() * name.length;
      setTimeout(async () => {
        await myCallback(name);
        resolve();
      }, num);
    });
  } catch (err) {}
}

/**
 * @author Nithin
 * @param {*} name of the each book in a book list
 * @returns
 */
async function getElapsedTime(name) {
  return new Promise(async (resolve, reject) => {
    let elapsed = new Date().getTime() - startTime;
    finalObject[name] = elapsed;
    resolve();
  });
}

/**
 * @author Nithin
 * @param {*} book name will help us to check the duplication of book in library
 * @returns 
 */
async function checkBookList(book) {
  return new Promise(async (resolve, reject) => {
    if (library.bookList && library.bookList.length > 0) {
      let isMatch = library.bookList.find(
        (el) => el.toLowerCase() === book.toLowerCase()
      );
      resolve(isMatch);
    } else {
      resolve(false);
    }
  });
}

module.exports = router;
