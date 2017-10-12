var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var myConfig = require('../config/config')
 
chai.use(chaiHttp);
global.request = chai.request('http://localhost:'+myConfig.serverPort)

global.expect = chai.expect

global.normalUserTest = { 
    name:"Sign Up teste",
    email:'signup@teste.com.br',
    password:'123123'
}
global.adminUserTest = { 
    name:"Admin",
    email:'admin@admin.com.br',
    password:'admin'
}

global.authenticate = function ( callback ){
    request
        .post('/api/sign/in')
        .set('content-type','application/json')
        .send({email:normalUserTest.email,password:normalUserTest.password})
        .end( function(err, res) {
            callback(err, res)
        })
}

global.authenticateAsAdmin = function ( callback ){
    request
        .post('/api/sign/in')
        .set('content-type','application/json')
        .send({email:adminUserTest.email,password:adminUserTest.password})
        .end( function(err, res) {
            callback(err, res)
        })
}

