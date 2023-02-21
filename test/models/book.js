const client =  require('../../app/db');
const { getBooks, getBook, addBook, updateBook, deleteBook } = require('../../app/models/book');

describe('Testing models book', () => {
    async function cleanup(id) {
        await client.query(`
            DELETE FROM book
            WHERE id = $1
        `, [id])
    };

    describe('Testing addBook', () => {
        describe('Adding correct book', () => {
            const testingBook = {
                id: 'testingBook1',
                author: 'Testing Author',
                price: 999,
                description: 'testBook1 description',
                year_published: 1901
            };

            before(async () => {
                await cleanup(testingBook.id);
                // await addBook(testingBook); // added below to the `it` so that it actually executes in the test case
            });

            after(async () => {
                await cleanup(testingBook.id);
            });

            it('Selected book is equal to testing book', async () => {
                await addBook(testingBook);
                const resp = await client.query(`
                    SELECT id, author, price, description, year_published
                    FROM book
                    WHERE id = $1              
                `, [testingBook.id])
                expect(resp.rows.length).to.equal(1);
                const book = resp.rows[0];
                expect(book).to.deep.equal(testingBook);
            })
        })
    })
})