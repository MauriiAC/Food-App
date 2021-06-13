//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Recipe, Diet_type, Step, Ingredient, Equipment } = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });








  //----- Cargamos automáticamente unos datos en la BBDD al iniciarla para ir haciendo pruebas ---------

  // var chocotorta = Recipe.create({
  //   title: 'Chocotorta', 
  //   summary: 'La chocotorta es un postre originario de Argentina. Con el lanzamiento en 1975 por Bagley de una variedad de galletitas de chocolate, marca Chocolinas; en muchas poblaciones del sur de Santa Fe, se comenzó a elaborar en los hogares esta torta, conocida como “el postre de las chocolinas”.', 
  //   score: 99, 
  //   healthScore: 10,  
  //   urlImage: '/images/chocotorta.jpg'
  // });

  // var paso1A = Step.create({
  //   description: 'Mezclar el dulce de leche con el casancream en un bowl',
  //   order: 1,
  // })

  // var paso2A = Step.create({
  //   description: 'Poner capas de mezcla intercaladas con capaz de chocolinas',
  //   order: 2,
  // })

  // var paso3A = Step.create({
  //   description: 'Guardar en la heladera durante 8hs',
  //   order: 3,
  // })

  // var ingredA1 = Ingredient.create({
  //   name: "Dulce de Leche"
  // })

  // var ingredA2 = Ingredient.create({
  //   name: "Casancrem"
  // })

  // var equipA1 = Equipment.create({
  //   name: "Bowl"
  // })


  // Promise.all([chocotorta, paso1A, paso2A, paso3A, ingredA1, ingredA2, equipA1])
  //   .then(res => {
  //     res[0].addSteps([res[1], res[2], res[3]]);
  //     res[1].addIngredients([res[4], res[5]]);
  //     res[1].addEquipment(res[6]);
  //   });
  
   
  // var pastelProteico = Recipe.create({
  //   title: 'Pastel proteíco sabor a chocolate', 
  //   summary: 'Esta es una receta recomendadas para deportistas que estén  llevando acabo tanto una dieta para ganar volumen muscular como para definir y perder grasa corporal', 
  //   score: 90, 
  //   healthScore: 70,  
  //   urlImage: '/images/pastelProteico.jpg'
  // });
  
  // var salmonEnYogurt = Recipe.create({
  //   title: 'Salmón a la plancha con salsa de yogur', 
  //   summary: 'Si te gustan los contrastes de sabores, este es un plato caliente acompañando por una salsa fría, se trata del salmón a la plancha con salsa de yogur, una receta de 5 minutos que no te puedes perder', 
  //   score: 70, 
  //   healthScore: 72,  
  //   urlImage: '/images/salmonEnYogurt.jpg'
  // });
  
  
  
  
  // ---------- CARGAMOS LOS TIPOS DE DIETAS DISPONIBLES -----------------
  var GlutenFree = Diet_type.create({
    name: 'Gluten Free', 
    description: 'Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).'
  })
  
  var Ketogenic = Diet_type.create({
    name: 'Ketogenic', 
    description: 'The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.'
  })
  
  var Vegetarian = Diet_type.create({
    name: 'Guten Free', 
    description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin.'
  })
  
  var LactoVegetarian = Diet_type.create({
    name: 'Lacto-Vegetarian', 
    description: 'All ingredients must be vegetarian and none of the ingredients can be or contain egg.'
  })
  
  var OvoVegetarian = Diet_type.create({
    name: 'Ovo-Vegetarian', 
    description: 'All ingredients must be vegetarian and none of the ingredients can be or contain dairy.'
  })
  
  var Vegan = Diet_type.create({
    name: 'Vegan', 
    description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.'
  })
  
  var Pescetarian = Diet_type.create({
    name: 'Pescetarian', 
    description: 'Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.'
  })
  
  var Paleo = Diet_type.create({
    name: 'Paleo', 
    description: 'Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.'
  })

  var Primal = Diet_type.create({
    name: 'Primal', 
    description: 'Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.'
  }) 

  var Whole30 = Diet_type.create({
    name: 'Whole 30', 
    description: 'Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.'
  })
  
  Promise.all([GlutenFree, Ketogenic, Vegetarian, LactoVegetarian, OvoVegetarian, 
    Vegan, Pescetarian, Paleo, Primal, Whole30])
    .then(res => {
      console.log("Recipes and diet types loaded");
    })
    .catch(err => {
      console.log(err);
    })
   
});