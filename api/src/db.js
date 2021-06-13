require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, YOUR_API_KEY,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe, Diet_type, Dish_type, Step, Ingredient, Equipment } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Recipe.belongsToMany(Diet_type, {through: "recipeXdiet_type"});
Diet_type.belongsToMany(Recipe, {through: "recipeXdiet_type"});

Recipe.belongsToMany(Diet_type, {through: "recipeXdish_type"});
Dish_type.belongsToMany(Recipe, {through: "recipeXdish_type"});

Recipe.hasMany(Step);
Step.belongsTo(Recipe)

Step.belongsToMany(Ingredient, {through: "ingredientXstep"});
Ingredient.belongsToMany(Step, {through: "ingredientXstep"});

Step.belongsToMany(Equipment, {through: "equipmentXstep"});
Equipment.belongsToMany(Step, {through: "equipmentXstep"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
  YOUR_API_KEY,
};
