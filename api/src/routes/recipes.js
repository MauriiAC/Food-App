const axios = require('axios');
const { Recipe, Step, Ingredient, Equipment } = require('./../db'); //Importo el modelo
const router = require('express').Router();
const {YOUR_API_KEY} = require('./../db');
const { Op } = require("sequelize");

const URL = `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`;
let URLdetail = (id) => `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`;


let filteredRecipes = []

router.get('/', function(req, res)
{
    const {name} = req.query;

    let localResult;

    if(!name){
        localResult = Recipe.findAll({
            include: [{
                 model: Step,
                 include: [
                    {
                        model: Ingredient
                    },
                    {
                        model: Equipment
                    }
                ],
            }]
        })
    }
    else{
        localResult = Recipe.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [{
                 model: Step,
                 include: [
                    {
                        model: Ingredient
                    },
                    {
                        model: Equipment
                    }
                ],
            }]
        })
    }


    const apiResult = axios.get(URL)

    Promise.all([localResult, apiResult])
        .then((arrResult) => {
            const[arrLocal, arrApi] = arrResult;

            // console.log(arrLocal);
            // console.log(arrApi);

            let apiFiltered = [];                

            if(!name){
                apiFiltered = arrApi.data.results;
            }
            else{
                apiFiltered = arrApi.data.results.filter(recipe => 
                    {
                        return recipe.title.toLowerCase().includes(name.toLowerCase());
                    });
                }
            
            filteredRecipes = arrLocal.concat(apiFiltered);
            
            return res.send(filteredRecipes);
        })

        .catch((err) => {
            console.log("Hubo un error en algunas de las promesas")
            console.log(err);
            return res.send(400);
        })
});

router.get('/:idRecipe/information', function(req, res)
{
    const {idRecipe} = req.params;
    const {localStorage} = req.query

    // console.log(req.query); 

    if(localStorage === 'true'){
        const localResult = Recipe.findOne({
            where: {
                id: idRecipe
            },
            include: [{
                 model: Step,
                 include: [
                    {
                        model: Ingredient
                    },
                    {
                        model: Equipment
                    }
                ],
            }]
        })

        localResult.then((resp) => 
        {
            console.log("entró a la BBDD local")               
            res.send(resp);
        })
        .catch((err) => 
        {
            console.log("hubo un error en el axios de /recipes/:idRecipe")
            res.status(404).send(err)       
        })

    }
    else{
        axios.get(URLdetail(idRecipe))
        .then((resp) => 
        {
            console.log("entró a la API")          
            res.send(resp.data);
        })
        .catch((err) => 
        {
            console.log("hubo un error en el axios de /recipes/:idRecipe")
            res.status(404).send(err)       
        })
    }
});


module.exports = router;