var BalanceModelo = require('../modelos/BalanceModelo');
var express = require('express');
var router = express.Router();

//Listar balance
module.exports = function ()
{

     router.get("/", function (req, res)
    { 
        BalanceModelo.getBalance(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    
    return router;
}

//Actualizar balance
router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto json contacto
        var BalanceData =
            {
                ID_Balance: req.body.ID_Balance,
                ID_Tarea: req.body.ID_Tarea,
                ID_Usuario: req.body.ID_Usuario,
                HorasTrabajadas: req.body.HorasTrabajadas,
                Fecha: req.body.Fecha
            };


        //usamos la funcion para actualizar
        BalanceModelo.updateBalance(BalanceData, function (error, data)
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
        var BalanceData =
            {
                ID_Balance: null,
                ID_Tarea: req.body.ID_Tarea,
                ID_Usuario: req.body.ID_Usuario,
                HorasTrabajadas: req.body.HorasTrabajadas,
                Fecha: req.body.Fecha
            };

        //usamos la funcion para insertar
        BalanceModelo.insertBalance(BalanceData, function (error, data)
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
            BalanceModelo.getBalanceTipo(tip, function (error, data)
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
