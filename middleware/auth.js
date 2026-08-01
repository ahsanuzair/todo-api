const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        const err = new Error("No token payload")
        err.status = 401
        return next(err)
    }

    const token = authHeader.split(' ')[1]

    if(!token){
        const err = new Error("Malformed authorization header")
        err.status = 401
        return next(err)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user= decoded
        next()
    } catch (error) {
        error.status=401
        return next(error)
    }
}

module.exports = authMiddleware