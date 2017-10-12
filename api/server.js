const app = require('./bootstrap/app')




//Inicio o servidor
app.listen( myConfig.serverPort,  () => console.log("bookmarks API UP"))

module.exports = app
