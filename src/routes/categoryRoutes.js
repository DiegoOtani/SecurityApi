const express = require('express');
const router = express.Router();
const { register, edit, deleteCategory, getAll, getCategoryById } = require('../controllers/category');
const { categoryInfo, validate } = require('../middlewares/Category');
const { authMiddleware } = require('../middlewares/auth');

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Retrieve all categories.
 *     description: Returns a list of all categories registered in the system.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Number of categories per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number.
 *     responses:
 *       200:
 *         description: List of categories.
 *         content:
 *           application/json:
 *             example:
 *               categories:
 *                 - _id: "60d21bbf7c7c280f0d5f5b75"
 *                   name: "Fiction"
 *                   description: "Fictional books and stories."
 *               totalPages: 10
 *               currentPage: 1
 *               totalCategories: 50
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
 * /category/{id}:
 *   get:
 *     summary: Retrieve a category by ID.
 *     description: Returns the details of a specific category by its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of a category.
 *         content:
 *           application/json:
 *             example:
 *               _id: "60d21bbf7c7c280f0d5f5b75"
 *               name: "Fiction"
 *               description: "Fictional books and stories."
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID format"
 *       404:
 *         description: Category not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Category not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category.
 *     description: Creates a new category in the system. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Categories
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
 *                 example: "Science Fiction"
 *               description:
 *                 type: string
 *                 example: "Books that explore futuristic concepts."
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             example:
 *               category:
 *                 _id: "60d21bbf7c7c280f0d5f5b76"
 *                 name: "Science Fiction"
 *                 description: "Books that explore futuristic concepts."
 *               message: "Category registered successfully"
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
router.post('/', authMiddleware, categoryInfo(), validate, register);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update an existing category.
 *     description: Updates the details of an existing category by its ID. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update.
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
 *                 example: "Science Fiction"
 *               description:
 *                 type: string
 *                 example: "Books that explore futuristic concepts."
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               category:
 *                 _id: "60d21bbf7c7c280f0d5f5b76"
 *                 name: "Science Fiction"
 *                 description: "Books that explore futuristic concepts."
 *               message: "Category updated successfully"
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
router.put('/:id', authMiddleware, categoryInfo(), validate, edit);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete an existing category.
 *     description: Deletes an existing category by its ID. A valid Bearer Token is required for authentication.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               category:
 *                 _id: "60d21bbf7c7c280f0d5f5b76"
 *                 name: "Science Fiction"
 *                 description: "Books that explore futuristic concepts."
 *               message: "Category deleted successfully"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID format"
 *       440:
 *         description: Error deleting category.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error deleting category"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;