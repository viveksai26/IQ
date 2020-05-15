var express = require('express');
var router = express.Router();

router.use('/profile', require('./profile'))
router.use('/comment', require('./comment'))
router.use('/questions', require('./questions'))
router.use('/answers', require('./answers'))

module.exports = router;