const express  = require('express')
const bodyParser = require('body-parser')
const authJWT = require('./../auth/authJWT')
const authRoutes = require('./../auth/authRoutes')
const mongoose = require('mongoose')
const myConfig = require('../config/config')

global.myConfig = myConfig

// Inicío o banco

mongoose.connect("mongodb://dbmongo/bookmarks-db" , { useMongoClient: true } );
mongoose.Promise = global.Promise

//carregando as rotas
const authRoute = require('./../routes/auth')
const userRoute = require('./../routes/user')
const bookmarksRoute = require('./../routes/bookmark')

//Inicio o express
const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

//rota de autenticação
app.use('/api/',authRoute(router))

//setando middlewares de validação
app.all('/api/*',[authJWT.validateToken , authRoutes.validateAccess ]);

//iniciando as rotas de API
app.use('/api/v1/',userRoute(router))
app.use('/api/v1/',bookmarksRoute(router))


module.exports =  app
