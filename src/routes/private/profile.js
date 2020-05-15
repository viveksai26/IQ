const {
  Router
} = require('express')
const router = Router()

config = {
  host: 'localhost',
  user: 'root',
  database: 'rnapp'
};

const {
  buildStatus,
  HTTPCodes,
  connection
} = require('../../utils/helper')


router.post('/insertUser', async function (req, res, next) {
  let pool;
  try {
    pool = await connection(config)
    pool.getConnection(function (err, connection) {
      if (err) {
        next(err)
      }
      connection.query('call user_add(' + '"' + req.body.userName + '"' + ',' + '"' + req.body.password + '"' + ')', function (err, result) {
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
router.post('/deleteUser', async function (req, res, next) {
  let pool;
  try {
    pool = await connection(config)
    pool.getConnection(function (err, connection) {
      if (err) {
        next(err)
      }
      connection.query('call user_delete(' + req.body.userId + ')', function (err, result) {
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

router.post('/updateUser', async function (req, res, next) {
  let pool;
  try {
    pool = await connection(config)
    pool.getConnection(function (err, connection) {
      if (err) {
        next(err)
      }
      connection.query('call rnapp.user_update(' + req.body.userId + ',' + '"' + req.body.fullName + '"' + ',' + '"' + req.body.email + '"' + ')', function (err, result) {
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

router.post('/getQuestionsByUserId', async function (req, res, next) {
  let pool;
  try {
    pool = await connection(config)
    pool.getConnection(function (err, connection) {
      if (err) {
        next(err)
      }
      connection.query('call questions_by_userid(' + req.body.userId + ')', function (err, result) {
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