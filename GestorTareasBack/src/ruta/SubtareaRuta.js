var SubtareaModelo = require('../modelos/SubtareaModelo');
var express = require('express');
var router = express.Router();

//Listar subtarea
module.exports = function ()
{

     router.get("/", function (req, res)
    { 
        SubtareaModelo.getSubtareas(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    
    return router;
}

//Actualizar contacto
router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto json contacto
        var SubtareaData =
            {
                ID_Subtarea: req.body.ID_Subtarea,
                NombreSubtarea: req.body.NombreSubtarea,
                FechaInicio: req.body.FechaInicio,
                FechaFinalizacion: req.body.FechaFinalizacion,
                ID_Estado: req.body.ID_Estado,
                ID_Tarea: req.body.ID_Tarea
            };


        //usamos la funcion para actualizar
        SubtareaModelo.updateSubtarea(SubtareaData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });


    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {

        //creamos un objeto Json con los datos del contacto
        var SubtareaData =
            {
                ID_Subtarea: null,
                NombreSubtarea: req.body.NombreSubtarea,
                FechaInicio: req.body.FechaInicio,
                FechaFinalizacion: req.body.FechaFinalizacion,
                ID_Estado: req.body.ID_Estado,
                ID_Tarea: req.body.ID_Tarea
            };

        //usamos la funcion para insertar
        SubtareaModelo.insertSubtarea(SubtareaData, function (error, data)
        {

            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });


    router.get("/:tip", function (req, res)
    {
        var tip = req.params.tip;

        //solo actualizamos si el tip es un número
        if (!isNaN(tip))
        {
            SubtareaModelo.getSubtareaTipo(tip, function (error, data)
            {
                //si el tipo de catalogo existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, { "msg": "Registro no Existe" });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });
