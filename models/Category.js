import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        ranking: {type: Number},
        examples: [{type: String}],
        detail: {type: String, required: true},
        user_id: {type: String, required: true}
    },{
        timestamps: true
    }
)

export const Category = mongoose.model('category', categorySchema)
//aunque pasemos la coleccion en singular
//mongo la crea automaticamente en plural
//por lo que conviene directamente definirla en plural (recordar que una coleccion es un conjunto de documentos)