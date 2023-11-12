var connection = require('../conexion');
var CatalogoModelo = {};


//Listar catalogo
CatalogoModelo.getCatalogos = function (callback)
{
    if (connection)
    {
        var sql = "SELECT `ID_Universal`, `Denominacion`, `CatalogoUniversal`, `LlaveForanea` FROM `catalogo` ";
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
 // Obtener un registro especifico de un tipo de catalogo

 CatalogoModelo.getCatalogoU = function (tipcat,id, callback)
 {
     if(connection)
     {
        
         var sql = "SELECT `ID_Universal`, " +
                         "`Denominacion`, " +
                         "`CatalogoUniversal`, " +
                         "`LlaveForanea` " +
                 " FROM `catalogo` " +
                 " WHERE `LlaveForanea` = " + connection.escape(tipcat) +
                 " AND `ID_Universal` = " + connection.escape(id) + ";";


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
 CatalogoModelo.getCatalogoUEdi = function (id, callback)
{
    if(connection)
    {
        console.log("ACA 144 " + connection.escape(id));
        var sql = "SELECT `ID_Universal`, " +
                        "`Denominacion`, " +
                        "`CatalogoUniversal`, " +
                        "`LlaveForanea` " +
                " FROM `catalogo` " +
                " WHERE `ID_Universal` = " + connection.escape(id) +
                " ORDER BY `Denominacion`;";
         connection.query(sql, function (error, rows)
        {
 
            if (error)
            {
                throw error;
            }
            else
            {
                //debuelve las filas como un Json
                callback(null, rows);
                //comvierte las filas Json a una cadena de texto para Angular
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}
//Actualizar catalogo
CatalogoModelo.updateCatalogo= function(CatalogoData, callback){
    if (connection){
        var sql="UPDATE catalogo SET "
        + " ID_Universal = " + connection.escape(CatalogoData.ID_Universal)
        + ", Denominacion = " + connection.escape(CatalogoData.Denominacion)
        + ", CatalogoUniversal = " + connection.escape(CatalogoData.CatalogoUniversal)
        + ", LlaveForanea = " + connection.escape(CatalogoData.LlaveForanea)
        + " WHERE  ID_Universal  =  " + connection.escape(CatalogoData.ID_Universal) + ";";
        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

//Inserar catalogo
CatalogoModelo.insertCatalogo = function (CatlogoData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO catalogo SET ? ";

        connection.query(sql, CatlogoData, function (error, result)
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

CatalogoModelo.getCatalogoTipo = function (tip, callback)
{
    if (connection)
    {
        var sql = "SELECT `ID_Universal`, `Denominacion`, `CatalogoUniversal`, `LlaveForanea` FROM `catalogo` WHERE `LlaveForanea`= "+connection.escape(tip)+";";                
                    

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

module.exports = CatalogoModelo;
