const pool =    require('../database');
module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/ute/login');
    },
     isNotLoogedin(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/profile');
        }
     },
     validateAccesousUsuario(req, res, next){
         /* console.log(req.user); */
        console.log(req.user.USUARIO_ID===1);
        if(req.user.USUARIO_ID===1){
          return next();
        }
     }
};