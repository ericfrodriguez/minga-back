export const errorHandler = (error, req, res, next) => {
	console.error(error.stack)
	return res.status(400).json({
		success: false,
		method: req.method,
        path: req.url,
		response: error.message
	})
}