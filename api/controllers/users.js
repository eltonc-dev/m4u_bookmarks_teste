var User = require('../models/user')

module.exports = {
    
    //Lista todos os usuários
    index(request, response) {
        User.find({}, function(err, users) {
            if (err) {
                response.status(200).send(err)
            } else {
                response.status(200).send(JSON.stringify(users));
            }
        });
    }  ,

    //Mostra informações de um único usuário
    findById(request, response) {
        response.send('{}')
    } ,

    //salva um novo usuário
    save(request , response) {
        let newUser = User({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            admin: request.body.admin? request.body.admin : false
          });
          
          // save the user
          newUser.save(function(err) {
            if (err) {
                response.status(401).send(err)
            } else {
                response.status(200).send(newUser)
            }
          });
    } ,

    // atualiza um novo usuário
    update(request, response) {

    } ,

    //deleta um usuário
    delete(request, response) {

    }

}