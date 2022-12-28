import express from 'express'
let router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    response: 'users'
  })
})

export default router

//  router.get al enrrutador le informo que tiene que hacer una peticion de tipo GET
//  '/' es el string que definirá la ruta de conexión (puede ser cualquier string, se recomienda NO USAR MAYUSCULAS)
//  ejemplos:  signin  //  sign_in  //  sign-in  //  ESTO NO SE DEBERIA: signIn
//  funcion que se ejecuta cuando llamo a la ruta
//  ESTA FUNCION SE SACA DE LA RUTA
//  Y SE LO PROGRAMA POR SEPARADO YA QUE ESTA FUNCION ES UN MÉTODO DE ALGO QUE LLAMAMOS CONTROLADOR
//  ejemplo las funciones necesarias para controlar el modelo USUARIO deben estar en el controlador de USUARIO