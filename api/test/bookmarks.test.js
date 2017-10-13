var bookMarkTest = {
    owner:"123456",
    name:"bookmark test",
    url:"http://www.teste.com.br"
}

describe("Rotas de bookmarks" , function(){

    describe("Consultando recursos sem autenticação devem retornar erro 401" , function() {
            it("[ GET ] /api/v1/bookmarks" , function( done ) {
                request
                    .get('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body).to.have.property("code")
                        expect(bookmarksRes.body.code).to.be.equal(401)
                        done()
                    })
            })
    
            it("[ GET ] /api/v1/bookmarks/:id" , function( done ) {
                request
                    .get('/api/v1/bookmarks/123')
                    .set('content-type','application/json')
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body).to.have.property("code")
                        expect(bookmarksRes.body.code).to.be.equal(401)
                        done()
                    })
            })
    
            it("[ POST ] /api/v1/bookmarks" , function( done ) {
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body).to.have.property("code")
                        expect(bookmarksRes.body.code).to.be.equal(401)
                        done()
                    })
            })
    
            it("[ PUT ] /api/v1/bookmarks/:id" , function( done ) {
                request
                    .put('/api/v1/bookmarks/123')
                    .set('content-type','application/json')
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body).to.have.property("code")
                        expect(bookmarksRes.body.code).to.be.equal(401)
                        done()
                    })
            })
    
            it("[ DELETE ] /api/v1/bookmarks/:id" , function( done ) {
                request
                    .delete('/api/v1/bookmarks/123')
                    .set('content-type','application/json')
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body).to.have.property("code")
                        expect(bookmarksRes.body.code).to.be.equal(401)
                        done()
                    })
            })
    })

    
    describe("CRUD de bookmarks Autenticado ", function() {
        it('[ GET ] /api/v1/bookmarks', function(done) {
            authenticate( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                request
                    .get('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(200)
                        expect(bookmarksRes.body).to.be.an('array')
                        done()
                    })
            })
        })


        it('[ POST ] /api/v1/bookmarks', function(done) {
            authenticate( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(bookMarkTest)
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(201)
                        expect(bookmarksRes.body).to.be.an('object')
                        expect(bookmarksRes.body).to.have.property('_id')
                        expect(bookmarksRes.body).to.have.property('name')
                        expect(bookmarksRes.body).to.have.property('url')
                        expect(bookmarksRes.body).to.have.property('owner')
                        expect(bookmarksRes.body).to.have.property('created_at')
                        bookMarkTest._id = bookmarksRes.body._id
                        done()
                    })
            })
        })

        it('[ GET ] /api/v1/bookmarks/:id', function(done) {
            authenticate( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                request
                    .get('/api/v1/bookmarks/'+bookMarkTest._id)
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(200)
                        expect(bookmarksRes.body).to.be.an('object')
                        expect(bookmarksRes.body).to.have.property('_id')
                        expect(bookmarksRes.body).to.have.property('name')
                        expect(bookmarksRes.body).to.have.property('url')
                        expect(bookmarksRes.body).to.have.property('owner')
                        expect(bookmarksRes.body).to.have.property('created_at')
                        expect(bookmarksRes.body._id).to.be.equal(bookMarkTest._id)
                        expect(bookmarksRes.body.name).to.be.equal(bookMarkTest.name)
                        expect(bookmarksRes.body.url).to.be.equal(bookMarkTest.url)
                        expect(bookmarksRes.body.owner).to.be.equal(bookMarkTest.owner)
                        done()
                    })
            })
        })

        it('[ PUT ] /api/v1/bookmarks/:id', function(done) {
            authenticate( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                bookMarkTest.name = bookMarkTest.name+" Modificado"
                request
                    .put('/api/v1/bookmarks/'+bookMarkTest._id)
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(bookMarkTest)
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(200)
                        expect(bookmarksRes.body).to.be.an('object')
                        expect(bookmarksRes.body).to.have.property('_id')
                        expect(bookmarksRes.body).to.have.property('name')
                        expect(bookmarksRes.body).to.have.property('url')
                        expect(bookmarksRes.body).to.have.property('owner')
                        expect(bookmarksRes.body).to.have.property('created_at')
                        expect(bookmarksRes.body.name).to.be.equal(bookMarkTest.name)
                        done()
                    })
            })
        })

        it('[ GET ] /api/v1/users/:id/bookmarks', function(done) {
            authenticate( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                bookMarkTest.name = bookMarkTest.name+" Modificado"
                request
                    .get('/api/v1/users/'+bookMarkTest.owner+'/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(200)
                        expect(bookmarksRes.body).to.be.an('array')
                        expect(bookmarksRes.body[0]._id).to.be.equal(bookMarkTest._id)
                        done()
                    })
            })
        })

        it('[ DELETE ] /api/v1/bookmarks/:id', function(done) {
            authenticate( function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('token')
                var token = res.body.token
                bookMarkTest.name = bookMarkTest.name+" Modificado"
                request
                    .delete('/api/v1/bookmarks/'+bookMarkTest._id)
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .end( function(bookmarksErro, bookmarksRes) {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(200)
                        request
                            .get('/api/v1/bookmarks/'+bookMarkTest._id)
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .end( function(err, res) {
                                expect(err).to.be.not.null
                                expect(res).to.have.status(404)
                                done()
                            })
                        
                    })
            })
        })
    })
})