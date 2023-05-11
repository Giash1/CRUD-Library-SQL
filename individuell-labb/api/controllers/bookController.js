const { getAllBooks, addBook, getBookByKeyword, editBook, deleteBook } = require("../repositories/bookRepository" );

async function get(req, res) {
    try {

        let data = await getAllBooks();

        return res.json(data);
    } catch (error) {
        return error
    }

}

async function search(req, res) {
try {

    let data = await getBookByKeyword(req.query.keyword);

    // console.log(data);

    return res.json(data);
} catch (error) {
    return error;
}
}

async function add(req, res) {
try {
    await addBook(req.body.title, req.body.catagory, '');

    res.sendStatus(200);

} catch (error) {
    return error;
}
}

async function edit(req, res) {
try{
    await editBook(req.body.bookId, req.body.title, req.body.catagory, req.body.year);

    res.sendStatus(200);

}
catch(error){
    return error;
}
}

async function remove(req, res) {

    await deleteBook(req.body.bookId);
}


module.exports = {
    get,
    add,
    edit,
    search,
    remove
}
