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
         const url = (req.url !=="/") ? req.url :req.baseUrl;
         console.log("URL:"+url);
         console.log("BaseURL:"+req.baseUrl);
         if(req.user.hasOwnProperty('empleadoId')){
             console.log("Entro a la propiedad");
            const pages = req.user.page;
            console.log("Paginas ----->", pages[0]);
            for(var i=0; i<pages.length;i++){
                console.log(pages[i].url);
                if(pages[i].url === url){
                    console.log("Entro al IF");
                    return next();
                }
            }
            return res.redirect('/ute/index');
         }
        
            
        
     }
};