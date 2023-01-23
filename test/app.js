const { expect } = require('chai');
const app = require('../app/app');

describe('Testing app creation', () => {
    it('App is corretly exported', () => {
        expect(typeof app).to.equal('function')
    })
});