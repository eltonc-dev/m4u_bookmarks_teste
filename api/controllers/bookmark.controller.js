const Bookmark = require('../models/bookmark.model')
const User = require('../models/user.model')

const responseMessageFactory = require('../models/responseMessage.model')

module.exports = {

    index(request, response) {
        Bookmark.find({}, (err, bookmarks) => {
            if (err) {
                response.status(500).send(responseMessageFactory.get(500,err))
            } else {
                if(bookmarks.length == 0){
                    response.status(200).send( responseMessageFactory.get(200,'Nenhum bookmark informado',bookmarks) );
                } else {
                    response.status(200).send( responseMessageFactory.get(200,null,bookmarks) );
                }
            }
        }); 
    } ,

    bookmarksFromUser(request, response) {
        let idUser = request.params.id;

        Bookmark.find({ owner: idUser }, (err, bookmarks) => {
            if (err) {
                response.status(500).send(responseMessageFactory.get(500,err))
            } else {
                if(bookmarks.length == 0){
                    response.status(200).send( responseMessageFactory.get(200,'Nenhum bookmark informado',bookmarks));
                } else {
                    response.status(200).send( responseMessageFactory.get(200,null,bookmarks));
                }
            }
        }); 
    } ,

    findById(request, response) {
        let bookmarkId = request.params.id;
        
        Bookmark.findById( bookmarkId , (err, bookmark) => {
            if (err) {
                response.status(500).send( responseMessageFactory.get(500,null,err) )
            } else {
                if(bookmark) {
                    response.status(200).send( responseMessageFactory.get(200, null, bookmark) );
                } else {
                    response.status(404).send( responseMessageFactory.get(404,'Bookmark não encontrado',err) )
                }
            }
        });
    } ,

    save(request, response) {
        let newBookmark = Bookmark(request.body)

        newBookmark.save( (err) => {
            if (err) {
                if( err.name == "ValidationError" ) {
                    response.status(400).send(responseMessageFactory.get(400,"Campos obrigatórios: owner, name, url", err)) 
                } else {
                    response.status(500).send(responseMessageFactory.get(500, null, err)) 
                }
            } else {
                response.status(201).send(responseMessageFactory.get(201, null, newBookmark))
            }
        });
    } ,

    update(request, response) {
        let bookmarkId = request.params.id
        
        Bookmark.findByIdAndUpdate( bookmarkId , { $set: request.body }, { new: true } , ( error, bookmark ) => {
            if (error) {

                if( error.name == "ValidationError" ) {
                    response.status(400).send(responseMessageFactory.get(400,"Campos obrigatórios: owner , url", error)) 
                } else {
                    response.status(500).send(responseMessageFactory.get(500, null , error)) 
                }
            } else {
                response.status(200).send(responseMessageFactory.get(200,null,bookmark));
            }
        });
    } ,

    delete(request, response) {
        let bookmarkId = request.params.id
        
        Bookmark.findByIdAndRemove( bookmarkId , (err , bookmark) => {
            if(err) {
                response.status(500).send(responseMessageFactory.get(500, null, err));
            } else {
                if(bookmark){
                    response.status(200).send(responseMessageFactory.get(200,null,bookmark));
                } else {
                    response.status(200).send(responseMessageFactory.get(200,'Nenhum bookmark foi deletado',bookmark));
                }
            }
        })
    } ,
}