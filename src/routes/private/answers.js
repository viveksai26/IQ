const {
    Router
} = require('express')
const router = Router()

const {
    buildStatus,
    HTTPCodes,
    connection
} = require('../../utils/helper')

router.post('/answerByUserId', async function (req, res, next) {
    let pool;
    try {
        pool = await connection()
        pool.getConnection(function (err, connection) {
            if (err) {
                next(err)
            }
            console.log(req.body.userId);

            connection.query('call answers_by_userid(' + '"' + req.body.userId + '"' + ')', function (err, result) {
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
router.post('/answerAdd', async function (req, res, next) {
    let pool;
    try {
        pool = await connection(config)
        pool.getConnection(function (err, connection) {
            if (err) {
                next(err)
            }
            connection.query('call answers_add(' + '"' + req.body.userId + '"' + ',' + '"' + req.body.questionId + '"' + ',' + '"' + req.body.answer + '"' + ')', function (err, result) {
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

router.post('/answerDeleteByUserId', async function (req, res, next) {
    let pool;
    try {
        pool = await connection(config)
        pool.getConnection(function (err, connection) {
            if (err) {
                next(err)
            }
            connection.query('call answers_user_delete(' + '"' + req.body.answerId + '"' + ')', function (err, result) {
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

module.exports = router;