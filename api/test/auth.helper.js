const normalUserTest = { 
    name:"Sign Up teste",
    email:'signup@teste.com.br',
    password:'123123'
}
const adminUserTest = { 
    name:"Admin",
    email:'admin@admin.com.br',
    password:'admin'
}


    
authenticate  = ( user , callback) => {

    request
        .post('/api/sign/in')
        .set('content-type','application/json')
        .send(user)
        .end( (err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body.data).to.have.property('name')
            expect(res.body.data).to.have.property('email')
            expect(res.body.data).to.have.property('_id')
            expect(res.body.data).to.have.property('token')
            callback(err,res)
        })
} 



module.exports = { normalUserTest , adminUserTest , authenticate }