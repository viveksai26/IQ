const {
    Router
} = require('express');
const router = Router()

const {
    Auth
} = require('../utils/authentication');
const {
    Validation
} = require('../utils/validation')

router.post('/login', Validation.Auth, Auth.login);

module.exports = Router;