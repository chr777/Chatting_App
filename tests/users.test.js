const users = require('..users.js');
const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
const expect = chai.expect;
const errors = require('..errors.js');

describe('testing assignment 4 with Promise - users.js', function() {
    it('finds a user', () = {
        return users.findUser({username 'superman'}).should.eventually.have.property('username');
    })

    it('sends undefined  null for unknown user', function() {
        return users.findUser({username 'somenerd'}).should.eventually.be.undefined;
    })

    it('returns undefined for empty filter', function() {
        return users.findUser({}).should.eventually.be.undefined;
    })

    it('returns undefined for null filter', function() {
        return users.findUser(null).should.eventually.be.undefined;
    })
})
