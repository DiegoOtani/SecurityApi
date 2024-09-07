const express = require('express');
const { addBookInUserProfile, getRecommendations } = require('../controllers/services');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * /services/recomend:
 *   get:
 *     summary: Get book recommendations for the authenticated user.
 *     description: Retrieve a list of book recommendations based on the user's profile and preferences.
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of book recommendations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the book.
 *                     example: "66db8413a0d3bdf4436987b8"
 *                   title:
 *                     type: string
 *                     description: The title of the book.
 *                     example: "Book Five"
 *                   publicationDate:
 *                     type: string
 *                     format: date-time
 *                     description: The publication date of the book.
 *                     example: "2024-09-06T22:37:07.279Z"
 *                   summary:
 *                     type: string
 *                     description: A brief summary of the book.
 *                     example: "Summary of Book Five"
 *                   author:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the author.
 *                         example: "Author Four"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */
router.get('/recomend', authMiddleware, getRecommendations);

/**
 * @swagger
 * /services/add/{bookId}:
 *   post:
 *     summary: Add a book to the user's profile.
 *     description: Add a book to the authenticated user's profile using the book's ID.
 *     tags:
 *       - Services
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: The ID of the book to add to the user's profile.
 *         schema:
 *           type: string
 *           example: "66db8413a0d3bdf4436987b8"
 *     responses:
 *       '200':
 *         description: Book added successfully to the user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier for the user.
 *                       example: "66db8412a0d3bdf443698795"
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: "User One"
 *                     email:
 *                       type: string
 *                       description: The user's email address.
 *                       example: "user1@example.com"
 *                     phone:
 *                       type: string
 *                       description: The user's phone number.
 *                       example: "2345678901"
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: "userone"
 *                     isAdmin:
 *                       type: boolean
 *                       description: Indicates if the user is an admin.
 *                       example: false
 *                     books:
 *                       type: array
 *                       description: A list of book IDs added to the user's profile.
 *                       items:
 *                         type: string
 *                         example: "66db8413a0d3bdf4436987b8"
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "Book added successfully"
 *       '400':
 *         description: Bad request (e.g., invalid Book ID format).
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.post('/add/:bookId', authMiddleware, addBookInUserProfile);

module.exports = router;