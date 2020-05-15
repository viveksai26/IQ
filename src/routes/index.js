var express = require('express');
const Auth = require('../utils/authentication');
var router = express.Router();
const subRouter = express.Router()

router.use('/api', subRouter)

subRouter.use('/public', require('./public'));

subRouter.use(Auth.validateToken)

subRouter.use('/private', require('./private'));

module.exports = router;