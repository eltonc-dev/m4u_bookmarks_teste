const User = require('../models/user.model')
const responseMessageFactory = require('../models/responseMessage.model')

module.exports = {
    
    //Lista todos os usuários
    index(request, response) {
        
        User.find({}, (err, users) => {
            if (err) {
                response.status(500).send(responseMessageFactory.get(500,null,err))
            } else {
                if (users.length == 0) {
                    response.status(204).send( responseMessageFactory.get(204,null,users) );
                } else {
                    response.status(200).send( responseMessageFactory.get(200,null,users) );
                }
            }
        }); 
    }  ,

    //Mostra informações de um único usuário
    findById(request, response) {
        let userId = request.params.id;

        User.findById( userId , (err, user) => {
            if (err) {
                response.status(500).send( responseMessageFactory.get(500,'Usuário não encontrado',err) )
            } else {
                if(user) {
                    response.status(200).send( responseMessageFactory.get(200,null,user) );
                } else {
                    response.status(404).send( responseMessageFactory.get(404,'Usuário não encontrado') )
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
                        response.status(400).send(responseMessageFactory.get(400,"Email já cadastrado",err))
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
                response.status(201).send(responseMessageFactory.get(200,null,newUser) )
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
                        response.status(400).send(responseMessageFactory.get(400,"Email já cadastrado",null))
                        break
                    default:
                        if( error.name == "ValidationError" ) {
                            response.status(400).send(responseMessageFactory.get(400,"Campos obrigatórios: name, email, password",error)) 
                        } else {
                            response.status(500).send(responseMessageFactory.get(500, null, error)) 
                        }
                        break
                }
            } else {
                response.status(200).send( responseMessageFactory.get(200, null, user) );
            }
        });
    } ,

    //deleta um usuário
    delete(request, response) {
        let userId = request.params.id
        User.findByIdAndRemove( userId , (err , user) => {
            if(err) {
                response.status(500).send(responseMessageFactory.get(500, null, err));
            } else {
                response.status(200).send( responseMessageFactory.get(200, 'Nenhum usuário foi deletado', user) );
            }
        })
    }

}