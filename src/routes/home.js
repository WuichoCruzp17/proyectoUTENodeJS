const express =    require('express');
const router = express.Router();
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
const indexController  = require('../controllers/indexController');
const alumnoController  = require('../controllers/alumnoController');
const loginController = require('../controllers/loginController');
router.get('/',indexController.getIndex);
router.get('/ute/login',indexController.getLogin);
router.post('/ute/validateDateAlumno',alumnoController.validateDateAlumno);
router.post('/ute/save',alumnoController.save);
router.post('/ute/login', indexController.validateSession);
router.get('/ute/maestros',indexController.getViewMaestros);
router.get('/ute/index',isLoggedIn,indexController.getIndexAdministrador);
router.get('/ute/logout', isLoggedIn, loginController.getLogout);
module.exports = router;

