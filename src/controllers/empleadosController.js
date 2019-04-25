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
    console.log(req.usuario);
    var cols = {
        empleadoId:empleado.getNameColumn('empleadoId'),
        concat:bdComponents.functions.CONCAT([empleado.getNameColumn('nombre'),empleado.getNameColumn('apellidoPaterno'),empleado.getNameColumn('apellidoMaterno')],"nombre"),
        email:empleado.getNameColumn('email')
};
        const empleados = await    empleado.findByProperty(empleado.getNameColumn('usuarioId'),3, cols);
   res.json(empleados);
};

empleadosController.getEmpleadoFindById = async (req, res) =>{
    var cols = {
            usuarioId:empleado.getNameColumn('empleadoId'),
            nombre:empleado.getNameColumn('nombre'),
            apellidoPaterno:empleado.getNameColumn('apellidoPaterno'),
            apellidoMaterno:empleado.getNameColumn('apellidoMaterno'),
            fechaNacimiento:empleado.getNameColumn('fechaNacimiento'),
            upload:empleado.getNameColumn('upload'),
            descripcion:empleado.getNameColumn('descripcion'),
            email:empleado.getNameColumn('email')
    }
    const obj = await empleado.findById(req.params.empleadoId, cols);
    res.json(obj);
};
empleadosController.findByProperty =async (property, value)=>{
    console.log('Propiedad', property);
    console.log('Value', value);
    return await empleado.findByProperty(property, value);
};
empleadosController.delete = async (req, res) =>{

};
module.exports = empleadosController;