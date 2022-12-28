import { Category } from '../models/Category.js'
import { User } from '../models/User.js'

const controller = {
    create: async(req,res)=> {  //C create va a controlar la creación de una nueva categoria
        try {
            const { name,ranking,examples,detail,user_id } = req.body
            let category = await Category.create({ name,ranking,examples,detail,user_id })
            //en body el usuario manda un objeto CON TODO LO QUE NECESITA
            //(en este caso en particular para crear una categoria)
            res.status(201).json({
                success: true,
                response: 'done',
                new_category: category //NO SE DEBE ENVIAR
            })
        } catch(error) {
            console.log(error)
        }
    },
    read: async(req,res)=> {  //R cread va a controlar la lectura de TODAS categorias (incluso manejando filtros incluso)
        //en una peticion GET es muuuy raro que l usuario envie informacion en el REQ (salvo filtros)
        //entonces en este caso en particular TENGO QUE buscar todas la categorias en mongo
        //y enviarlas al cliente a través re RES
        try { //en el try se intenta hacer algo
            let categories = await Category.find() //find es un metodo de mongoose que busca TODOS los documentos de este modlo (CATEGORY)
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
            
        } catch(error) { //en el catch se catchea cualquier ERROR que suceda en el try y se lo opera (maneja TODOS los errores)
            console.log(error)
        }
    },
    one: async(req,res)=> {  //one es una derivacion del read (ya que solo me va a buscar UNA CATEGORIA)
        try {
            const { category_id } = req.params //req.params es el parámetro que me mandar el cliente como requerimiento
            let one = await Category.findById(category_id).populate('user_id')
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
            console.log(error)
        }
    },
    update: async(req,res)=> {  //U update va a controlar la actualizacion de las categorias
        try {
            const { id } = req.params
            //como buena practica no se desestructura el req.body con la / las propiedades a actualizar
            let category = await Category.findOneAndUpdate(
                { _id: id }, //primer parámetro: el necesario para encontrar el documento a modificar
                req.body, //segundo parametro: el objeto con las modificaciones a realizar
                { new: true } //tercer parametro: objeto que en TRUE habilita la modificacion reemplazando el documento
                //en TRUE reemplaza el documento VIEJO
                //en FALSE crea un documento nuevo con las modificaciones
            )
            res.status(200).json({
                success: true,
                response: 'updated',
                updated_category: category
            })
        } catch(error) {
            console.log(error)
        }
    },
    destroy: async(req,res)=> {  //D destroy va a controlar la eliminacion de una categoria
        try {
            const { id } = req.params
            await Category.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                response: 'deleted'
            })
        } catch(error) {
            console.log(error)
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
//DEFINIDO EL CONTROLADOR, CONFIGURO LA RUTA DE CADA MÉTODO