import 'dotenv/config.js' //requiero la configuracion de las variables de entorno
import './config/database.js' //requiero la configuracion de la db

import express from 'express' //metodos de express para configurar y levantar servidores
import path from 'path' //metodos para trabajar con rutas de archivos y directorios
import logger from 'morgan' //middleware que registra peticiones y errores HTTP
import indexRouter from './routes/index.js' //rutas de index
import {__dirname} from './utils.js' //direccion de la carpeta raíz del proyecto
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express() //método para levantar un servidor

//view engine
app.set('view engine', 'ejs') //configuro el motor de vistas generadas por el back
app.set('views', path.join(__dirname, 'views')) //configuro donde van a estar las vistas

//middlewares
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/',indexRouter)

app.use(errorHandler)

//app
export default app