const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const usuarioId = parseInt(req.body.usuario);
    var  rows =null;
    switch(usuarioId){
        case 1:
        try{rows = await pool.query('SELECT * FROM EMPLEADO WHERE EMAIL = ? ',[req.body.username]);}catch(err){console.log(err); row =[];}
        
        break;
    }
    if(rows.length>0){
        const user = rows[0];
         const validPassword =  await  helpers.matchPassword(password, user.PASSWORD);
         if(validPassword){
             done(null,  user, req.flash('success','Welcome'+user.NOMBRE));
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
    switch(req.body.USUARIO_ID){
        case 1:
        const {EMPLEADO_ID, NOMBRE,APELLIDO_PATERNO,APELLIDO_MATERNO,FECHA_NACIMIENTO,EMAIL,USUARIO_ID  } = req.body;
        newUser = {
            usuarioId: EMPLEADO_ID, NOMBRE,APELLIDO_PATERNO,APELLIDO_MATERNO,FECHA_NACIMIENTO,EMAIL,USUARIO_ID
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
    switch(user.USUARIO_ID){
        case 1:
        user.page = await pool.query('SELECT PAGINA.NOMBRE, PAGINA.URL FROM PAGINA, USUARIO_ACCESO WHERE PAGINA.PAGINA_ID = USUARIO_ACCESO.PAGINA_ID AND USUARIO_ACCESO.USUARIO_ID =?', [user.USUARIO_ID]);
        console.log("Serealize",user);
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
        if(user.hasOwnProperty('EMPLEADO_ID')){
           
            rows = await pool.query('SELECT * FROM EMPLEADO WHERE EMPLEADO_ID = ?', [user.EMPLEADO_ID]);
            rows= helpers.setFunctions(rows[0]);
            rows.pages = await pool.query('SELECT PAGINA.NOMBRE, PAGINA.URL FROM PAGINA, USUARIO_ACCESO WHERE PAGINA.PAGINA_ID = USUARIO_ACCESO.PAGINA_ID AND USUARIO_ACCESO.USUARIO_ID =?', [user.USUARIO_ID]);
            done(null, rows);
        }else if(user.hasOwnProperty('ALUMNO_ID')){

        }
    }
     
    done(null, user);
});
