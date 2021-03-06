const User  = require('./../models/user.model')
const responseMessageFactory = require('./../models/responseMessage.model')
const config = require('config')

module.exports = 
{
    validateAccess(request , response, next) {
        
        let route = `[${request.method}]:${request.originalUrl}`;
        if( config.get('routes.privateRoutes').indexOf(route) < 0 ) {
            //rotas livres
            next() 
        } else {
            //rota permitida apenas para usuários admin
            let authorizationId = request.headers.authorization
            let paramId = request.params.id
            if( authorizationId ) {
                User.findById( authorizationId, (err, user) => {
                    if( err || !user.isAdmin() ) {
                        response.status(401).send(responseMessageFactory.get(401))
                    } else {
                        next()
                    }
                })
            } else {
                response.status(401).send(responseMessageFactory.get(401))
            }
        }
    }
}
