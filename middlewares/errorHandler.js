export const errorHandler = (req, res, next) => {

    return res.status(404).json({
        success: false,
        message: `Ruta ${req.url} method ${req.method} no implementada`
    })
}