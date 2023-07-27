const express = require('express');
const articlesController = require('./articles.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware.authenticate, articlesController.createArticle);
router.put('/:articleId', authMiddleware.authenticate, authMiddleware.adminOnly, articlesController.updateArticle);
router.delete('/:articleId', authMiddleware.authenticate, authMiddleware.adminOnly, articlesController.deleteArticle);
router.get('/:userId/articles', usersController.getUserArticles);  // Route pour récupérer les articles d'un utilisateur spécifique


module.exports = router;
