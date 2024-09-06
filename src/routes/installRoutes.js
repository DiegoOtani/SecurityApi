const express = require('express');
const router = express.Router();
const { installDatabase } = require('../controllers/install');

/**
 * @swagger
 * /install:
 *   get:
 *     summary: Initialize the database with sample data.
 *     description: This endpoint initializes the database with sample data including users, authors, categories, and books. This is typically used for setting up initial data in the development environment.
 *     tags:
 *       - Installation
 *     responses:
 *       200:
 *         description: Database installation completed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Database installation completed successfully"
 *       400:
 *         description: Database already initialized.
 *         content:
 *           application/json:
 *             example:
 *               error: "Database already initialized"
 *       500:
 *         description: Failed to install database.
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to install database"
 *               details: "Detailed error message"
 */

router.get('/', installDatabase);

module.exports = router;
