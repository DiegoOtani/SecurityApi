const express = require('express');
const router = express.Router();
const { bookInfo, validate } = require('../middlewares/Book');
const { getAll, create, update, deleteBook, getBookByid } = require('../controllers/book');
const { authMiddleware } = require('../middlewares/auth');

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Retrieve all books.
 *     description: Returns a list of all books registered in the system.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Number of books per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number.
 *     responses:
 *       200:
 *         description: List of books.
 *         content:
 *           application/json:
 *             example:
 *               books:
 *                 - _id: "60d21bbf7c7c280f0d5f5b76"
 *                   title: "Dune"
 *                   publicationDate: "1965-08-01T00:00:00.000Z"
 *                   summary: "A science fiction novel set in a distant future."
 *                   author: "60d21bbf7c7c280f0d5f5b77"
 *                   categories:
 *                     - "60d21bbf7c7c280f0d5f5b78"
 *               totalPages: 10
 *               currentPage: 1
 *               totalBooks: 50
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.get('/', getAll);

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: Retrieve a book by ID.
 *     description: Returns the details of a specific book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of a book.
 *         content:
 *           application/json:
 *             example:
 *               _id: "60d21bbf7c7c280f0d5f5b76"
 *               title: "Dune"
 *               publicationDate: "1965-08-01T00:00:00.000Z"
 *               summary: "A science fiction novel set in a distant future."
 *               author: "60d21bbf7c7c280f0d5f5b77"
 *               categories:
 *                 - "60d21bbf7c7c280f0d5f5b78"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID format"
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Book not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.get('/:id', getBookByid);

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new book.
 *     description: Creates a new book in the system. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Dune"
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "1965-08-01"
 *               summary:
 *                 type: string
 *                 example: "A science fiction novel set in a distant future."
 *               author:
 *                 type: string
 *                 example: "60d21bbf7c7c280f0d5f5b77"
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d21bbf7c7c280f0d5f5b78"
 *             required:
 *               - title
 *               - author
 *               - categories
 *     responses:
 *       201:
 *         description: Book created successfully.
 *         content:
 *           application/json:
 *             example:
 *               book:
 *                 _id: "60d21bbf7c7c280f0d5f5b76"
 *                 title: "Dune"
 *                 publicationDate: "1965-08-01T00:00:00.000Z"
 *                 summary: "A science fiction novel set in a distant future."
 *                 author: "60d21bbf7c7c280f0d5f5b77"
 *                 categories:
 *                   - "60d21bbf7c7c280f0d5f5b78"
 *               message: "Book created successfully!"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid data"
 *       401:
 *         description: Unauthorized. Invalid or missing Bearer Token.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.post('/', authMiddleware, bookInfo(), validate, create);

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Update an existing book.
 *     description: Updates the details of an existing book by its ID. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Dune"
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "1965-08-01"
 *               summary:
 *                 type: string
 *                 example: "A science fiction novel set in a distant future."
 *               author:
 *                 type: string
 *                 example: "60d21bbf7c7c280f0d5f5b77"
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d21bbf7c7c280f0d5f5b78"
 *             required:
 *               - title
 *               - author
 *               - categories
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               book:
 *                 _id: "60d21bbf7c7c280f0d5f5b76"
 *                 title: "Dune"
 *                 publicationDate: "1965-08-01T00:00:00.000Z"
 *                 summary: "A science fiction novel set in a distant future."
 *                 author: "60d21bbf7c7c280f0d5f5b77"
 *                 categories:
 *                   - "60d21bbf7c7c280f0d5f5b78"
 *               message: "Book updated successfully!"
 *       400:
 *         description: Invalid ID format or input data.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID format"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.put('/:id', authMiddleware, update);

/**
 * @swagger
 * /book/{id}:
 *   delete:
 *     summary: Delete an existing book.
 *     description: Deletes an existing book by its ID. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Book deleted successfully!"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID format"
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Book not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;