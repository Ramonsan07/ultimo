module.exports = newObject = {
    
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
           return next();
        }else{
            console.log('redireccionado'.red);
          return res.redirect('/signin'); // ver si fuciona sin los returns. si funciona solo marca el fin de la funcion y el next se ejecuta normal
        }

    }

}
