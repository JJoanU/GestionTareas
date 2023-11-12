var connection = require('../conexion');
var Informe2Modelo = {};

//Listar informe 2
Informe2Modelo.getInforme2 = function (parametros, callback) {
  if (connection) {
    var sql =
      "SELECT tareas.ID_Tarea, tareas.NombreTarea, subtarea.ID_Subtarea, subtarea.NombreSubtarea, subtarea.FechaInicio, subtarea.FechaFinalizacion, catalogo.Denominacion AS 'EstadoSubtarea', concat(persona.PrimerNombre,' ', persona.PrimerApellido) AS 'Nombre' " +
      "FROM tareas " +
      "INNER JOIN persona ON tareas.ID_Usuario = persona.ID_Usuario " +
      "INNER JOIN subtarea ON tareas.ID_Tarea = subtarea.ID_Tarea " +
      "INNER JOIN catalogo ON subtarea.ID_Estado = catalogo.ID_Universal " +
      "WHERE persona.ID_Usuario = " + connection.escape(parametros.ID_Usuario) +
      " AND subtarea.FechaInicio BETWEEN " + connection.escape(parametros.FechaInicio) +
      " AND " + connection.escape(parametros.FechaFinalizacion) +
      " ORDER BY subtarea.FechaInicio ASC;";
          connection.query(sql, function (error, rows) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, rows);
      }
    });
  }
};

module.exports = Informe2Modelo;