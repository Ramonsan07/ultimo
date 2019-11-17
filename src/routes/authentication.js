const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../lib/auth');

router.get('/signup', (req, res)=>{
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true

}));

router.get('/signin', (req, res)=>{
    res.render('auth/signin');
});

router.post('/signin',(req, res, next)=>{
    passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true})(req, res, next); //inmediately evoked function

     });

    //gracias diosito
router.get('/profile', isLoggedIn, (req, res)=>{
res.render('profile');

});

router.get('/logOut', (req, res)=>{
    req.logOut();
    console.log('sesion cerrada'.green);
    res.redirect('/signin');
})

module.exports = router;
