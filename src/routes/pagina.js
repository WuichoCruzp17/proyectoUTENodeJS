const express =    require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/',isLoggedIn,validateAccesousUsuario, linkController.getViewAcceso);
router.post('/saveURL', isLoggedIn, linkController.save);
router.get('/getPages', isLoggedIn, linkController.getPages);
module.exports = router;