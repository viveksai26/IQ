const debug = require('debug')('app:routes:auth')
var jwt = require('jsonwebtoken');
const {
    signIn,
    HTTPCodes,
} = require('../utils/helper')
class Auth {
    async getToken(req, res, next) {
        try {
            console.log('token');
            signIn().then(token => {
                console.log(token);

                buildStatus(res, HTTPCodes.SUCCESS, token);
            }).catch(err => {
                next(err);
            })
        } catch (err) {
            next(err)
        }

    }
    async validateToken(req, res, next) {

    }
    async login(req, res, next) {

    }
}

module.exports = new Auth();