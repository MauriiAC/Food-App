const router = require('express').Router();
const { Diet_type } = require('./../db.js')


router.get('/', function(req, res){
    // res.send("Estoy en /types");
    Diet_type.findAll()
    .then(types => res.send(types))
});


module.exports = router;