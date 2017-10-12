const User  = require('./../models/user')
const errorFactory = require('./../models/error')

module.exports = 
{
    validateAccess(request , response, next) {
        if( myConfig.privateRoutes.indexOf(request.originalUrl) < 0 ) {
            //rotas livres
            next() 
        } else {
            //rota permitida apenas para usuários admin
            let userId = request.headers.authorization
            if( userId ) {
                User.findById( userId, (err, user) => {
                    if( err || !user.isAdmin() ) {
                        response.status(401).send(errorFactory.getError(401))
                    } else {
                        next()
                    }
                })
            } else {
                response.status(401).send(errorFactory.getError(401))
            }
        }
    }
}
