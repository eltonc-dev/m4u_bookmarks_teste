const authHelper = require("./auth.helper")

describe("Rotas de bookmarks" , () => {

    describe("Consultando recursos sem autenticação devem retornar erro 401" , () => {
            it("[ GET ] /api/v1/bookmarks" , ( done ) => {
                request
                    .get('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .end( (bookmarksErro, bookmarksRes) => {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body.status).to.be.equal("erro")
                        done()
                    })
            })
    
            it("[ GET ] /api/v1/bookmarks/:id" , ( done ) => {
                request
                    .get('/api/v1/bookmarks/123')
                    .set('content-type','application/json')
                    .end( (bookmarksErro, bookmarksRes) => {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body.status).to.be.equal("erro")
                        done()
                    })
            })
    
            it("[ POST ] /api/v1/bookmarks" , ( done ) => {
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .end( (bookmarksErro, bookmarksRes) => {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body.status).to.be.equal("erro")
                        done()
                    })
            })
    
            it("[ PUT ] /api/v1/bookmarks/:id" , ( done ) => {
                request
                    .put('/api/v1/bookmarks/123')
                    .set('content-type','application/json')
                    .end( (bookmarksErro, bookmarksRes) => {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body.status).to.be.equal("erro")
                        done()
                    })
            })
    
            it("[ DELETE ] /api/v1/bookmarks/:id" , ( done ) => {
                request
                    .delete('/api/v1/bookmarks/123')
                    .set('content-type','application/json')
                    .end( (bookmarksErro, bookmarksRes) => {
                        expect(bookmarksErro).to.be.not.null
                        expect(bookmarksRes).to.have.status(401)
                        expect(bookmarksRes.body.status).to.be.equal("erro")
                        done()
                    })
            })
    })

    
    describe("CRUD de bookmarks Autenticado ", () => {
        it('[ GET ] /api/v1/bookmarks', (done) => {
            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                let token = res.body.data.token
                request
                    .get('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .end( (bookmarksErro, bookmarksRes) => {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(200)
                        expect(bookmarksRes.body.data).to.be.an('array')
                        done()
                    })
            })
        })


        it('[ POST ] /api/v1/bookmarks', (done) => {

            let bookMarkTest = {
                owner:"123456",
                name:"bookmark test",
                url:"http://www.teste.com.br",
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                let token = res.body.data.token
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(bookMarkTest)
                    .end( (bookmarksErro, bookmarksRes) => {
                        expect(bookmarksErro).to.be.null
                        expect(bookmarksRes).to.have.status(201)
                        expect(bookmarksRes.body.data).to.be.an('object')
                        expect(bookmarksRes.body.data).to.have.property('_id')
                        expect(bookmarksRes.body.data).to.have.property('name')
                        expect(bookmarksRes.body.data).to.have.property('url')
                        expect(bookmarksRes.body.data).to.have.property('owner')
                        expect(bookmarksRes.body.data).to.have.property('created_at')
                        done()
                    })
            })
        })

        it('[ GET ] /api/v1/bookmarks/:id', (done) => {
            let bookMarkTest = {
                owner:"123456",
                name:"bookmark test 2",
                url:"http://www.teste.com.br"
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                let token = res.body.data.token
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(bookMarkTest)
                    .end( (bkErro, bksRes) => {
                        request
                            .get('/api/v1/bookmarks/'+bksRes.body.data._id)
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .end( (bookmarksErro, bookmarksRes) => {
                                expect(bookmarksErro).to.be.null
                                expect(bookmarksRes).to.have.status(200)
                                expect(bookmarksRes.body.data).to.be.an('object')
                                expect(bookmarksRes.body.data).to.have.property('_id')
                                expect(bookmarksRes.body.data).to.have.property('name')
                                expect(bookmarksRes.body.data).to.have.property('url')
                                expect(bookmarksRes.body.data).to.have.property('owner')
                                expect(bookmarksRes.body.data).to.have.property('created_at')
                                expect(bookmarksRes.body.data._id).to.be.equal(bksRes.body.data._id)
                                expect(bookmarksRes.body.data.name).to.be.equal(bksRes.body.data.name)
                                expect(bookmarksRes.body.data.url).to.be.equal(bksRes.body.data.url)
                                expect(bookmarksRes.body.data.owner).to.be.equal(bksRes.body.data.owner)
                                done()
                            })
                    })
                
            })
        })

        it('[ PUT ] /api/v1/bookmarks/:id', (done) => {
            let bookMarkTest = {
                owner:"123456",
                name:"bookmark test 3",
                url:"http://www.teste.com.br"
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                let token = res.body.data.token
                
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(bookMarkTest)
                    .end( (bkErro, bksRes) => {
                        bookMarkTest.name = bookMarkTest.name+" Modificado"
                        request
                            .put('/api/v1/bookmarks/'+bksRes.body.data._id)
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .send(bookMarkTest)
                            .end( (bookmarksErro, bookmarksRes) => {
                                expect(bookmarksErro).to.be.null
                                expect(bookmarksRes).to.have.status(200)
                                expect(bookmarksRes.body.data).to.be.an('object')
                                expect(bookmarksRes.body.data).to.have.property('_id')
                                expect(bookmarksRes.body.data).to.have.property('name')
                                expect(bookmarksRes.body.data).to.have.property('url')
                                expect(bookmarksRes.body.data).to.have.property('owner')
                                expect(bookmarksRes.body.data).to.have.property('created_at')
                                expect(bookmarksRes.body.data.name).to.be.equal(bookMarkTest.name)
                                done()
                            })
                    })
                
            })
        })

        it('[ GET ] /api/v1/users/:id/bookmarks', (done) => {
            let bookMarkTest = {
                owner:"123456",
                name:"bookmark test 4",
                url:"http://www.teste.com.br"
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                let token = res.body.data.token
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(bookMarkTest)
                    .end( (bookmarksErro, bookmarksRes) => {
                        request
                            .get('/api/v1/users/'+bookMarkTest.owner+'/bookmarks')
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .end( (bookmarksErro, bookmarksRes) => {
                                expect(bookmarksErro).to.be.null
                                expect(bookmarksRes).to.have.status(200)
                                expect(bookmarksRes.body.data).to.be.an('array')
                                done()
                            })
                    })
                
            })
        })

        it('[ DELETE ] /api/v1/bookmarks/:id', (done) => {
            let bookMarkTest = {
                owner:"123456",
                name:"bookmark test 5",
                url:"http://www.teste.com.br"
            }

            authHelper.authenticate(authHelper.normalUserTest, (err,res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('_id')
                expect(res.body.data).to.have.property('token')
                let token = res.body.data.token
                
                request
                    .post('/api/v1/bookmarks')
                    .set('content-type','application/json')
                    .set('authentication',token)
                    .send(bookMarkTest)
                    .end( (bkErro, bksRes) => {
                        request
                            .delete('/api/v1/bookmarks/'+bksRes.body.data._id)
                            .set('content-type','application/json')
                            .set('authentication',token)
                            .end( (bookmarksErro, bookmarksRes) => {
                                expect(bookmarksErro).to.be.null
                                expect(bookmarksRes).to.have.status(200)
                                request
                                    .get('/api/v1/bookmarks/'+bksRes.body.data._id)
                                    .set('content-type','application/json')
                                    .set('authentication',token)
                                    .end( (err, res) => {
                                        expect(err).to.be.not.null
                                        expect(res).to.have.status(404)
                                        done()
                                    })
                                
                            })
                    })
                
            })
        })
    })
})