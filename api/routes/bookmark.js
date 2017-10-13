var bookmarkController = require('../controllers/bookmark.controller')

module.exports = (router) => {
    
        router.get('/bookmarks', bookmarkController.index )
        router.get('/users/:id/bookmarks', bookmarkController.bookmarksFromUser )
        router.get('/bookmarks/:id', bookmarkController.findById )
        router.post('/bookmarks', bookmarkController.save )
        router.put('/bookmarks/:id', bookmarkController.update )
        router.delete('/bookmarks/:id', bookmarkController.delete )
        
        return router
}