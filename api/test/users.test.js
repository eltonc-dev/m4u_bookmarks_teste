const authHelper = require("./auth.helper")

describe("Rotas de usuários" , ()=> {
    describe("Consultando recursos sem autenticação devem retornar erro 401 " , () => {
        it("[ GET ] /api/v1/users" , ( done ) => {
            request
                .get('/api/v1/users')
                .set('content-type','application/json')
                .end( (usersErro, usersRes) => {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("status")
                    expect(usersRes.body.status).to.be.equal("erro")
                    done()
                })
        })

        it("[ GET ] /api/v1/users/:id" , ( done ) => {
            request
                .get('/api/v1/users/123')
                .set('content-type','application/json')
                .end( (usersErro, usersRes) => {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("status")
                    expect(usersRes.body.status).to.be.equal("erro")
                    done()
                })
        })

        it("[ POST ] /api/v1/users" , ( done ) => {
            request
                .post('/api/v1/users')
                .set('content-type','application/json')
                .end( (usersErro, usersRes) => {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("status")
                    expect(usersRes.body.status).to.be.equal("erro")
                    done()
                })
        })

        it("[ PUT ] /api/v1/users/:id" , ( done ) => {
            request
                .put('/api/v1/users/123')
                .set('content-type','application/json')
                .end( (usersErro, usersRes) => {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("status")
                    expect(usersRes.body.status).to.be.equal("erro")
                    done()
                })
        })

        it("[ DELETE ] /api/v1/users/:id" , ( done ) => {
            request
                .delete('/api/v1/users/123')
                .set('content-type','application/json')
                .end( (usersErro, usersRes) => {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("status")
                    expect(usersRes.body.status).to.be.equal("erro")
                    done()
                })
        })
    })

    describe("[ GET ] api/v1/users", ()=> {
        

        it('Mensagem de erro, usuário não autenticado', (done) => {
            request
                .get('/api/v1/users')
                .set('content-type' , 'application/json')                
                .end( (err, res) => {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property("status")
                    expect(res.body.status).to.be.equal("erro")
                    done()
                });
        })

        it('Listar todos os usuários', (done) => {
            

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                var token = res.body.data.token
                var userId = res.body.data._id
                request
                    .get('/api/v1/users')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .set('authorization',userId)
                    .end( (usersErro, usersRes) => {
                        expect(usersErro).to.be.null
                        expect(usersRes).to.have.status(200)
                        expect(usersRes.body.data).to.be.an('array')
                        done()
                    })
            })
        })
    })

    describe ("[ POST ] api/v1/users" , () => {
        it('Falha ao cadastrar : sem autenticação ' ,(done) => {   
            let userTest = {
                name:"Usuário teste",
                email:"email@teste.com.br",
                password:"123123"
            }

            request
                .post('/api/v1/users')
                .set('content-type','application/json')
                .send(userTest)
                .end( (usersErro, usersRes) => {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("status")
                    expect(usersRes.body.status).to.be.equal("erro")
                    done()
                })
        })

        it('Cadastra um novo usuário' ,(done) => {
            let userTest = {
                name:"Usuário teste",
                email:"email1@teste.com.br",
                password:"123123"
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                var token = res.body.data.token
                
                request
                    .post('/api/v1/users')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(userTest)
                    .end( (usersErro, usersRes) => {
                        expect(usersErro).to.be.null
                        expect(usersRes).to.have.status(201)
                        expect(usersRes.body.data).to.be.an('object')
                        expect(usersRes.body.data).to.have.property("_id")
                        request
                            .delete('/api/v1/users/'+usersRes.body.data._id)
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .send(userTest)
                            .end( (erro, response) => {
                                expect(response).to.have.status(200)
                                expect(response.body.status).to.be.equal("sucesso")
                                done()
                            })
                        
                    })
            })
        })
    })

    describe("[ GET ] api/v1/users/:id", () => {
        it('Mostra informações de um usuário', (done) => {
            let userTest = {
                name:"Usuário teste 2",
                email:"teste@teste2.com.br",
                password:"123123"
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                var token = res.body.data.token
                var userId = res.body.data._id
                request
                    .post('/api/v1/users')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(userTest)
                    .end( (err, res) => {
                        request
                            .get('/api/v1/users/'+res.body.data._id)
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .set('authorization',userId)
                            .end( (usersErro, usersRes) => {
                                expect(usersErro).to.be.null
                                expect(usersRes).to.have.status(200)
                                expect(usersRes.body.data).to.be.an('object')
                                expect(usersRes.body.data).to.have.property("_id")
                                expect(usersRes.body.data._id).to.be.equal(res.body.data._id)
                                expect(usersRes.body.data).to.have.property("name")
                                expect(usersRes.body.data.name).to.be.equal(res.body.data.name)
                                request
                                    .delete('/api/v1/users/'+res.body.data._id)
                                    .set('content-type','application/json')
                                    .set('authentication',token)
                                    .set('authorization',userId)
                                    .end( (usersErro, usersRes) => {
                                        expect(usersErro).to.be.null
                                        expect(usersRes).to.have.status(200)
                                        done()
                                    })
                            })
                    })
                
            })
        })
    })


    describe("[ PUT ] api/v1/users/1", ()=> {
        it('Atualiza um usuario', (done) => {
            let userTest = {
                name:"Usuário teste 3",
                email:"teste@teste3.com.br",
                password:"123123"
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                var token = res.body.data.token
                var userId = res.body.data._id
                request
                    .post('/api/v1/users')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(userTest)
                    .end( (err, res) => {
                        userTest.name = userTest.name+" Modificado"
                        request
                            .put('/api/v1/users/'+res.body.data._id)
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .set('authorization',userId)
                            .send(userTest)
                            .end( (usersErro, usersRes) => {
                                expect(usersErro).to.be.null
                                expect(usersRes).to.have.status(200)
                                expect(usersRes.body.data).to.be.an('object')
                                expect(usersRes.body.data).to.have.property("_id")
                                expect(usersRes.body.data._id).to.be.equal(res.body.data._id)
                                expect(usersRes.body.data).to.have.property("name")
                                expect(usersRes.body.data.name).to.be.equal(userTest.name)
                                request
                                    .delete('/api/v1/users/'+usersRes.body.data._id)
                                    .set('content-type','application/json')
                                    .set('authentication',token)
                                    .set('authorization',userId)
                                    .end( (usersErro, usersRes) => {
                                        expect(usersErro).to.be.null
                                        expect(usersRes).to.have.status(200)
                                        done()
                                    })
                            })
                    })
                
            })
        })
    })

    describe("[ DELETE ] api/v1/users/:id", ()=> {
        it('Deleta um usuario', (done) => {

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                var token = res.body.data.token
                var userId = res.body.data._id
                request
                    .delete('/api/v1/users/'+userId)
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .set('authorization',userId)
                    .end( (usersErro, usersRes) => {
                        expect(usersErro).to.be.null
                        done()
                    })
            })
        })
    })

})