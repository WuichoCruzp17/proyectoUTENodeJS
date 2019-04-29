const express =    require('express');
const morgan =    require('morgan');
const expresshbs =  require('express-handlebars');
const path =    require('path');
const flash=require('connect-flash');
const session =    require('express-session');
const mysqlStore=    require('express-mysql-session');
const {database,errorpage} =    require('./keys');
const passport =    require('passport');
//Initizations
const app =    express();
require('./lib/passport');
//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',expresshbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir:path.join(app.get('views'), '/partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');
//Middlewares -> Se ejecuta en cada peticion al servidor
 app.use(session({
    secret:'fatzmysqlnodesession',
    resave:false,
    saveUninitialized:false,
    store: new mysqlStore(database)
}));
app.use(flash());//Enviar mensajes
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Global Variables
app.use((req, res, next)=>{
     app.locals.success = req.flash('success');
     app.locals.message = req.flash('message');
     app.locals.user    =req.user;
     next();
});

//Routes
app.use(require('./routes/home'));
app.use('/ute/empleados',require('./routes/empleados'));
/*app.use(require('./routes/authentication'));
app.use(require('./routes/profile'));
app.use('/links',require('./routes/links'));*/
//Public
app.use(express.static(path.join(__dirname, 'public')));
//Startin server
app.listen(app.get('port'),()=>{
    console.log('Server on por', app.get('port'));
});

app.use(function(req, res, next) {
    console.log(req.url);
    res.render('error_404',{url:req.url.split("/")[1]});
  });
