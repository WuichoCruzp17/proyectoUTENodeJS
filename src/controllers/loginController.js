const pool = require('../database');

const loginController = {};
const empleadoController = require('../controllers/empleadosController');
loginController.getUser =async (login)=>{
    var rows =null;
 switch(login.usuarioId){
    case 1:
        try{/* rows = await pool.query('SELECT * FROM EMPLEADO WHERE EMAIL = ? ',[login.username]); */
        rows = await empleadoController.findByProperty('email',login.username);
    }catch(err){console.log(err); row =[];}
        
    break;
 }
 return rows;
};
loginController.getLogout= (req,res)=>{
    console.log("Entro al logout");
    req.logOut();
    /* res.render('index'); */
};
module.exports = loginController;
