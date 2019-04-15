const pool =    require('../database');
const empleado = require('../models/empleado');
const usuarioController = require('./usuarioController');
const bdComponents = require('../utilsModels/bdComponents');
const empleadosController ={};
empleadosController.getViewEmpleados =async (req, res)=>{
    //const usuario = await pool.query('SELECT USUARIO_ID AS usuarioId, NOMBRE AS nombre FROM USUARIO');
   const usuario = await usuarioController.getUsuariosDinamic('USUARIO_ID AS usuarioId, NOMBRE AS nombre','WHERE USUARIO_ID != 2');
    res.render('ute/empleados',{usuario});
};
empleadosController.save =async(req,res)=>{

const user = req.body;
user.usuario = parseInt(user.usuario);
const row = await pool.query('INSERT INTO EMPLEADO VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [
    null,user.name,user.apellidoPaterno, user.apellidoMaterno, user.fechaNacimiento, user.email, 
    user.upload, user.description,'luis', parseInt(user.usuario),1,1,null
]);
/* const email =user.email;
if(row){
    var mailOptions = {
        from: user.email,
        to: email,
        subject: 'Bienvenido al sistema.',
        text: 'Hola '+user.name+" "+user.apellido_p+" "+user.apellido_m,
        html:'<h1>Bienvenido al Sistema : "'+user.name+'"</h1>'
      };
      helpers.setEmail(mailOptions);
} */
res.json({success:'exito', row});
};

empleadosController.update = async(req,res)=>{
const {empleadoId, usuario, name, apellidoPaterno, apellidoMaterno, email, upload, description} = req.body;
const row = await pool.query('UPDATE EMPLEADO SET NOMBRE = ?, APELLIDO_MATERNO = ?, APELLIDO_PATERNO =?, EMAIL =?,  UPLOAD =?, DESCRIPCION =?,  USUARIO_ID=? WHERE EMPLEADO_ID =?',
[name,apellidoMaterno, apellidoPaterno,email,upload,description, usuario, empleadoId]);
res.json({success:'OK'});
};

empleadosController.getEmpleados = async (req, res)=>{
    console.log("EMPLEADOS");
    const empleados = await pool.query('SELECT EMPLEADO_ID, CONCAT(NOMBRE, APELLIDO_PATERNO, APELLIDO_MATERNO) AS NOMBRE, EMAIL FROM EMPLEADO WHERE ESTATUS_ID=1 AND ELIMINADO_ID=1 AND USUARIO_ID >1');
   // console.log( await empleado.executeQuery(`SELECT ${empleado.columns.empleadoId.column}, ${bdComponents.functions.CONCAT(['NOMBRE','APELLIDO_PATERNO','APELLIDO_MATERNO'],'NOMBRE')}, EMAAIL FROM EMPLEADO WHERE ESTATUS=1 AND USUARIO_ID>1`  ));
  // console.log( await empleado.select(`${empleado.columns.empleadoId.column}, ${bdComponents.functions.CONCAT(['NOMBRE','APELLIDO_PATERNO','APELLIDO_MATERNO'],'NOMBRE')}, EMAIL`,'WHERE ESTATUS_ID=1 AND USUARIO_ID>1'));
   res.json(empleados);
};

empleadosController.getEmpleadoFindById = async (req, res) =>{
    var cols = {
            usuarioId:empleado.columns.usuarioId,
            nombre:empleado.columns.nombre,
            apellidoPaterno:empleado.columns.apellidoPaterno,
            apellidoMaterno:empleado.columns.apellidoMaterno,
            fechaNacimiento:empleado.columns.fechaNacimiento,
            upload:empleado.columns.upload,
            descripcion:empleado.columns.descripcion,
            email:empleado.columns.email
    }
    const obj = await empleado.findById(req.params.empleadoId, cols);
    res.json(obj);
};

empleadosController.delete = async (req, res) =>{

};
module.exports = empleadosController;