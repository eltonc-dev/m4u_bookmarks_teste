var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
 
chai.use(chaiHttp);
global.request = chai.request('http://localhost:'+myConfig.serverPort)

global.expect = chai.expect

