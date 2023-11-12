var connection = require('../conexion');
var BalanceModelo = {};


//Listar balance
BalanceModelo.getBalance = function (callback)
{
    if (connection)
    {
        var sql = "SELECT tareas.NombreTarea, concat(persona.PrimerNombre,' ', persona.PrimerApellido) AS 'Nombre usuario',"
       +"balance.HorasTrabajadas, balance.Fecha "
       +" FROM balance "
       +" INNER JOIN tareas ON balance.ID_Tarea = tareas.ID_Tarea "
       +" INNER JOIN persona ON balance.ID_Usuario = persona.ID_Usuario;";
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

//Actualizar balance
BalanceModelo.updateBalance= function(BalanceData, callback){
    if (connection){
        var sql= "UPDATE balance SET "
        + "ID_Balance= "+ connection.escape(BalanceData.ID_Balance)
        +" ,ID_Tarea= " + connection.escape(BalanceData.ID_Tarea)
        +" ,ID_Usuario= "+ connection.escape(BalanceData.ID_Usuario)
        +" ,HorasTrabajadas= " +connection.escape(BalanceData.HorasTrabajadas)
        +" ,Fecha=" +connection.escape(BalanceData.Fecha)
        +" WHERE ID_Balance = " +connection.escape(BalanceData.ID_Balance) +";";

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

//Insertar balance
BalanceModelo.insertBalance = function (BalanceData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO balance SET ? ";

        connection.query(sql, BalanceData, function (error, result)
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

BalanceModelo.getBalanceTipo = function (tip, callback)
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

module.exports = BalanceModelo;
