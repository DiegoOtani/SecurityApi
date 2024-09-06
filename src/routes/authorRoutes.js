const express = require('express');
const router = express.Router();
const { authorInfo, validate } = require('../middlewares/Author');
const { getAll, create, edit, deleteAuthor, getAuthorById } = require('../controllers/author');
const { authMiddleware } = require('../middlewares/auth');

/**
 * @swagger
 * /author:
 *   get:
 *     summary: Retrieve all authors.
 *     description: Returns a list of all authors registered in the system.
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: List of authors.
 *         content:
 *           application/json:
 *             example:
 *               authors:
 *                 - _id: "66db69742b948490e33f4019"
 *                   name: "Author One"
 *                   nationality: "Country A"
 *                   biography: "Biography of Author One"
 *                   books: []
 *               totalPages: 5
 *               currentPage: 1
 *               totalAuthors: 10
 *       500:
 *         description: Internal server error.
 */

router.get('/', getAll);

/**
 * @swagger
 * /author/{id}:
 *   get:
 *     summary: Retrieve an author by ID.
 *     description: Returns the details of a specific author by their ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of an author.
 *         content:
 *           application/json:
 *             example:
 *               _id: "66db69742b948490e33f4019"
 *               name: "Author One"
 *               nationality: "Country A"
 *               biography: "Biography of Author One"
 *               books: []
 *       400:
 *         description: Invalid ID format.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', getAuthorById);

/**
 * @swagger
 * /author:
 *   post:
 *     summary: Create a new author.
 *     description: Creates a new author in the system. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rick Riordan"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Author created successfully.
 *         content:
 *           application/json:
 *             example:
 *               author:
 *                 _id: "66db69742b948490e33f4020"
 *                 name: "Rick Riordan"
 *                 nationality: ""
 *                 biography: ""
 *                 books: []
 *               message: "Author created successfully"
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
router.post('/', authMiddleware, authorInfo(), validate, create);

/**
 * @swagger
 * /author/{id}:
 *   put:
 *     summary: Update an existing author.
 *     description: Updates the details of an existing author by their ID. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rick Riordan"
 *               nationality:
 *                 type: string
 *                 example: "American"
 *               biography:
 *                 type: string
 *                 example: "Author of the Percy Jackson series."
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               author:
 *                 _id: "66db69742b948490e33f4020"
 *                 name: "Rick Riordan"
 *                 nationality: "American"
 *                 biography: "Author of the Percy Jackson series."
 *                 books: []
 *               message: "Author updated successfully"
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

router.put('/:id', authMiddleware, edit);

/**
 * @swagger
 * /author/{id}:
 *   delete:
 *     summary: Delete an existing author.
 *     description: Deletes an existing author by their ID. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               author:
 *                 _id: "66db69742b948490e33f4020"
 *                 name: "Rick Riordan"
 *                 nationality: "American"
 *                 biography: "Author of the Percy Jackson series."
 *                 books: []
 *               message: "Author deleted successfully"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID format"
 *       440:
 *         description: Error deleting author.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error deleting author"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.delete('/:id', authMiddleware, deleteAuthor);

module.exports = router;
