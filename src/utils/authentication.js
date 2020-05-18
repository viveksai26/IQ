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
        try {
            const token = await getToken(req, res, next);
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
                const decodedData = await verifyToken(tokenList[1], next)
                req.body.userId = decodedData.data['userId']
                return next();
            } catch (err) {
                return next(buildError(HTTPCodes.UNAUTHORIZED, `UNAUTHORIZED ${err.message}`));
            }
        }
        return next(buildError(HTTPCodes.UNAUTHORIZED, 'UNAUTHORIZED'));
    }
}

module.exports = new Auth();