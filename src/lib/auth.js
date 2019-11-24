module.exports = newObject = {

    isNotLoggedIn(req,res, next){
        if(!req.isAuthenticated()){
            return next(); 
        }
        else{
            res.redirect('/profile');
        }
    },
    
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
           return next();
        }else{
          return res.redirect('/signin'); // ver si fuciona sin los returns. si funciona solo marca el fin de la funcion y el next se ejecuta normal
        }

    }

}
