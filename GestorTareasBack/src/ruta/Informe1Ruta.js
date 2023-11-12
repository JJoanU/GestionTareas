var Informe1Modelo = require('../modelos/Informe1Modelo');
var express = require('express');
var router = express.Router();
 
//Listar informe
module.exports = function() {
router.post("/", function (req, res) {
    // Crear un objeto JSON con los datos del informe
    var parametros = { ID_Usuario: req.body.ID_Usuario };
    
    // Llamar a la función getInforme1 del modelo
    Informe1Modelo.getInforme1(parametros, function (error, data) {
      if (error) {
        res.status(500).send({ error: "Error interno en el servidor" });
      } else {
        res.status(200).json(data);
      }
    });
  });
 
  return router;
};
    
