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
        rows = await pool.query('SELECT * FROM EMPLEADO WHERE EMAIL = ? ',[req.body.username]);
        break;
    }
    if(rows.length>0){
        /* console.log(req.body);
        console.log(rows); */
        const user = rows[0];
        /* console.log('password: ',password, 'userPassword:', user.PASSWORD); */
         const validPassword =  await  helpers.matchPassword(password, user.PASSWORD);
         /* console.log(validPassword); */
         if(validPassword){
             console.log('Usuario valido');
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
    console.log(req.body);
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
passport.serializeUser((user, done) => {
    console.log(user);
    switch(user.USUARIO_ID){
        case 1:
        done(null, user.EMPLEADO_ID);
        break;
    }
});
/**
 * Función que se encarga de validar si hay una cuenta de usuaria existente.
 */
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM EMPLEADO WHERE EMPLEADO_ID = ?', [id]);
    done(null, rows[0]);
});
