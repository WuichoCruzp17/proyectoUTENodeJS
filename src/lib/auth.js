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
     }
};