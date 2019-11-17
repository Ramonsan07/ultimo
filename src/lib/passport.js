const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('./helpers');
const pool = require('../database');
require('colors');


passport.use('local.signup', new localStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, userName, password, done)=>{
    const {fullName} = req.body;
    const newUser = {USERNAME: userName, PASSWORD: password, FULLNAME: fullName};
    
    newUser.PASSWORD = await bcrypt.encryptPassword(newUser.PASSWORD);
    const result = await pool.query('INSERT INTO USER SET ?', [newUser]);
    newUser.ID = result.insertId//para darle el id de insercion al user que retorno
    console.log(newUser);
    //console.log(result);
    done(null, newUser);

}));

passport.use('local.signin', new localStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, userName, password, done)=>{

    const user = await pool.query('SELECT * FROM USER WHERE USERNAME = ?', [userName]); //aqui retorna los nombres de los atributos en mayusculas
    if(user.length > 0){
    let authenticate  = await bcrypt.matchPassword(password, user[0].PASSWORD);
        if(authenticate){
        done(null, user[0], req.flash('success', `welcome ${userName}`));
        }else{
        done(null,false, req.flash('message', 'contraseña incorrecta'));
        }
    }else{
        done(null, false, req.flash('message', `el usuario ${userName} no existe`));
    }
    

}));

 
passport.serializeUser((user,done)=>{
    done(null, user.ID); //la base de datos retorna un atributo ID en matusculas. cuando se accede al atributo desde js debe estar en mayuscula tambien.

});

passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query('SELECT * FROM USER WHERE id = ?', [id]);
    done(null, rows[0]);

});  
