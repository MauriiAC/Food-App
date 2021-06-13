const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('./recipe');
const recipes = require('./recipes');
const types = require('./types');
const {YOUR_API_KEY} = process.env;
const axios = require('axios');

const router = Router();

router.get('/', (req, res) => {
    res.send("Estoy en el home");
    }
)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipe', recipe);
router.use('/recipes', recipes);
router.use('/types', types);

// Ingresa acá si no entra a ningun router anterior
router.get('/:err', (req, res) => {
    res.status(404);
    res.send("No ingresó una ruta valida");
})

module.exports = {
    router,
    URL: URL,
};
