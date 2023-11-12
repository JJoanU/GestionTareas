var connection = require('../conexion');
var ContactoModelo = {};


//Listar contactos
ContactoModelo.getContactos = function (callback)
{
    if (connection)
    {
        var sql = "SELECT concat(persona.PrimerNombre, ' ' , persona.PrimerApellido) AS 'Nombre completo',"+
        "catalogo.Denominacion AS 'Tipo de contacto', Contacto.Contacto "+
        "FROM contacto "+
        "INNER JOIN persona ON contacto.ID_Usuario = persona.ID_Usuario "+
        "INNER JOIN catalogo ON Contacto.ID_TipoContacto = catalogo.ID_Universal;";
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

//Actualizar contacto
ContactoModelo.updateContacto= function(ContactoData, callback){
    if (connection){
        var sql="UPDATE contacto SET "
        + " ID_Contacto = " + connection.escape(ContactoData.ID_Contacto)
        + ", ID_TipoContacto = " + connection.escape(ContactoData.ID_TipoContacto)
        + ", ID_Usuario = " + connection.escape(ContactoData.ID_Usuario)
        + ", Contacto = " + connection.escape(ContactoData.Contacto)
        + " WHERE  ID_Contacto  =  " + connection.escape(ContactoData.ID_Contacto) + ";";
        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

//Inserar contacto
ContactoModelo.insertContacto = function (ContactoData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO contacto SET ? ";

        connection.query(sql, ContactoData, function (error, result)
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

ContactoModelo.getContactoTipo = function (tip, callback)
{
    if (connection)
    {
        var sql = "";                


        connection.query(sql, function (error, rows)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}

module.exports = ContactoModelo;
