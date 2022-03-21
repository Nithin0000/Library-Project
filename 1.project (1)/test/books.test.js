const expect = require("chai").expect;
const axios = require("axios");

describe("Books API", () => {
  /**
   * STEP:1 GET METHOD TEST
   */
  it("It should get Library object", () => {
    return axios.get("http://localhost:3002/booklist").then((resp) => {
      console.log(resp.data);
      expect(resp.data).to.be.an("object");
      expect(resp.data).to.have.own.property("bookList");
      expect(resp.data).to.have.own.property("bookList").to.be.an("array");
    });
  });

  /**
   * STEP:2 POST METHOD SUCCESS
   */
  it("It should insert a book to Library object under bookList property", () => {
    let insertObject = { book: "Half Girlfriend" };
    return axios
      .post("http://localhost:3002/booklist", insertObject)
      .then((resp) => {
        console.log(resp.data);
        expect(resp.data.message).to.be.an("string");
        expect(resp.data.data).to.be.an("object");
        expect(resp.data.data).to.have.own.property("bookList");
        expect(resp.data.data)
          .to.have.own.property("bookList")
          .to.be.an("array");
      });
  });

  /**
   * STEP:3 POST METHOD FAILURE DUE TO DUPLICATION OF BOOK
   */
  it("Post method failed due to duplication of book", () => {
    let insertObject = { book: "Half Girlfriend" };
    return axios
      .post("http://localhost:3002/booklist", insertObject)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.equal(
          "Library already consist of a book with 'Half Girlfriend' name"
        );
      });
  });

  /**
   * STEP:4 POST METHOD FAILURE DUE TO EMPTY BOOK NAME
   */
  it("Post method failed due to empty book name", () => {
    let insertObject = { book: "" };
    return axios
      .post("http://localhost:3002/booklist", insertObject)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.equal(
          "There is no proper data to insert in an book list"
        );
      });
  });

  /**
   * STEP:5 POST METHOD FAILURE DUE TO SYNTAX OF QUERY
   */
  it("Post method failed due to proper syntax of query is missing", () => {
    let insertObject = { books: "MAHABARATHA" };
    return axios
      .post("http://localhost:3002/booklist", insertObject)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.equal(
          "There is no proper data to insert in an book list"
        );
      });
  });

  /**
   * STEP:6 GET METHOD WITH ID
   */
  it("It should get particular book from the library", () => {
    return axios.get("http://localhost:3002/booklist/1").then((resp) => {
      console.log(resp.data);
      expect(resp.data).to.be.an("string");
    });
  });

  /**
   * STEP:7 GET METHOD WITH INAVLID ID
   */
  it("It should get error if particlar index is not available", () => {
    return axios
      .get("http://localhost:3002/booklist/6")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.equal("There is no book under 6 index");
      });
  });

  /**
   * STEP:8 PATCH METHOD TO UPDATE THE EXSISTING BOOK NAME
   */
  it("It should update particular book name in the library", () => {
    let updateBook = {
      original_book: "Tulasidas Ramayana",
      new_book: "Valmiki Ramayana",
    };
    return axios
      .patch("http://localhost:3002/booklist", updateBook)
      .then((resp) => {
        console.log(resp.data);
        expect(resp.data).to.be.an("string");
        expect(resp.data).to.be.equal(
          "'Tulasidas Ramayana' book name is replace with 'Valmiki Ramayana' book name"
        );
      });
  });

  /**
   * STEP:9 PATCH METHOD FAILED WHEN ORIGINAL BOOK NAME IS NOT AVAILABLE IN LIBRARY
   */
  it("Patch method failed due to original book name is not available in library", () => {
    let updateBook = {
      original_book: "Ramayana",
      new_book: "Valmiki Ramayana",
    };
    return axios
      .patch("http://localhost:3002/booklist", updateBook)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.an("string");
        expect(err).to.be.equal(
          "'Ramayana' book name is not at all present inside the book list"
        );
      });
  });

  /**
   * STEP:10 PATCH METHOD FAILED DUE TO SYNTAX ERROR
   */
  it("Patch method failed due to some data required for update is missing", () => {
    let updateBook = {
      original_book: "Ramayana",
    };
    return axios
      .patch("http://localhost:3002/booklist", updateBook)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.an("string");
        expect(err).to.be.equal(
          "Either Original book name or New book name are missing"
        );
      });
  });

  /**
   * STEP:11 DELETE METHOD SUCCESS
   */
  it("It should delete the book from a Library", () => {
    let deleteBook = { data: { book: "Dummy Book" } };

    return axios
      .delete("http://localhost:3002/booklist", deleteBook)
      .then((resp) => {
        console.log(resp.data);
        expect(resp.data.message).to.be.an("string");
        expect(resp.data.message).to.be.equal(
          "Dummy Book book has been deleted from an book list"
        );
        expect(resp.data.data).to.be.an("string");
        expect(resp.data.data).to.be.equal("Dummy Book");
      });
  });

  /**
   * STEP:12 DELETE METHOD FAILED BCZ BOOK IS NOT AVAILABLE IN LIBRARY
   */
  it("DELETE Method Failed because book is not availble in Library", () => {
    let deleteBook = { data: { book: "Power" } };
    return axios
      .delete("http://localhost:3002/booklist", deleteBook)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
        expect(err).to.be.an("string");
        expect(err).to.be.equal(
          " 'POWER' book is not at all present in an book list to delete"
        );
      });
  });

  /**
   * STEP:13 PUT METHOD
   */
  it("PUT Method function executed", () => {
    return axios.put("http://localhost:3002/booklist").then((resp) => {
      console.log(resp.data);
      expect(resp.data).to.be.an("object");
    });
  });
});
