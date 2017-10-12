describe("Rotas de usuários" , function(){
    
    
    describe("[ GET ] api/v1/users", function(){

        it('Mensagem de erro, usuário não autenticado', function(done) {
            request
                .get('/api/v1/users')
                .set('content-type' , 'application/json')                
                .end(function (err, res) {
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('code')
                    expect(res.body.code).to.equal(401)
                    done()
                });
            
        })

        it('Mensagem de erro, usuário autenticado porém sem permissão de admin', function(done) {

            authenticate( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                var userId = res.body._id
                request
                    .get('/api/v1/users')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .set('authorization',userId)
                    .end( function(usersErro, usersRes) {
                        expect(usersErro).to.be.not.null
                        expect(usersRes).to.have.status(401)
                        expect(usersRes.body).to.have.property('code')
                        expect(usersRes.body.code).to.equal(401)
                        done()
                    })
            })
        })

        it('Listar todos os usuários quando logado como admin', function(done) {
            
            authenticateAsAdmin( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                var userId = res.body._id
                request
                    .get('/api/v1/users')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .set('authorization',userId)
                    .end( function(usersErro, usersRes) {
                        expect(usersErro).to.be.null
                        expect(usersRes).to.have.status(200)
                        expect(usersRes.body).to.be.an('array')
                        done()
                    })
            })
        })
    })

    describe ("[ POST ] api/v1/users" , function() {
        it('Cadastra um novo usuário' ,function(done) {
            done()
        })
    })

    describe("[ GET ] api/v1/users/:id", function(){
        it('Mostra informações de um usuário', function(done) {
            request
                .get('/api/v1/users/1')
                .end(function(err, res) {
                    done()
                })
        })
    })

    
    describe("[ POST ] api/v1/users", function(){
        it('Salva um usuário', function(done) {
            request
                .post('/api/v1/users')
                .end(function(err, res) {
                    done()
                })
        })
    })

    describe("[ PUT ] api/v1/users/1", function(){
        it('Atualiza um usuario', function(done) {
            request
                .get('/api/v1/users/1')
                .end(function(err, res) {
                    done()
                })
        })
    })

    describe("[ DELETE ] api/v1/users/:id", function(){
        it('Deleta um usuario', function(done) {
            
            authenticateAsAdmin( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                var userId = res.body._id
                request
                    .delete('/api/v1/users/'+normalUserTest._id)
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .set('authorization',userId)
                    .end( function(usersErro, usersRes) {
                        expect(usersErro).to.be.null
                        done()
                    })
            })
        })
    })

})