const {
    Router
} = require('express');
const router = Router()

const {
    Validation
} = require('../utils/validation');

const {
    buildStatus,
    HTTPCodes
} = require('../utils/helper');

const {
    connection
} = require('../utils/helper');

const Auth = require('../utils/authentication');

// router.use(Validation.comment)

router.post('/getComments', async function (req, res, next) {
    let pool;
    try {
        pool = await connection(config)
        pool.getConnection(function (err, connection) {
            if (err) {
                next(err)
            }
            connection.query('call comments_get(' + req.body.questionId + ',' + '"' + req.body.time + '"' + ')', function (err, result) {
                connection.release();
                if (err) {
                    next(err)
                    return
                }
                try {
                    buildStatus(res, HTTPCodes.SUCCESS, result)
                } catch (err) {
                    next(err)
                }

            })
            connection.on('error', function (error) {
                next(error)
            })
        })
    } catch (err) {
        next(err)
    }

})
router.post('/getToken', async Auth.login)


module.exports = router