const joi = require('joi');

const {
    buildError,
    buildStatus
} = require('./helper');

class Validation {
    login(req, res, next) {
        next();
    }
}

module.exports = new Validation;