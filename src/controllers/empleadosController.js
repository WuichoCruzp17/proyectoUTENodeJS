const pool =    require('../database');
const passport = require('passport');
const empleadosController ={};
empleadosController.getViewEmpleados =async (req, res)=>{
    const usuario = await pool.query('SELECT USUARIO_ID AS usuarioId, NOMBRE AS nombre FROM USUARIO');
    const empleados = await pool.query('SELECT * FROM EMPLEADO WHERE ESTATUS_ID=1 AND ELIMINADO_ID=1 AND USUARIO_ID >1');
    console.log(empleados);
    console.log(usuario);
    res.render('ute/empleados',{usuario,empleados});
};
module.exports = empleadosController;