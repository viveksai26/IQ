var express = require('express');
var router = express.Router();
const subRouter = express.Router()
router.use('/api', subRouter)
// subRouter.use('/auth', require('./auth'))
subRouter.use('/profile', require('./profile'))
subRouter.use('/comment', require('./comment'))
subRouter.use('/questions', require('./questions'))
subRouter.use('/answers', require('./answers'))

module.exports = router;