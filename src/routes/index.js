var express = require('express');
var router = express.Router();
const subRouter = express.Router()

router.use('/api', subRouter)

subRouter.use('/public', require('./public'));
subRouter.use('/private', require('./private'));

module.exports = router;