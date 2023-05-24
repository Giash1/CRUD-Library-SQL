const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Pg@967061@localhost:8000/individual_db')

async function selectAllBooks() {

  let data = await db.many("SELECT * FROM book")

  return data;
}

async function insertBook(title, category, year) {
    await db.none('INSERT INTO book (title, category, year) VALUES ($1, $2, $3)', [
      title,
      category,
      year
    ]);
  }

  async function updateBook(bookId, title, category, year) {
    await db.none(
      'UPDATE book SET title = $2, catagory = $3, year = $4 WHERE book_id = $1',
      [bookId, title, category, year]
    );
  }



async function selectBookByKeyword(keyword) {

  let data = await db.any(`SELECT * FROM book WHERE title LIKE '${keyword}%'`);

  return data;
}

async function selectAllloanbooks() {

  let data = await db.many("SELECT * FROM loanbook")

  return data;
}

async function deleteBook(bookId) {

  await db.none(`DELETE FROM book WHERE book_id = ${bookId}`);
}

module.exports = {
    selectAllBooks,
    selectBookByKeyword,
    selectAllloanbooks,
    insertBook,
    updateBook,
    deleteBook
}
