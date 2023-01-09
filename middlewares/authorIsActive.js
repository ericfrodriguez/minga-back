import { Author } from '../models/Author.js'
import defaultResponse from '../config/response.js'

async function authorIsActive(req,res,next) {
    let { author_id } = req.params
    let author = await Author.findOne({ _id:author_id })
    if (author) {
        if (author.active) {
            return next()
        }
        req.body.success = false
        req.body.sc = 400
        req.body.data = 'author is not active'
        return defaultResponse(req,res)
    }
    req.body.success = false
    req.body.sc = 404
    req.body.data = 'author not found'
    return defaultResponse(req,res)
}

export default authorIsActive