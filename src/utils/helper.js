const { dbConfig } = require("../environment/environment.ts");
var mysql = require('mysql');
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

module.exports.signIn = async function () {
  return await jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: '1h' });
}