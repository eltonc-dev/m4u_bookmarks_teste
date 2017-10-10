module.exports = (router) => {

    router.post('/authenticate', (request , response) => {
        response.send(request.body)
    })

    return router
}