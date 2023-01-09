import { Company } from '../models/Company.js'
import defaultResponse from '../config/response.js'

async function companyIsActive(req,res,next) {
    let { company_id } = req.params
    let company = await Company.findOne({ _id:company_id })
    if (company) {
        if (company.active) {
            return next()
        }
        req.body.success = false
        req.body.sc = 400
        req.body.data = 'company is not active'
        return defaultResponse(req,res)
    }
    req.body.success = false
    req.body.sc = 404
    req.body.data = 'company not found'
    return defaultResponse(req,res)
}

export default companyIsActive