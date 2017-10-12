const jsonwebtoken = require('jsonwebtoken')
const errorFactory = require('../models/error')

module.exports = 
{
    validateToken(request , response, next) {
        console.log("Validate "+request.method+" | "+request.url);
        
        let token = request.headers['x-access-token'] || request.headers['authentication'];
        
        if(!token) {
            response.status(401).send(errorFactory.getError(401));
        } else {
            //console.log(secret);
            jsonwebtoken.verify(token, myConfig.secret , (error, decoded) => {
                if(!error) {
                    next();
                } else {
                    if(error.name = "TokenExpiredError") error = "Token expirou"
                    response.status(401).send(errorFactory.getError(401,error));
                }
            })
        }
    } ,

    createToken(user) {
        let token = jsonwebtoken.sign( { user: user }, myConfig.secret, { expiresIn: '8h' } );
        return token;  
    }

}