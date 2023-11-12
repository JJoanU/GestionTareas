var connection = require('../conexion');
var PersonaModelo = {};


//Listar personas
PersonaModelo.getPersonas = function (callback)
{
    if (connection)
    {
        var sql = "SELECT catalogo.Denominacion AS 'Tipo de documento'," 
        + "concat(persona.PrimerNombre, ' ',persona.SegundoNombre,' ',"
        + "persona.PrimerApellido,' ', persona.SegundoApellido) AS "
        +"'Nombre completo'FROM persona INNER JOIN catalogo ON "
        + "persona.ID_Documento = catalogo.ID_Universal;";
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}
PersonaModelo.getPersona = function (id, callback)
 { console.log("Esta pasando por aca")
     if(connection)
     {
        
         var sql = "SELECT persona.ID_Usuario,"
        + "B.Denominacion AS CA, "
        + "persona.PrimerNombre,"
        + "persona.SegundoNombre,"
        + "persona.PrimerApellido," 
        + "persona.SegundoApellido,"
        + "A.Denominacion AS DE,"
        + "CA.Denominacion"
        + "FROM `persona`  AS persona, "
        + "INNER JOIN catalogo AS A ON persona.ID_TipoUsuario=A.ID_Universal"
        + "INNER JOIN catalogo AS B ON persona.ID_Documento=B.ID_Universal"
        + "INNER JOIN catalogo AS CA ON persona.ID_Eps=CA.ID_Universal"
        + "WHERE persona.ID_Usuario=1;";
                 


         connection.query(sql, function (error, row)
         {
             if (error)
             {
             throw error;
             }
             else
             {
                 callback(null, row);
                 //callback(null, JSON.stringify(row));
             }
         });
     }
 }

//Actualizar persona
PersonaModelo.updatePersona= function(PersonaData, callback){
    if (connection){
        var sql="UPDATE persona SET "
        + " ID_Usuario = " + connection.escape(PersonaData.ID_Usuario)
        + ", ID_Documento = " + connection.escape(PersonaData.ID_Documento)
        + ", NumeroDocumento = " + connection.escape(PersonaData.NumeroDocumento)
        + ", PrimerNombre = " + connection.escape(PersonaData.PrimerNombre)
        + ", SegundoNombre = " + connection.escape(PersonaData.SegundoNombre)
        + ", PrimerApellido = " + connection.escape(PersonaData.PrimerApellido)
        + ", SegundoApellido = " + connection.escape(PersonaData.SegundoApellido)
        + ", ID_TipoUsuario = " + connection.escape(PersonaData.ID_TipoUsuario)
        + ", ID_Eps = " + connection.escape(PersonaData.ID_Eps)
        + " WHERE  ID_Usuario = " + connection.escape(PersonaData.ID_Usuario) + ";";

        connection.query(sql, function(error, result){
            if(error){
                callback(null,{"msg": "Se presento un error"});
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

//Inserar persona
PersonaModelo.insertPersona = function (PersonaData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO persona SET ? ";

        connection.query(sql, PersonaData, function (error, result)
        {
           
            //se muestra el mensaje correspondiente
            if (error)
            {
                callback(null,{"msg": "Se presento un error"});
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }
}



module.exports = PersonaModelo;



