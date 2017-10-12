describe("Rotas de usuários" , function(){
    
    
    describe("[ GET ] api/v1/users", function(){

        it('Lista todos os usuários', function(done) {
            request
                .get('/api/v1/users')
                .set('content-type' , 'application/json')                
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                });
            
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
            request
                .delete('/api/v1/users/1')
                .end(function(err, res) {
                    done()
                })
        })
    })

})