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
         const url = req.url;
         console.log(url);
         if(req.user.hasOwnProperty('EMPLEADO_ID')){
             console.log("Entro a la propiedad");
            const pages = req.user.page;
            if(pages !== undefined)

            for(var i=0; i<pages.length;i++){
                if(pages[i].URL === url){
                    return next();
                }
            }
            return res.redirect('/ute/index');
         }
        
            
        
     }
};