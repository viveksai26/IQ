const debug = require('debug')('app:routes:auth')

class Auth {
    async getToken(req, res, next) {
        debug('get Token')

    }
    async validateToken(req, res, next) {

    }
    async login(req, res, next) {

    }
}

module.exports = new Auth();