var PersonaModelo = require('../modelos/PersonaModelo');
var express = require('express');
var router = express.Router();

//Listar persona
module.exports = function ()
{

     router.get("/", function (req, res)
    { 
        PersonaModelo.getPersonas(function (error, data)
        {
            res.status(200).json(data);
        });
    });
    
    return router;
}

router.get("/persona/:id", function (req, res)
{
    
    let idconvert= req.params.id;
    var id = parseInt(idconvert);
    console.log(id)
    if(!isNaN(id))
    {
        PersonaModelo.getPersona(id, function (error, data)
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
//Actualizar persona
router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto json persona
        var PersonaData =
            {
                ID_Usuario: req.body.ID_Usuario,
                ID_Documento: req.body.ID_Documento,
                NumeroDocumento: req.body.NumeroDocumento,
                PrimerNombre: req.body.PrimerNombre,
                SegundoNombre: req.body.SegundoNombre,
                PrimerApellido: req.body.PrimerApellido,
                SegundoApellido: req.body.SegundoApellido,
                ID_TipoUsuario: req.body.ID_TipoUsuario,
                ID_Eps: req.body.ID_Eps
            };


        //usamos la funcion para actualizar
        PersonaModelo.updatePersona(PersonaData, function (error, data)
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

        //creamos un objeto Json con los datos de la persona
        var PersonaData =
            {
                ID_Usuario: null,
                ID_Documento: req.body.ID_Documento,
                NumeroDocumento: req.body.NumeroDocumento,
                PrimerNombre: req.body.PrimerNombre,
                SegundoNombre: req.body.SegundoNombre,
                PrimerApellido: req.body.PrimerApellido,
                SegundoApellido: req.body.SegundoApellido,
                ID_TipoUsuario: req.body.ID_TipoUsuario,
                ID_Eps: req.body.ID_Eps
            };

        //usamos la funcion para insertar
        PersonaModelo.insertPersona(PersonaData, function (error, data)
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

    




