const { dbConfig } = require("../environment/environment.js");
const {
  config
} = require('../config/configuration')
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var debug = require('debug')('app:helper')
module.exports.buildStatus = (res, status, data) => {
  res.status(status).send(data)
}

module.exports.buildError = (status, error) => {
  const err = new Error(error)
  err.status = status
  return err
}
// build Status
module.exports.buildStatus = (res, status, data) => {
  res.status(status).send(data)
}


module.exports.HTTPCodes = {
  BAD_REQUEST: 400,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  DUPLICATE: 409,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

module.exports.connection = async () => {
  const pool = await new mysql.createPool(dbConfig)
  return pool
}

module.exports.getToken = async function (req, res, next) {
  try {
    return await jwt.sign({
      data: {
        userId: req.body.userId,
      }
    }, config.secret, { expiresIn: '100d' });
  } catch (err) {
    next(err);
  }
}
module.exports.verifyToken = async function (token, next) {
  try {
    return await jwt.verify(token, config.secret);
  } catch (err) {
    next(err);
  }
}