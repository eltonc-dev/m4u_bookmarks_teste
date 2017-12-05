const jsonwebtoken = require('jsonwebtoken')
const responseMessageFactory = require('../models/responseMessage.model')

module.exports = 
{
    validateToken(request , response, next) {
        response.setHeader('Content-Type', 'application/json');
        let token = request.headers['x-access-token'] || request.headers['authentication'];
        if(!token) {
            response.status(401).send(responseMessageFactory.get(401));
        } else {
            //console.log(secret);
            jsonwebtoken.verify(token, myConfig.secret , (error, decoded) => {
                if(!error) {
                    next();
                } else {
                    if(error.name = "TokenExpiredError") {
                        response.status(401).send(responseMessageFactory.get(401,"Token expirou",error));
                    }
                }
            })
        }
    } ,

    createToken(user) {
        let token = jsonwebtoken.sign( { user: user }, myConfig.secret, { expiresIn: '8h' } );
        return token;  
    }

}