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