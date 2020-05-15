const debug = require('debug')('app:routes:auth')
const {
    getToken,
    verifyToken,
    HTTPCodes,
} = require('../utils/helper')
const {
    buildStatus,
    buildError
} = require('./helper');
class Auth {
    // Get token
    async getToken(req, res, next) {
        debug(`get token ${req.body}`)
        try {
            const token = await getToken();
            buildStatus(res, HTTPCodes.SUCCESS, {
                token: `bearer ${token}`
            });
        } catch (err) {
            next(err)
        }

    }
    async validateToken(req, res, next) {
        const token = req.get('Authorization');
        if (!token) {
            return next(buildError(HTTPCodes.UNAUTHORIZED, 'UNAUTHORIZED'))
        }
        const tokenList = token.split(' ');
        if (Array.isArray(tokenList) && tokenList.length === 2) {
            try {
                const data = verifyToken(tokenList[1], next)
                return next(data);
            } catch (err) {
                return next(buildError(HTTPCodes.UNAUTHORIZED, `UNAUTHORIZED ${err.message}`));
            }
        }
        return next(buildError(HTTPCodes.UNAUTHORIZED, 'UNAUTHORIZED'));
    }
    async login(req, res, next) {

    }
}

module.exports = new Auth();