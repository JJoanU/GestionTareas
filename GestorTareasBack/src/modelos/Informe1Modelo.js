var connection = require('../conexion');
 
var Informe1Modelo = {}; // Corregir el nombre de la variable aquí (era 'Infomre1Modelo')
 
//Listar informe
Informe1Modelo.getInforme1 = function (parametros, callback) {
  if (connection) {
    var sql =
      "SELECT tareas.NombreTarea, subtarea.NombreSubtarea, subtarea.FechaInicio, subtarea.FechaFinalizacion, catalogo.Denominacion AS 'Estado Subtarea', concat(persona.PrimerNombre,' ', persona.PrimerApellido) AS 'Nombre' " +
      "FROM tareas " +
      "INNER JOIN persona ON tareas.ID_Usuario = persona.ID_Usuario " +
      "INNER JOIN subtarea ON tareas.ID_Tarea = subtarea.ID_Tarea " +
      "INNER JOIN catalogo ON subtarea.ID_Estado = catalogo.ID_Universal " +
      "WHERE persona.ID_Usuario =" + connection.escape(parametros.ID_Usuario) +
      " ORDER BY subtarea.FechaInicio ASC;";
 
    connection.query(sql, function (error, rows) {
      if (error) {
        callback(error, null); // Enviar error al callback
      } else {
        callback(null, rows); // Enviar los resultados al callback
      }
    });
  }
};
 
module.exports = Informe1Modelo;