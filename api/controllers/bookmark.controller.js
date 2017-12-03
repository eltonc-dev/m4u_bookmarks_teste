const Bookmark = require('../models/bookmark.model')
const User = require('../models/user.model')

const responseMessageFactory = require('../models/responseMessage.model')

module.exports = {

    index(request, response) {
        Bookmark.find({}, (err, bookmarks) => {
            if (err) {
                response.status(200).send("Não foi possível listar os bookmarks")
            } else {
                response.status(200).send( JSON.stringify(bookmarks) );
            }
        }); 
    } ,

    bookmarksFromUser(request, response) {
        let idUser = request.params.id;

        Bookmark.find({ owner: idUser }, (err, bookmarks) => {
            if (err) {
                response.status(200).send("Não foi possível listar os bookmarks do usuário ")
            } else {
                response.status(200).send( JSON.stringify(bookmarks) );
            }
        }); 
    } ,

    findById(request, response) {
        let bookmarkId = request.params.id;
        
        Bookmark.findById( bookmarkId , (err, bookmark) => {
            if (err) {
                response.status(404).send( responseMessageFactory.get(404,'Bookmark não encontrado') )
            } else {
                if(bookmark) {
                    response.status(200).send( JSON.stringify(bookmark) );
                } else {
                    response.status(404).send( responseMessageFactory.get(404,'Bookmark não encontrado') )
                }
            }
        });
    } ,

    save(request, response) {
        let newBookmark = Bookmark(request.body)

        newBookmark.save( (err) => {
            if (err) {
                console.log(err)
                if( err.name == "ValidationError" ) {
                    response.status(400).send(responseMessageFactory.get(400,"Campos obrigatórios: owner, name, url")) 
                } else {
                    response.status(400).send(responseMessageFactory.get(401)) 
                }

            } else {
                response.status(201).send(newBookmark)
            }
        });
    } ,

    update(request, response) {
        let bookmarkId = request.params.id
        

        Bookmark.findByIdAndUpdate( bookmarkId , { $set: request.body }, { new: true } , ( error, bookmark ) => {
            if (error) {

                if( error.name == "ValidationError" ) {
                    response.status(400).send(responseMessageFactory.get(400,"Campos obrigatórios: owner , url")) 
                } else {
                    response.status(400).send(responseMessageFactory.get(401)) 
                }
                
            } else {
                response.status(200).send(bookmark);
            }
        });
    } ,

    delete(request, response) {
        let bookmarkId = request.params.id
        
        Bookmark.findByIdAndRemove( bookmarkId , (err , bookmark) => {
            if(err) {
                response.status(400).send(responseMessageFactory.get(400, err));
            } else {
                response.status(200).send(bookmark);
            }
        })
    } ,
}