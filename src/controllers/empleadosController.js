const pool =    require('../database');
const passport = require('passport');
const helpers = require('../lib/helpers');
const empleadosController ={};
empleadosController.getViewEmpleados =async (req, res)=>{
    const usuario = await pool.query('SELECT USUARIO_ID AS usuarioId, NOMBRE AS nombre FROM USUARIO');
    const empleados = await pool.query('SELECT * FROM EMPLEADO WHERE ESTATUS_ID=1 AND ELIMINADO_ID=1 AND USUARIO_ID >1');
    console.log(empleados);
    console.log(usuario);
    res.render('ute/empleados',{usuario});
};
empleadosController.save =async(req,res)=>{

const user = req.body;
user.usuario = parseInt(user.usuario);
console.log(user);
const row = await pool.query('INSERT INTO EMPLEADO VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [
    null,user.name,user.apellido_p, user.apellido_m, user.happy_brithday, user.email, 
    user.upload, user.description,'luis', parseInt(user.usuario),1,1,null
]);
const email =user.email;
console.log(row);
if(row){
    var mailOptions = {
        from: user.email,
        to: email,
        subject: 'Bienvenido al sistema.',
        text: 'Hola '+user.name+" "+user.apellido_p+" "+user.apellido_m,
        html:'<h1>Bienvenido al Sistema : "'+user.name+'"</h1>'
      };
      helpers.setEmail(mailOptions);
}
res.json({success:'exito', row});
};

empleadosController.getEmpleados = async (req, res)=>{
    const empleados = await pool.query('SELECT EMPLEADO_ID, CONCAT(NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO) AS NOMBRE, EMAIL FROM EMPLEADO WHERE ESTATUS_ID=1 AND ELIMINADO_ID=1 AND USUARIO_ID >1');
    res.json(empleados);
};

module.exports = empleadosController;