const router = require('express').Router();
const { Recipe, Step } = require('./../db')
const { conn } = require('./../db');

router.get('/', function(req, res){

    res.send("Estoy en /recipe");
});

router.post('/add', function(req, res){


    const fileImage = req.files.image;
    fileImage.mv(`C:/Users/mauri/Documents/Cursos/Programacion/SoyHenry/PI-Food-FT12/client/src/images/newRecipes/${fileImage.name}`);

    const {title, summary, score, healthScore, procedure, steps} = JSON.parse(req.body.body);


    var newRecipe = Recipe.create({
        title, 
        summary, 
        score, 
        healthScore,
        procedure,  
        urlImage: `${fileImage.name}`
      })


    let stepPromises = [];
    let orderStep = 0;


    for (const elem of steps) 
    {
        stepPromises.push(Step.create({
            description: elem,
            order: orderStep
        }))
        orderStep++;
    }

    Promise.all([newRecipe].concat(stepPromises))
        .then(res => {

            return res[0].addSteps(res.slice(1))
        })

        .then
            (
            () => {
                // console.log('el create se resolvió correctamente')
                conn.sync({ force: false });
                return res.sendStatus(200);
            }
            // err => res.send(err)
            )
        .catch
            (
                err => {
                    console.log("falló la sincronización")
                    console.log(err)
                    res.status(400);
                    return res.send(err);
            })
                
})


module.exports = router;