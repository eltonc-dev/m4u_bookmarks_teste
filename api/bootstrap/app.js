var express  = require('express')
var bodyParser = require('body-parser')
var authJWT = require('./../auth/authJWT')
var authRoutes = require('./../auth/authRoutes')
var mongoose = require('mongoose')
var myConfig = require('../config/config')

global.myConfig = myConfig

// Inicío o banco

mongoose.connect("mongodb://dbmongo/bookmarks-db" , { useMongoClient: true } );
mongoose.Promise = global.Promise

//carregando as rotas
var authRoute = require('./../routes/auth')
var userRoute = require('./../routes/user')
var bookmarksRoute = require('./../routes/bookmark')

//Inicio o express
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

//rota de autenticação
app.use('/api/',authRoute(router))

//setando middlewares de validação
//app.all('/api/*',[authJWT.validateToken , authRoutes.validateAccess ]);

//iniciando as rotas de API
app.use('/api/v1/',userRoute(router))
app.use('/api/v1/',bookmarksRoute(router))


module.exports =  app
