let usersController = require('../controllers/users.controller')

module.exports = (router) => {
        
        router.get('/users', usersController.index )
        router.get('/users/:id', usersController.findById )
        router.post('/users', usersController.save )
        router.put('/users/:id', usersController.update )
        router.delete('/users/:id', usersController.delete )

        return router
    }