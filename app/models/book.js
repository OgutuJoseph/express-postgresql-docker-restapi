const client = require('../db');
const InvalidArgumentError = require('../error');

const bookAttributesArray  = ['id', 'author', 'price', 'description', 'year_published', 'added_dttm'];
const insertBookAttributes = bookAttributesArray.slice(0, -1).join(', ');
const selectBookAttributes = bookAttributesArray.join(', ');

/** Get all books */
async function getBooks() {
    const query = `
        SELECT ${selectBookAttributes}
        FROM book
    `

    let results
    try {
        results = await client.query(query)
    } catch (e  ) {
        console.log(e);
        return undefined;
    };

    return results.rows;
};

/** Get one book */
async function getBook({ bookId }) {
    // if (bookId === undefined) return undefined; //below code overrides this line
    if (typeof bookId !== 'string') return undefined;

    const query = `
        SELECT ${selectBookAttributes}
        FROM book
        WHERE id = $1
    `

    let results
    try {
        results = await client.query(query, [bookId])
    } catch (e) {
        console.log(e);
        return undefined;
    };

    if (results.rowCount === 0) return null;

    // const bookToReturn = results.rows[0] //or
    return results.rows[0]
};

/** Validation functions */
function validate(expression, errorMessage){
    if(expression) throw new InvalidArgumentError(errorMessage);
};

function makeValidation(attribute, value) {
    switch(attribute) {
        case 'author':
            validate (typeof value !== 'string' || value.length === 0, 'Author must be of type string and more than one character')
            break
        case 'price':
            validate (typeof value !== 'number' || value.length < 0, 'Price must be of type number and greater than zero')
            break
        case 'description':
            validate (value !== undefined && typeof value !== 'string', 'Description must be of type string if exists')
            break
        case 'year_published':
            validate (typeof value !== 'number' || value.length < 0, 'Year must be of type number and greater than zero')
            break
        default: 
            console.error('Unkown attribute value')
    }
};

/** Add book */
async function addBook({ id, author, price, description, year_published }){
    if (typeof id !== 'string' || id.length === 0) throw new Error('Id must be of type string and more than one character');
    makeValidation('author', author);
    makeValidation('price', price);
    makeValidation('description', description);
    makeValidation('year_published', year_published);

    let resp
    try {
        resp = await client.query(`
            INSERT INTO book (${insertBookAttributes})
            VALUES ($1, $2, $3, $4, $5)
        `, [id, author, price, description, year_published])
    } catch (e) {
        console.error(e);
        return undefined;
    };

    return resp
};

/** Update book */
async function updateBook({ id, newAttributes }){
    if (typeof id !== 'string' || id.length === 0) throw new Error('Id must be of type string and more than one character');
    validate(typeof newAttributes !== 'object', 'New attributes must be provided as an object');

    const validAttributes = Object.keys(newAttributes).filter(element => bookAttributesArray.includes(element));
    validate(validAttributes.length === 0, 'At least one attribute to update must be provided.');

    let query = `UPDATE book SET `;
    let bindVariables = [id];
    validAttributes.forEach((attribute, i, keys) => {
        makeValidation(attribute, newAttributes[attribute])
        query = query + ` ${attribute} = ${i+2}`
        bindVariables.push(newAttributes[attribute])
        if (i < keys.length - 1) query = query + ', '
    });

    query = query + ` where id = $1 `

    let resp;
    try {
        resp = await client.query(query, bindVariables)
    } catch (e) {
        console.error(e);
        return undefined;
    };

    return resp;
};

/** Delete book */
async function deleteBook({ bookId }){
    if (typeof bookId !== 'string') return undefined;

    let resp;
    try {
        resp = await client.query(`
            DELETE FROM book
            WHERE id = $1
        `, [bookId])
    } catch (e) {
        console.error(e);
        return undefined;
    };

    return resp;
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
};
