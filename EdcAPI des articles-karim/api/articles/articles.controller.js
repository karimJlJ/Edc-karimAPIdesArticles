const articlesService = require('./articles.service');

async function createArticle(req, res, next) {
  try {
    const { body: articleData } = req;
    const { user } = req; // Accéder aux informations complètes de l'utilisateur connecté via req.user
    const createdArticle = await articlesService.createArticle(articleData, user);
    res.status(201).json(createdArticle);
  } catch (error) {
    next(error);
  }
}

async function updateArticle(req, res, next) {
  try {
    const { articleId } = req.params;
    const { body: articleData } = req;
    const { user } = req; // Accéder aux informations complètes de l'utilisateur connecté via req.user
    const updatedArticle = await articlesService.updateArticle(articleId, articleData, user);
    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const { articleId } = req.params;
    const { user } = req; // Accéder aux informations complètes de l'utilisateur connecté via req.user
    await articlesService.deleteArticle(articleId, user);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
};
