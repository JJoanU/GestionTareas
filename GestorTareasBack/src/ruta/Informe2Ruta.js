var Informe2Modelo = require('../modelos/Informe2Modelo');
var express = require('express');
var router = express.Router();

module.exports = function() {
  router.post("/", function (req, res) {
    var parametros = {
      ID_Usuario: req.body.ID_Usuario,
      FechaInicio: req.body.FechaInicio,
      FechaFinalizacion: req.body.FechaFinalizacion    };
    Informe2Modelo.getInforme2(parametros, function (error, data) {
      if (error) {
        res.status(500).send({ error: "Error interno en el servidor" });
      } else {
        res.status(200).json(data);
      }
    });
  });

  return router;
};