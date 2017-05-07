/**
 * Created by championswimmer on 08/03/17.
 */
const router = require('express').Router();
const passport = require('../../passport/passporthandler');

const config = require('../../config');

function authnOrAuthzFacebook(req, res, next) {
    if (!req.isAuthenticated()) {
        if(config.DEBUG) console.log("Authn Facebook = = = = = ");
        passport.authenticate('facebook', {
            scope: config.FACEBOOK_LOGIN_SCOPES,
            failureRedirect: '/login',
            successReturnToOrRedirect: '/users/me'
        })(req, res, next);
    } else {
        if(config.DEBUG) console.log("Authz Facebook = = = = = = ");
        passport.authorize('facebook', {
            scope: config.FACEBOOK_LOGIN_SCOPES,
            failureRedirect: '/login',
            successReturnToOrRedirect: '/users/me',
        })(req, res, next);
    }
}

router.get('/', passport.authenticate('facebook', {scope: ['email']}));

router.get('/callback', authnOrAuthzFacebook);

module.exports = router;