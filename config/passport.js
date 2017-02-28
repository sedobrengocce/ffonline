const JwtStrategy = require('passport-jwt').Strategy;
const config = require('./config');

module.exports = function(passport,wagner) {
    let opts = {};
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, wagner.invoke(function (User) {
        return function(jwt_payload, done) {
            User.findOne({id: jwt_payload.id}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }
    })));
};
