const jsonwebtoken = require('jsonwebtoken')
const User  = require('./../models/user.model')
const authJwt = require('./../auth/authJWT')
const responseMessageFactory = require('./../models/responseMessage.model')

module.exports = {

    //autentica um usuário
    signIn(request, response) {
        response.setHeader('Content-Type', 'application/json');
        let email = request.body.email;
        let password = request.body.password;

        if( !email || !password ) {
            response.status(400).send(responseMessageFactory.get(400,"Informe uma senha e um usuário"));            
        }

        User.findOne({email:email})
            .select('+password')
            .exec( function(err, user)  {
                if (err) {
                    response.status(500).send(responseMessageFactory.get(500,null,err));
                } else {
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
                            response.status(200).send(responseMessageFactory.get(200,null,returnUser) );
                        } else {
                            response.status(404).send(responseMessageFactory.get(404,"Usuário e/ou senha inválidos"));
                        }
                    } else {
                        response.status(404).send(responseMessageFactory.get(404,"Usuário e/ou senha inválidos"));
                    }
                }
            })
    } ,

    //cadastra um novo usuário
    signUp(request, response) {
        response.setHeader('Content-Type', 'application/json');
        let newUser = User({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            admin : request.body.admin? request.body.admin: false
          });
          
          // save the user
          newUser.save((err) => {
            if (err) {
                switch(err.code) {
                    case 11000:
                        response.status(400).send(responseMessageFactory.get(400,"Email já cadastrado", err))
                        break
                    default:
                        if( err.name == "ValidationError" ) {
                            response.status(400).send(responseMessageFactory.get(400,"Campos obrigatórios: name, email, password",err)) 
                        } else {
                            response.status(500).send(responseMessageFactory.get(500,null,err)) 
                        }
                        break
                }
            } else {
                let token = authJwt.createToken(newUser);
                let returnUser = {
                    name:newUser.name,
                    email:newUser.email,
                    _id:newUser._id,
                    token:token,
                    created_at:newUser.created_at,
                    admin:newUser.admin
                }
                response.status(201).send(responseMessageFactory.get(201,null,returnUser));                
            }
          });
    }
}