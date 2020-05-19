const {
    Router
} = require('express');
const router = Router()
const {
    buildStatus,
    HTTPCodes,
    connection,
    getToken
} = require('../../utils/helper');
const {
    Validation
} = require('../../utils/validation');
const debug = require('debug')('app:user')
const Auth = require('../../utils/authentication');

router.post('/login', async function (req, res, next) {
    try {
        if (req.body.username && req.body.password) {
            let pool;
            pool = await connection()
            pool.getConnection(async function (err, connection) {
                if (err) {
                    next(err)
                    return
                }
                connection.query('call login(' + '"' + req.body.username + '"' + ',' + '"' + req.body.password + '"' + ')', async function (err, result) {
                    connection.release();
                    if (err) {
                        next(err);
                        return
                    }
                    try {
                        console.log(result);

                        if (result[0][0]['user_id']) {
                            req.body.userId = result[0][0]['user_id'];
                            req.body.username = result[0][0]['username'];
                            const token = await getToken(req, res, next);
                            buildStatus(res, HTTPCodes.SUCCESS, token)
                        }
                    } catch (err) {
                        next(err)
                    }
                })
                connection.on('error', function (error) {
                    next(err)
                })
            })
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router