const indexController = {};

indexController.getIndex =(req,res)=>{
    res.render('index');
};

indexController.getLogin =(req,res)=>{
    console.log('Login');
    res.render('ute/login');
};

module.exports =indexController;