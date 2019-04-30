const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const loginController = require('../controllers/loginController');
const paginaController = require('../controllers/paginaController');
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const login = {
        usuarioId: parseInt(req.body.usuario),
        username:req.body.username
    };
    var  rows =null;
    rows = await loginController.getUser(login);
    /* console.log("Passport", rows); */
    if(rows.length>0){
        const user = rows[0];
         const validPassword =  await  helpers.matchPassword(password, user.contrasena);
         if(validPassword){
             done(null,  user, req.flash('success','Welcome'+user.nombre));
         }else{
             done(null, false, req.flash('message','Incorrect Password'));
         }
    }else{
        return done(null,false, req.flash('message','The Username does not exists'));
    }
}));
/**
 * Función que se encarga de ejecutar una funcion para la creación del usuario
 */
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log("Despues de validar el usuario LocalStrategy");
    var newUser ={};
    switch(req.body.usuarioId){
        case 1:
        const {empleadoId, nombre,apellidoPaterno,apellidoMaterno,fechaNacimiento,email,usuarioId  } = req.body;
        newUser = {
            usuarioId: empleadoId, nombre,apellidoPaterno,apellidoMaterno,fechaNacimiento,email,usuarioId
            };
        break;
    }

   /*  newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    console.log(result);
    newUser.id = result.insertId;*/
    return done(null, newUser); 
}));
/**
 * Función que se encarga de guardar la session del usuario
 */
passport.serializeUser(async (user, done) => {
   // console.log("Usuario Serelize User: ", user);
   var query ="SELECT PAGINA.NOMBRE as nombre, PAGINA.URL as url FROM PAGINA, USUARIO_ACCESO WHERE PAGINA.PAGINA_ID = USUARIO_ACCESO.PAGINA_ID AND USUARIO_ACCESO.USUARIO_ID =?";
    switch(user.usuarioId){
        case 1:
        
        /* user.page = await paginaController.executeQuery(query,[user.usuarioId]); */
        var rows = await paginaController.getUsuarioAcceso(parseInt(user.usuarioId))
        user.page = rows[0];
        user.pageHTML = await paginaController.buildMenuHtml(user.page);
        /* console.log("Serealize",user); */
        done(null, user);
        break;
    }
});
/**
 * Función que se encarga de validar si hay una cuenta de usuaria existente.
 */
passport.deserializeUser(async (user, done) => {
    
    var rows = null;
    if(typeof user !=="object"){
        if(user.hasOwnProperty('empleadoId')){
           
            rows = await pool.query('SELECT * FROM EMPLEADO WHERE EMPLEADO_ID = ?', [user.empleadoId]);
            rows= helpers.setFunctions(rows[0]);
            rows.pages = await pool.query('SELECT PAGINA.NOMBRE, PAGINA.URL FROM PAGINA, USUARIO_ACCESO WHERE PAGINA.PAGINA_ID = USUARIO_ACCESO.PAGINA_ID AND USUARIO_ACCESO.USUARIO_ID =?', [user.usuarioId]);
            done(null, rows);
        }else if(user.hasOwnProperty('ALUMNO_ID')){

        }
    }
     
    done(null, user);
});
