const authHelper = require('./auth.helper')
let User = require('./../models/user.model')

describe("Criação de novo cadastro e Login " , () => {
    
    describe("[ POST ] api/sign/up", () => {

        it("Informações imcompletas : devem retornar erro " , ( done ) => {
            request
                .post('/api/sign/up')
                .set('content-type','application/json')
                .end( (err, res) => {
                    expect(err).to.be.not.null
                    expect(res).to.have.status(400)
                    done()
                })
        })

        it("Informações completas : devem retornar sucesso , novo usuário cadastrado" , ( done ) => {
            request
                .post('/api/sign/up')
                .set('content-type','application/json')
                .send(authHelper.normalUserTest)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body.data).to.have.property('name')
                    expect(res.body.data).to.have.property('email')
                    expect(res.body.data).to.have.property('_id')
                    expect(res.body.data).to.have.property('token')
                    done()
                })
        })

        it("Informações completas - email duplicado : devem retornar erro" , ( done ) => {
            
            request
                .post('/api/sign/up')
                .set('content-type','application/json')
                .send(authHelper.normalUserTest)
                .end( (err, res) => {
                    expect(err).to.be.not.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Email já cadastrado")
                    done()
                })
        })

        it("Logando com o novo usuário" , (done) => {
            
            request
                .post('/api/sign/in')
                .set('content-type','application/json')
                .send(authHelper.normalUserTest)
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.data).to.have.property('name')
                    expect(res.body.data).to.have.property('email')
                    expect(res.body.data).to.have.property('_id')
                    expect(res.body.data).to.have.property('token')
                    done()
                })
        })
    })
});