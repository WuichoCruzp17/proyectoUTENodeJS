const express =    require('express');
const router = express.Router();
const indexController  = require('../controllers/indexController');
const alumnoController  = require('../controllers/alumnoController');
router.get('/',indexController.getIndex);

router.get('/ute/login',indexController.getLogin);
router.post('/ute/validateDateAlumno',alumnoController.validateDateAlumno);
router.post('/ute/save',alumnoController.save);

module.exports = router;

