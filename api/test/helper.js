const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const config = require('config')
 
chai.use(chaiHttp);
global.request = chai.request('http://localhost:'+config.get('server.port'))

global.expect = chai.expect


