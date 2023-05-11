const bookModel = require("../models/bookModel");
const individual_db = require("../individual_db");



async function getAllBooks() {
    try {
        let books = [];
        let data = await individual_db.selectAllBooks()
        data.forEach(book => {
            books.push(new bookModel(book.title, book.catagory, book.year))
        });
        return books;
    } catch (error) {
        console.error(error);
        // handle the error here, such as logging it or returning an error response
    }
}


async function getBookByKeyword(keyword) {
try {

    let books = [];

    let data = await individual_db.selectBookByKeyword(keyword)

    data.forEach(book => {
        books.push(new bookModel(book.book_id, book.title, book.year, book.catagory))
    });

    return books;

} catch (error) {
    console.error(error);
};

}

async function addBook(title, year, catagory) {

    individual_db.insertBook(title, year, catagory);
};

async function editBook(bookId, title, year, catagory) {

    individual_db.updateBook(bookId, title, year, catagory);
};

async function deleteBook(bookId) {

    individual_db.deleteBook(bookId);
};

module.exports = {
    getAllBooks,
    getBookByKeyword,
    addBook,
    editBook,
    deleteBook
}
