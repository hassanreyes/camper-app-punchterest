var User = require('./models/user');
var TwitterStrategy = require("passport-twitter").Strategy;
    
module.exports = {
    
    passport: undefined,
    
    config: function(passport, address, port){
        
        this.passport = passport;
    
        passport.serializeUser(function(user, done) {
            done(null, user._id);
        });
    
        passport.deserializeUser(function(id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });
    
        //Twitter strategy
        const twitterLogin = new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.DOMAIN + "/auth/twitter/callback"
        },(token, tokenSecret, profile, done) => {
            User.findOne({ twitterId: profile.id }, function (err, user) {
                if(err) return done(err);
                
                if(user) return done(null, user);
                
                user = new User({
                    twitterId   : profile.id,
                    name        : profile.username,
                    displayName : profile.displayName,
                    photoURL    : profile.photos[0].value           
                });
                
                user.save(err => {
                    return done(err, user);
                });
            });
        });
        
        passport.use('twitter', twitterLogin);
    
    },
    authorize: function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/');
    }
};