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

// router.use(Validation.comment)

router.post('/deleteComment', async function (req, res, next) {
  let pool;
  try {
    pool = await connection()
    pool.getConnection(function (err, connection) {
      if (err) {
        next(err)
      }
      connection.query('call comments_delete(' + req.body.postId + ',' + '"' + req.body.userId + '"' + ',' + '"' + req.body.commentId + '"' + ')', function (err, result) {
        connection.release();
        if (err) {
          next(err);
          return
        }
        try {
          buildStatus(res, HTTPCodes.SUCCESS, result)
        } catch (err) {
          next(err)
        }

      })
      connection.on('error', function (error) {
        next(err)
      })
    })
  } catch (err) {
    next(err)
  }

})

router.post('/insertComment', async function (req, res, next) {
  let pool;
  try {
    pool = await connection(config)
    pool.getConnection(function (err, connection) {
      if (err) {
        next(err)
      }
      connection.query('call comments_add(' + req.body.userId + ',' + '"' + req.body.questionId + '"' + ',' + '"' + req.body.comment + '"' + ')', function (err, result) {
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


module.exports = router