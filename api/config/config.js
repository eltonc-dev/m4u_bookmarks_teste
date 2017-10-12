module.exports = {

    //server
    serverPort : 3000,

    // JWT 
    secret : "emequatrou",

    //rotas que somente os Admins podem acessar
    privateRoutes : [
        '[GET]:/api/v1/users'
    ]


}