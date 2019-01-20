const pool =    require('../database');
const helpers =require('../lib/helpers');
const alumnoController ={};
/**
 * Función que guarda o actualiza al alumno en la base de datos
 */
alumnoController.save = async(req, res)=>{
    console.log(req.body);
    const query = 'CALL saveEditAlumno(?,?,?,?,?,?,?,?)';
    const {nombre, apellido_paterno, apellido_materno, matricula, email, password} = req.body;
    const  passwordEncrypt = await helpers.encryptPassword(password);
    const isInsert = await pool.query(query,[0,nombre, apellido_paterno,apellido_materno,matricula,email,passwordEncrypt,'']);
    console.log(isInsert);
    if(isInsert.affectedRows ===1 ){
        res.json({success:'Exito'});
    }else{res.json({error:'Hubo un Problema en el Servicio'});} 
    
};
/**
 * Función que valida si el alumno no esta registrado en la base de datos.
 */
alumnoController.validateDateAlumno = async(req,res)=>{
    try{
    const countE =await pool.query('SELECT COUNT(ALUMNO_ID) as email FROM ALUMNO WHERE EMAIL=?',[req.body.emai]);
    const countM =await pool.query('SELECT COUNT(ALUMNO_ID) as matricula FROM ALUMNO WHERE MATRICULA=?',[req.body.matricula]);
    const countN =await pool.query('SELECT COUNT(ALUMNO_ID) as nombre FROM ALUMNO WHERE NOMBRE =? AND APELLIDO_PATERNO=? AND APELLIDO_MATERNO=?',
    [req.body.nombre,req.body.apellido_materno,  req.body.apellido_paterno ]);
    const arr = [countE[0], countM[0],countN[0]];
    var object =null;
    for(var i=0;i<arr.length;i++){
       object = arr[i];
       for(var o in object){
        switch(o){
            case 'email':
                countE[0].email = (countE[0].email===0) ? 0:'El correo ya esta registrado';
            break;
            case 'matricula':
                countM[0].matricula = (countM[0].matricula===0) ? 0:'La matricula ya esta registrado';
            break;
            case 'nombre':
                countN[0].apellidos =(countN[0].nombre===0) ? 0 :'El apellido ya esta registrado';
            break;
        }
       }
        
    }

        res.json({emai:countE[0].email,  matricula: countM[0].matricula, nombre:countN[0].nombre});
}catch(err){res.json({error:'Hubo un problema en el servidor'}); console.log(err);}
};

module.exports = alumnoController;