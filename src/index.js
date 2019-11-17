const express = require('express');
//Inicializacion
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const routs = require('./routes/index');
const mySqlStore = require('express-mysql-session');
const passport = require('passport');
const {database} = require('./keys');

//Inicializacion
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', '.hbs');

 app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials'), //quiero escribir estos directorios manual lueguito
    extname: 'hbs',
    helpers: require('./lib/handdlebars')
    
}));



//Middlewares
app.use(session({
    secret:'ramonsanchez',
    resave: false,
    saveUninitialized: false,
    store: new mySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next)=>{
    app.locals.successCrud = req.flash('successCrud');
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
next();
})

//Routes

app.use(routs);
app.use(require('./routes/authentication'));
app.use('/links' , require('./routes/links'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(app.get('port'), ()=>{
    console.log(`server on port:  ${app.get('port')}`);
})
