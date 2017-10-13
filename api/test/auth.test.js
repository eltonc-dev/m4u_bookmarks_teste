describe("Criação de novo cadastro e Login " , function(){

    describe("[ POST ] api/sign/up", function(){

        it("Informações imcompletas : devem retornar erro " , function( done ) {
            request
                .post('/api/sign/up')
                .set('content-type','application/json')
                .end( function(err, res) {
                    expect(err).to.be.not.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('code')
                    expect(res.body.code).to.equal(400)
                    done()
                })
        })

        it("Informações completas : devem retornar sucesso , novo usuário cadastrado" , function( done ) {
            request
                .post('/api/sign/up')
                .set('content-type','application/json')
                .send(normalUserTest)
                .end( function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('token')
                    normalUserTest._id = res.body._id
                    done()
                })
        })

        it("Informações completas - email duplicado : devem retornar erro" , function( done ) {
            request
                .post('/api/sign/up')
                .set('content-type','application/json')
                .send(normalUserTest)
                .end( function(err, res) {
                    expect(err).to.be.not.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('code')
                    expect(res.body.code).to.equal(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal("Email já cadastrado")
                    done()
                })
        })

        it("Logando com o novo usuário" , function(done) {
            request
            .post('/api/sign/in')
            .set('content-type','application/json')
            .send({email:normalUserTest.email, password:'123123'})
            .end( function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                done()
            })
        })
    })

});

describe("Consultando recursos sem autenticação" , function() {
    describe("Usuários" , function() {
        it("[ GET ] /api/v1/users" , function( done ) {
            request
                .get('/api/v1/users')
                .set('content-type','application/json')
                .end( function(usersErro, usersRes) {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("code")
                    expect(usersRes.body.code).to.be.equal(401)
                    done()
                })
        })

        it("[ GET ] /api/v1/users/:id" , function( done ) {
            request
                .get('/api/v1/users/123')
                .set('content-type','application/json')
                .end( function(usersErro, usersRes) {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("code")
                    expect(usersRes.body.code).to.be.equal(401)
                    done()
                })
        })

        it("[ POST ] /api/v1/users" , function( done ) {
            request
                .post('/api/v1/users')
                .set('content-type','application/json')
                .end( function(usersErro, usersRes) {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("code")
                    expect(usersRes.body.code).to.be.equal(401)
                    done()
                })
        })

        it("[ PUT ] /api/v1/users/:id" , function( done ) {
            request
                .put('/api/v1/users/123')
                .set('content-type','application/json')
                .end( function(usersErro, usersRes) {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("code")
                    expect(usersRes.body.code).to.be.equal(401)
                    done()
                })
        })

        it("[ DELETE ] /api/v1/users/:id" , function( done ) {
            request
                .delete('/api/v1/users/123')
                .set('content-type','application/json')
                .end( function(usersErro, usersRes) {
                    expect(usersErro).to.be.not.null
                    expect(usersRes).to.have.status(401)
                    expect(usersRes.body).to.have.property("code")
                    expect(usersRes.body.code).to.be.equal(401)
                    done()
                })
        })
    })
})