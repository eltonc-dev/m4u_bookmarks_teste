const jsonwebtoken = require('jsonwebtoken')
const User  = require('./../models/user')
const authJwt = require('./../auth/authJWT')
const errorFactory = require('./../models/error')


module.exports = (router) => {

    router.post('/authenticate', (request , response) => {
        response.setHeader('Content-Type', 'application/json');
        let email = request.body.email;
        let password = request.body.password;

        if( !email || !password ) {
            response.status(400).send(errorFactory.getError(400,"Informe uma senha e um usuário"));            
        }

        User.find({ email:email }, function(err, users) {
            if (err) {
                response.status(400).send(errorFactory.getError(400,err));
            } else {
                let user = users[0];
                if(user) {
                    let result = user.checkPassword(password);
                    if(result) {
                        //crio um token de acesso
                        let token = authJwt.createToken(user);
                        let returnUser = {
                            name:user.name,
                            email:user.email,
                            _id:user._id,
                            token:token,
                            created_at:user.created_at,
                            admin:user.admin
                        }
                        response.status(200).send(JSON.stringify( returnUser ));
                    } else {
                        response.status(400).send(errorFactory.getError(400,"Usuário e/ou senha inválidos"));
                    }
                }
            }
        });
    })

    return router
}