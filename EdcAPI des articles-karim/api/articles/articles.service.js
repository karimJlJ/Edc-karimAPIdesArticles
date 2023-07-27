const Article = require('./articles.model');

async function createArticle(articleData, user) {
  const article = new Article({
    ...articleData,
    author: user._id,
  });
  const createdArticle = await article.save();
  return createdArticle;
}

async function updateArticle(articleId, articleData, user) {
  const article = await Article.findById(articleId);
  if (!article) {
    throw new Error('Article not found');
  }

  if (user.role !== 'admin') {
    throw new Error('Only admin users can update articles');
  }

  article.set(articleData);
  const updatedArticle = await article.save();
  return updatedArticle;
}

async function deleteArticle(articleId, user) {
  if (user.role !== 'admin') {
    throw new Error('Only admin users can delete articles');
  }
  await Article.findByIdAndRemove(articleId);
}

async function getArticlesByUser(userId) {
  const articles = await Article.find({ author: userId }).populate('author', '-password');
  return articles;
}

module.exports = {
  getArticlesByUser,
};


module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
};
