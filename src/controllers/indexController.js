const pool =    require('../database');
const passport = require('passport');
const indexController = {};

indexController.getIndex =(req,res)=>{
    res.render('index');
};

indexController.getLogin =async(req,res)=>{
    const usuario = await pool.query('SELECT USUARIO_ID AS usuarioId, NOMBRE AS nombre FROM USUARIO');
    res.render('ute/login',{usuario});
};
indexController.validateSession = async(req,res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/ute/index',
        failureRedirect: '/ute/login',
        failureFlash: true
      })(req, res, next);
};
indexController.getIndexAdministrador =(req,res, next)=>{
    res.render('ute/index');
};
indexController.getViewMaestros =(req,res)=>{
    res.render('ute/maestros');
};
indexController.getViewAcceso = (req, res)=>{
    res.render('ute/paginas');
};
module.exports =indexController;