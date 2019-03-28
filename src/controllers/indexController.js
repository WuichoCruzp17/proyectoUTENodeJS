const pool =    require('../database');
const passport = require('passport');
const pagina = require('../models/pagina');
const usuario = require('../models/usuario');
const empleado = require('../models/empleado');
const indexController = {};

indexController.getIndex =async (req,res)=>{
    res.render('index');
};

indexController.getLogin =async(req,res)=>{
    const users = await usuario.findAll();
    res.render('ute/login',{users});
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
indexController.getViewAcceso = async (req, res)=>{
    res.render('ute/paginas');
};
module.exports =indexController;