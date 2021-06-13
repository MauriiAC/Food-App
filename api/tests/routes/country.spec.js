/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
  summary: 'Plato tipico rioplatense ideal para acompañar con papas fritas y huevo'
};
const recipe2 = {
  title: 'Milanesa caprese',
  summary: 'Mila con tomate, albahaca y aceite de oliva'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe))
    .then(() => Recipe.create(recipe2))
    );
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('responds with an array and the first element must be "Milanesa a la napolitana"', () =>
      agent.get('/recipes').then((res) => {
        expect(res.body[0].title).to.match(/^Milanesa/);
      })
    );
    it('responds with an array that contain the recipe of "Milanesa a la napolitana"', () =>
      agent.get('/recipes?name=Milanesa').then((res) => {
        // expect(res.body[0].title).to.be.equal('Milanesa a la napolitana');
        expect(res.body[0].title).to.match(/^Milanesa/);
      })
    )
    it('responds with an array type and not includes the recipe of "Milanesa a la napolitana"', () =>
    agent.get('/recipes?name=rice').then((res) => {
      // expect(res.body[0].title).to.be.equal('Milanesa a la napolitana');
      expect(res.body[0].title).to.not.match(/^Milanesa/);
      expect(res.body).to.be.an('array');
    })
  )
  });
});


// expect([1, 2]).to.be.an('array').that.does.not.include(3);