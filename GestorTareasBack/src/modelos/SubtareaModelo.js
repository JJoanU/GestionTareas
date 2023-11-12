var connection = require('../conexion');
var SubtareaModelo = {};


//Listar subtarea
SubtareaModelo.getSubtareas = function (callback)
{
    if (connection)
    {
        var sql = "SELECT tareas.NombreTarea, subtarea.NombreSubtarea, subtarea.FechaInicio, subtarea.FechaFinalizacion, "
        + "catalogo.Denominacion AS 'Estado Subtarea' "
        + " FROM subtarea "
        + " INNER JOIN catalogo ON subtarea.ID_Estado = catalogo.ID_Universal "
        + " INNER JOIN tareas ON subtarea.ID_Tarea = tareas.ID_Tarea; ";
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

//Actualizar subtarea
SubtareaModelo.updateSubtarea= function(SubtareaData, callback){
    if (connection){
        var sql="UPDATE subtarea SET "
        + " ID_Subtarea = " + connection.escape(SubtareaData.ID_Subtarea)
        + ", NombreSubtarea = " + connection.escape(SubtareaData.NombreSubtarea)
        + ", FechaInicio = " + connection.escape(SubtareaData.FechaInicio)
        + ", FechaFinalizacion = " + connection.escape(SubtareaData.FechaFinalizacion)
        + ", ID_Estado = " + connection.escape(SubtareaData.ID_Estado)
        + ", ID_Tarea = " + connection.escape(SubtareaData.ID_Tarea)
        + " WHERE  ID_Subtarea  =  " + connection.escape(SubtareaData.ID_Subtarea) + ";";
        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

//Inserar subtarea
SubtareaModelo.insertSubtarea = function (SubtareaData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO subtarea SET ? ";

        connection.query(sql, SubtareaData, function (error, result)
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

SubtareaModelo.getSubtareaTipo = function (tip, callback)
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

module.exports = SubtareaModelo;
