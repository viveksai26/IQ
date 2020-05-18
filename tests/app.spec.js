const app = require('../src/app');
const { expect } = require('chai')

describe('express app', () => {
    it('App should be defined', () => {
        expect(app).not.to.be.undefined
    })
})