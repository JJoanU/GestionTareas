var connection = require('../conexion');
var TareaModelo = {};


//Listar tareas
TareaModelo.getTareas = function (callback)
{
    if (connection)
    {
        var sql = "SELECT concat(persona.PrimerNombre,' ', persona.PrimerApellido) AS 'Nombre y apellido', tareas.NombreTarea, tareas.FechaInicio, tareas.FechaFinalizacion, catalogo.Denominacion AS 'Estado'FROM tareas INNER JOIN persona ON tareas.ID_Usuario = persona.ID_Usuario INNER JOIN catalogo ON tareas.ID_Estado = catalogo.ID_Universal;";
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

//Actualizar tarea
TareaModelo.updateTarea= function(TareaData, callback){
    if (connection){
        var sql="UPDATE tareas SET "
        + " ID_Tarea = " + connection.escape(TareaData.ID_Tarea)
        + ", NombreTarea = " + connection.escape(TareaData.NombreTarea)
        + ", FechaInicio = " + connection.escape(TareaData.FechaInicio)
        + ", FechaFinalizacion = " + connection.escape(TareaData.FechaFinalizacion)
        + ", ID_Estado = " + connection.escape(TareaData.ID_Estado)
        + ", ID_Prioridad = " + connection.escape(TareaData.ID_Prioridad)
        + ", ID_Usuario = " + connection.escape(TareaData.ID_Usuario)
        + " WHERE  ID_Tarea  =  " + connection.escape(TareaData.ID_Tarea) + ";";
        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

//Inserar tarea
TareaModelo.insertTarea = function (TareaData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO tareas SET ? ";

        connection.query(sql, TareaData, function (error, result)
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

TareaModelo.getTareaTipo = function (tip, callback)
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

module.exports = TareaModelo;
//Crear Tarea

// Importa la conexión a la base de datos desde donde sea que la tengas definida
const connection = require('./ruta/a/tu/archivoDeConexion');

const TareaModelo = {};

TareaModelo.getTareas = function (callback) {
    if (connection) {
        var sql = "SELECT `ID_Tarea`, `NombreTarea`, `FechaInicio`, `FechaFin`, `ID_Estado`, `ID_Prioridad`, `ID_Usuario` FROM `tarea`";
        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

module.exports = TareaModelo;