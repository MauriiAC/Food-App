const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.STRING(65535),
      allowNull: false,  
    },
    score: {                      //spoonacularScore
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
      }
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
      }
    },
    procedure: {                  //analyzedInstructions
      type: DataTypes.STRING,
    },
    urlImage: {                   //image
      type: DataTypes.STRING,
    },
    localStorage: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};
