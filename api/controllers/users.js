var User = require('../models/user')
const errorFactory = require('../models/error')

module.exports = {
    
    //Lista todos os usuários
    index(request, response) {
        
        User.find({}, (err, users) => {
            if (err) {
                response.status(200).send( err )
            } else {
                response.status(200).send( JSON.stringify(users) );
            }
        }); 
    }  ,

    //Mostra informações de um único usuário
    findById(request, response) {
        
        let userId = request.params.id;

        User.findById( userId , (err, user) => {
            if (err) {
                response.status(404).send( errorFactory.getError(404,'Usuário não encontrado') )
            } else {
                if(user) {
                    response.status(200).send( JSON.stringify(user) );
                } else {
                    response.status(404).send( errorFactory.getError(404,'Usuário não encontrado') )
                }
                
            }
        }); 
    } ,

    //salva um novo usuário
    save(request , response) {
        let newUser = User({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
          });
          
          // save the user
          newUser.save((err) => {
            if (err) {
                switch(err.code) {
                    case 11000:
                        response.status(400).send(errorFactory.getError(400,"Email já cadastrado"))
                        break
                    default:
                        if( err.name == "ValidationError" ) {
                            response.status(400).send(errorFactory.getError(400,"Campos obrigatórios: name, email, password")) 
                        } else {
                            response.status(400).send(errorFactory.getError(401)) 
                        }
                        break
                }
            } else {
                response.status(201).send(errorFactory.getError(201,newUser))
            }
          });
    } ,

    // atualiza um novo usuário
    update(request, response) {
        let userId = request.params.id

        let userUpdate = {}
        if(request.body.email) {
            userUpdate.email = request.body.email
        }
        if(request.body.name) {
            userUpdate.name = request.body.name
        }

        User.findByIdAndUpdate( userId , { $set: userUpdate }, { new: true } , ( error, user ) => {
            if (error) {
                switch(error.code) {
                    case 11000:
                        response.status(400).send(errorFactory.getError(400,"Email já cadastrado"))
                        break
                    default:
                        if( error.name == "ValidationError" ) {
                            response.status(400).send(errorFactory.getError(400,"Campos obrigatórios: name, email, password")) 
                        } else {
                            response.status(400).send(errorFactory.getError(401)) 
                        }
                        break
                }
            } else {
                response.status(200).send(errorFactory.getError(200,user));
            }
        });
    } ,

    //deleta um usuário
    delete(request, response) {
        let userId = request.params.id
        
        User.findByIdAndRemove( userId , (err , user) => {
            if(err) {
                response.status(400).send(errorFactory.getError(400, err));
            } else {
                response.status(200).send(errorFactory.getError(200, user));
            }
        })
    }

}