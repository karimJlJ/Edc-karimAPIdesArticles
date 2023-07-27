const request = require('supertest');
const app = require('../server'); 
const Article = require('../api/articles/articles.model');
const mockingoose = require('mockingoose').default;

describe('Test de création article', () => {
  it('Devrait retourner le code de réponse 201 après la création article', async () => {
    const articleData = {
      title: 'Nouvel article',
      content: 'Contenu de article',
      author: 'idUser',
    };

    mockingoose(Article).toReturn(articleData, 'save');

    const response = await request(app)
      .post('/api/articles')
      .send(articleData);

    expect(response.status).toBe(201);
  });
});

describe('Test de mise à jour article', () => {
  it('Devrait retourner le code de réponse 200 après la mise à jour  article', async () => {
    const articleId = 'idArticle'; 
    const updatedArticleData = {
      title: 'Article mis à jour',
      content: 'Contenu mis à jour',
    };

    mockingoose(Article).toReturn(updatedArticleData, 'findOneAndUpdate');

    const response = await request(app)
      .put(`/api/articles/${articleId}`)
      .send(updatedArticleData);

    expect(response.status).toBe(200);
  });
});

describe('Test de suppression article', () => {
  it('Devrait retourner le code de réponse 204 après la suppression article', async () => {
    const articleId = 'idArticle'; 

    mockingoose(Article).toReturn(null, 'findOneAndRemove');

    const response = await request(app).delete(`/api/articles/${articleId}`);

    expect(response.status).toBe(204);
  });
});
