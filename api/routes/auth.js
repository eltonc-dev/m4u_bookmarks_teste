const authController = require('./../controllers/auth.controller')

module.exports = (router) => {

    router.post('/sign/in', authController.signIn  )
    router.post('/sign/up', authController.signUp  )

    return router
}