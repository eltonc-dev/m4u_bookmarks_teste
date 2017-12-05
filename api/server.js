const app = require('./bootstrap/app')
const config = require('config')




//Inicio o servidor
app.listen( config.get('server.port'),  () => console.log("bookmarks API UP"))

module.exports = app
