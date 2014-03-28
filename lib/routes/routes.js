/*jslint node: true*/

"use strict";


module.exports = function(app, passport) {
    app.get('/',function(req, res) {
        res.render('login', {
            message: req.flash('error')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/dashboard', isLogged, function(req, res) {
        res.render('dashboard', {});
    });

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');
    }
};