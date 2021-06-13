const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

const recipe = {
  title: 'Milanesa a la napolitana',
  summary: 'Plato tipico rioplatense ideal para acompañar con papas fritas y huevo'
};

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('fields', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if summary is null', (done) => {
        Recipe.create({title: 'Milanesa a la napolitana'})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should create a new recipe', (done) => {
        Recipe.create(recipe)
          .then(() => done())
          .catch(() => done(new Error('It should works if we create a new recipe with the required fields')));
      });
      it('should not create a new recipe if the title already exists', (done) => {
        Recipe.create(recipe)
          .then(() => Recipe.create(recipe))
          .then(() => done(new Error("the title must be unique")))
          .catch(() => done());
      });
      it('should not create a new recipe if the score is not a number', (done) => {
        Recipe.create({
          title: 'Milanesa caprese',
          summary: 'Mila con tomate, albahaca y aceite de oliva',
          score: "bueno"
        })
          .then(() => done(new Error("the score must be a number")))
          .catch(() => done());
      });
    });
  });
});
