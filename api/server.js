const app = require('./bootstrap/app')



//Inicio o servidor
app.listen(3000, () => console.log("bookmarks API UP"))

module.exports = app
