var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var myConfig = require('../config/config')
 
chai.use(chaiHttp);
global.request = chai.request('http://localhost:'+myConfig.serverPort)

global.expect = chai.expect


global.authenticate = function ( callback ){
    request
        .post('/api/authenticate')
        .set('content-type','application/json')
        .send({email:'pedro@email.com.br',password:'123123'})
        .end( function(err, res) {
            callback(err, res)
        })
}

global.authenticateAsAdmin = function ( callback ){
    request
        .post('/api/authenticate')
        .set('content-type','application/json')
        .send({email:'admin@admin.com.br',password:'admin'})
        .end( function(err, res) {
            callback(err, res)
        })
}

