var jwt = require('jsonwebtoken');

var routes = function(app, router, passportInstance) {
  
    //Twitter SignIn
    router.get('/twitter', passportInstance.passport.authenticate('twitter'));
    
    //Twitter callback
    router.get('/twitter/callback', 
        passportInstance.passport.authenticate('twitter', { failureRedirect: '/' }),
        (req, res) => {
            console.log("logged in");
            res.render('app');
        });
    
    //Login comprobation
    router.get('/login', (req, res) => {
        if(!req.user) return res.status(401);
        console.log("authorized");
        res.status(200).json({
            user: req.user
        });
    });
    
    
    // Logout
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    return router;
};

module.exports = routes;