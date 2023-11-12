var CatalogoModelo = require('../modelos/CatalogoModelo');
var express = require('express');
var router = express.Router();


//Listar catalogo

module.exports = function ()
{

     router.get("/", function (req, res)
    { 
        CatalogoModelo.getCatalogos(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    
    return router;
}
// Para llamar el método de mostrar un registro especifico de un tipo de catalogo

router.get("/:tipcat/:id", function (req, res)
{
    var tipcat = req.params.tipcat;
    var id = req.params.id;

    if(!isNaN(id))
    {
        CatalogoModelo.getCatalogoU(tipcat, id, function (error, data)
        {
            if(typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
            }
            else
            {
                res.json(404,
                {
                    "msg": "registro no existe"
                });
            }
        });
    }
    else // si hay error
    {
        res.status(500).json({"msg": "error"});
    }

});

router.get("/A/:id", function (req, res)
{
    var id = req.params.id;
 
    if(!isNaN(id))
    {
        CatalogoModelo.getCatalogoUEdi(id, function (error, data)
        {
            if(typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
            }
            else
            {
                res.json(404,
                {
                    "msg": "registro no existe"
                });
            }
        });
    }
    else // si hay error
    {
        res.status(500).json({"msg": "error"});
    }
 
});

    


    router.get("/:tip", function (req, res)
    {
        var tip = req.params.tip


        //solo actualizamos si el tip es un número
        if (!isNaN(tip))
        {
            CatalogoModelo.getCatalogoTipo(tip, function (error, data)
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
    
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {

        //creamos un objeto Json con los datos del contacto
        var CatalogoData =
            {
                ID_Universal: null,
                Denominacion: req.body.Denominacion,
                CatalogoUniversal: req.body.CatalogoUniversal,
                LlaveForanea: req.body.LlaveForanea

            };

        //usamos la funcion para insertar
        CatalogoModelo.insertCatalogo(CatalogoData, function (error, data)
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

//Actualizar catalogo
router.put("/", function (req, res)
{
    //almacenamos los datos de la petición en un objeto json contacto
    var CatalogoData =
        {
            ID_Universal: req.body.ID_Universal,
            Denominacion: req.body.Denominacion,
            CatalogoUniversal: req.body.CatalogoUniversal,
            LlaveForanea: req.body.LlaveForanea
        };


    //usamos la funcion para actualizar
    CatalogoModelo.updateCatalogo(CatalogoData, function (error, data)
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
