module.exports = 
{
    validateToken(request , response, next) {
        console.log('validate....');
        next()
    }

}