import { Category } from '../models/Category.js'
import { User } from '../models/User.js'

const controller = {
    //C create va a controlar la creación de una nueva categoria
    create: async(req,res,next)=> { //defino un método asíncrono que va a depender de REQ (requerimiento), RES (respuesta) y NEXT (funcion "pasadora")
        try { //en el try se intenta hacer algo
            const { name,ranking,examples,detail,user_id } = req.body
            let category = await Category.create({ name,ranking,examples,detail,user_id })
            res.status(201).json({
                success: true,
                response: 'done',
                new_category: category //NO SE DEBERIA ENVIAR
            })
        } catch(error) { //en el catch se catchea cualquier ERROR que suceda en el try (y con el next ejecuto el middleware de manejo de error)
            next(error)
        }
    },
    //R cread va a controlar la lectura de TODAS categorias (incluso manejando filtros incluso)
    read: async(req,res,next)=> {
        try {
            let categories = await Category.find()
            if (categories) {
                res.status(200).json({
                    success: true,
                    response: categories,
                    mi_propiedad: "acá ponene cualquier otra cosa que al cliente le intere"
                })
            } else {
                res.status(404).json({
                    success: false,
                    response: 'not found'
                })
            }            
        } catch(error) {
            next(error)
        }
    },
    //one es una derivacion del read (ya que solo me va a buscar UNA CATEGORIA)
    one: async(req,res,next)=> {
        try {
            const { category_id } = req.params
            let one = await Category.findById(category_id).populate('user_id') //con populate me traigo los datos "guardados" en el ObjectId
            if (one) {
                res.status(200).json({
                    success: true,
                    response: one
                })
            } else {
                res.status(404).json({
                    success: false,
                    response: 'not found'
                })
            }            
        } catch(error) {
            next(error)
        }
    },
    update: async(req,res,next)=> {
        try {
            const { id } = req.params
            let category = await Category.findOneAndUpdate({ _id: id },req.body,{ new: true })
            res.status(200).json({
                success: true,
                response: 'updated',
                updated_category: category
            })
        } catch(error) {
            next(error)
        }
    },
    //D destroy va a controlar la eliminacion de una categoria
    destroy: async(req,res,next)=> {
        try {
            const { id } = req.params
            await Category.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                response: 'deleted'
            })
        } catch(error) {
            next(error)
        }
    }
}

//en req el cliente me manda lo que el método REQUIERE/NECESITA para funcionar
//ejemplos
    //para crear una categoria, el usuario tiene que mandar un objeto con todas las propiedades necsarias para crearlo (EN EL REQ)
    //para leer las categorias con un filtro, el usuario debe mandar en EL REQ los criterios de filtro
    //para eliminar una categoria, el usuario me tiene que enviar el id de esa categoria EN EL REQ

    //en el res el servidor le manda al cliente la RESPUESTA de la consutla/peticion
        //en el res tengo que configurar 2 cosas:
            //codigo de estado
                //200 si tiene exito (con lectura, actualizacion y destruccion)
                //201 si tiene exito (con creacion)
                //400 cuando hay un error del lado del cliente
                //404 cuando no encuentra algo
                //500 cuando hay un error del lado del servidor
            //tipo de respuesta (json/message/render/send)
                //ES SUPUER IMPORTANTE QUE TODAS LAS RESPUESTAS TENGAN LA MISMA FORMA
                //ES DECIR, TODAS DEVUELVAN EL MISMO TIPO DE JSON CON LAS MISMAS PROPIEDAD

export default controller
//DEFINIDO EL CONTROLADOR, LUEGO CONFIGURO LA RUTA DE CADA MÉTODO, LUEGO PRUEBO EN POSTMAN