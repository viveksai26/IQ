const {
    Router
} = require('express');
const router = Router()

const {
    Validation
} = require('../../utils/validation');

const {
    buildStatus,
    HTTPCodes
} = require('../../utils/helper');

const Auth = require('../../utils/authentication');

router.get('/validateToken', Auth.validateToken, async function (req, res, next) {
    try {
        buildStatus(res, HTTPCodes.SUCCESS, 'SUCCESS');
    } catch (err) {
        next(err)
    }
})

module.exports = router