const express = require('express');
const { completeUser, loginUser, validate} = require('../middlewares/User');
const { register, login, createAdmin , updateUser, deleteUser, getAllUsers, getUserById} = require('../controllers/user');
const { authMiddleware, adminMiddleware, verifyUserId, securityAdminInfo, checkAdminModification } = require('../middlewares/auth')

const router = express.Router();

// Login routes
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     description: Creates a new user with the provided data and returns a JWT token for authentication.
 *     tags:
 *       - Login
 *     requestBody:
 *       description: Data for the user to be registered.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Diego
 *                 description: The full name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: diego@gmail.com
 *                 description: The email address of the user.
 *               phone:
 *                 type: string
 *                 example: (15)94002-8922
 *                 description: The phone number of the user.
 *               username:
 *                 type: string
 *                 example: diegouser7
 *                 description: A unique username for login.
 *               password:
 *                 type: string
 *                 example: 123456
 *                 description: The user's password.
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66dba955d71a66828468a076
 *                       description: The unique ID of the user.
 *                     username:
 *                       type: string
 *                       example: diegouser7
 *                       description: The username of the user.
 *                     email:
 *                       type: string
 *                       example: diego@gmail.com
 *                       description: The email address of the user.
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGJhOTU1ZDcxYTY2ODI4NDY4YTA3NiIsInVzZXJuYW1lIjoiZGllZ291c2VyNyIsImVtYWlsIjoiZGllZ29AZ21haWwuY29tIiwiaWF0IjoxNzI1NjcxNzY1LCJleHAiOjE3MjU2NzUzNjV9.QJms3to7mq5dJztYLYHf68lPAQqCUHsw173gecH2LuM
 *                   description: JWT token for user authentication.
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                   description: Confirmation message for the registration.
 *       '400':
 *         description: Bad request, invalid data or missing required fields.
 *       '500':
 *         description: Internal server error.
 *     security:
 *       - securityAdminInfo: []
*/
router.post('/register', completeUser(), validate, securityAdminInfo, register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user.
 *     description: Authenticates a user with the provided username and password and returns a JWT token for access.
 *     tags:
 *       - Login
 *     requestBody:
 *       description: Credentials for user authentication.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: userone
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 example: password
 *                 description: The user's password.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 66db8412a0d3bdf443698795
 *                       description: The unique ID of the user.
 *                     username:
 *                       type: string
 *                       example: userone
 *                       description: The username of the user.
 *                     email:
 *                       type: string
 *                       example: user1@example.com
 *                       description: The email address of the user.
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGI4NDEyYTBkM2JkZjQ0MzY5ODc5NSIsInVzZXJuYW1lIjoidXNlcm9uZSIsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjU2Njg3MzUsImV4cCI6MTcyNTY3MjMzNX0.6Smpcp5PuUojOBzFjn_Gzr3mXot28mGW2dEr0hCR_BE
 *                   description: JWT token for user authentication.
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                   description: Confirmation message for a successful login.
 *       '400':
 *         description: Bad request, invalid credentials or missing required fields.
 *       '401':
 *         description: Unauthorized, invalid username or password.
 *       '500':
 *         description: Internal server error.
 *     security:
 *       - securityAdminInfo: []
 */
router.post('/login', loginUser(), validate, login);

// User profile routes

/**
 * @swagger
 * /users/myProfile/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     description: Retrieve a user by their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.get('/myProfile/:id', authMiddleware, verifyUserId, getUserById);

/**
 * @swagger
 * /users/myProfile/{id}:
 *   put:
 *     summary: Update a user by ID.
 *     description: Update the details of a user by their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User data to update.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       '400':
 *         description: Bad request.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.put('/myProfile/:id', authMiddleware, verifyUserId, securityAdminInfo, updateUser);

/**
 * @swagger
 * /users/myProfile/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Remove a user from the system by their unique ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.delete('/myProfile/:id', authMiddleware, verifyUserId, deleteUser);

// Admin routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     description: Retrieve a list of all users in the system.
 *     tags:
 *       - Users/Admin
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.get('/', authMiddleware, adminMiddleware, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID.
 *     description: Update the details of a user by their unique ID.
 *     tags:
 *       - Users/Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User data to update.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       '400':
 *         description: Bad request.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.put('/:id', authMiddleware, adminMiddleware, checkAdminModification, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Remove a user from the system by their unique ID.
 *     tags:
 *       - Users/Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully.
 *       '404':
 *         description: User not found.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.delete('/:id', authMiddleware, adminMiddleware, checkAdminModification, deleteUser);

// Create admin route

/**
 * @swagger
 * /users/admin:
 *   post:
 *     summary: Create a new admin user.
 *     description: Create a new user with admin privileges.
 *     tags:
 *       - Users/Admin
 *     requestBody:
 *       description: Admin user data.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Admin user created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */

router.post('/admin', authMiddleware, adminMiddleware, createAdmin);

module.exports = router;